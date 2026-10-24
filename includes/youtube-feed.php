<?php
/**
 * YouTube channel / playlist auto-feed (Vimeo's side: vimeo-feed.php).
 *
 * A gallery can take its videos from a YouTube channel or playlist instead of
 * a hand-made list: the owner pastes one link, and new uploads appear on the
 * site by themselves.
 *
 * Why the YouTube Data API, with the site owner's own key, and not a key-less
 * route: YouTube's public RSS feed (`/feeds/videos.xml`) has been returning 404
 * on and off since December 2025 -- for every channel, from every client -- so
 * a gallery built on it would empty itself without warning. Reading the
 * channel's web page instead would break YouTube's terms. The Data API is the
 * supported way, it is free, and one key covers a site many times over: a
 * refresh costs two or three units of the 10,000 a key gets each day.
 *
 * The key lives in a site option (or the `VIDGALBLK_YOUTUBE_API_KEY` constant)
 * and is only ever used here, on the server. It is never sent to the browser.
 *
 * @package video-gallery-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/** Most videos one feed can show. One API page. */
const VIDGALBLK_FEED_MAX = 50;

/** Hours a feed may be cached for, as offered in the editor. */
const VIDGALBLK_FEED_REFRESH_HOURS = array( 1, 6, 12, 24 );

/**
 * The YouTube Data API key, if one has been set.
 *
 * @return string Key, or ''.
 */
function vidgalblk_feed_api_key() {
	if ( defined( 'VIDGALBLK_YOUTUBE_API_KEY' ) && VIDGALBLK_YOUTUBE_API_KEY ) {
		return (string) VIDGALBLK_YOUTUBE_API_KEY;
	}

	return (string) get_option( 'vidgalblk_youtube_api_key', '' );
}

/**
 * Work out what a pasted link points at.
 *
 * Accepts every shape people actually copy: a channel by handle
 * (`youtube.com/@name`, with or without a `/videos` or `/shorts` tab, or just
 * `@name`), by id (`/channel/UC…`), the legacy `/user/` and `/c/` URLs, and
 * playlists -- including a watch URL that carries `&list=`.
 *
 * @param string $input Pasted text.
 * @return array|WP_Error `type` (channel_id, handle, username, playlist) and `id`.
 */
function vidgalblk_feed_parse_url( $input ) {
	$input = trim( (string) $input );

	if ( '' === $input ) {
		return new WP_Error( 'vidgalblk_feed_empty', __( 'Paste a YouTube or Vimeo channel or playlist link.', 'video-gallery-block' ) );
	}

	// A bare handle or id, typed rather than pasted.
	if ( preg_match( '#^@([\w.\-]{3,100})$#u', $input, $m ) ) {
		return array( 'type' => 'handle', 'id' => '@' . $m[1] );
	}
	if ( preg_match( '#^UC[\w-]{22}$#', $input ) ) {
		return array( 'type' => 'channel_id', 'id' => $input );
	}
	if ( preg_match( '#^(PL|OL|UU|FL|RD)[\w-]{10,}$#', $input ) ) {
		return array( 'type' => 'playlist', 'id' => $input );
	}

	if ( ! preg_match( '#^https?://#i', $input ) ) {
		$input = 'https://' . $input;
	}

	$host = strtolower( (string) wp_parse_url( $input, PHP_URL_HOST ) );
	$path = (string) wp_parse_url( $input, PHP_URL_PATH );
	parse_str( (string) wp_parse_url( $input, PHP_URL_QUERY ), $query );

	if ( preg_match( '#(^|\.)vimeo\.com$#', $host ) ) {
		return vidgalblk_vimeo_feed_parse( $host, $path );
	}

	if ( ! preg_match( '#(^|\.)(youtube\.com|youtu\.be)$#', $host ) ) {
		return new WP_Error( 'vidgalblk_feed_unsupported', __( 'That is not a YouTube or Vimeo link. Paste a channel link (youtube.com/@name, vimeo.com/name) or a playlist / showcase link.', 'video-gallery-block' ) );
	}

	// A playlist wins even on a watch URL: the person copied it from a playlist.
	if ( ! empty( $query['list'] ) && is_string( $query['list'] ) && preg_match( '#^[\w-]{10,}$#', $query['list'] ) ) {
		return array( 'type' => 'playlist', 'id' => $query['list'] );
	}

	if ( preg_match( '#^/@([^/]+)#u', $path, $m ) ) {
		return array( 'type' => 'handle', 'id' => '@' . rawurldecode( $m[1] ) );
	}
	if ( preg_match( '#^/channel/(UC[\w-]{22})#', $path, $m ) ) {
		return array( 'type' => 'channel_id', 'id' => $m[1] );
	}
	if ( preg_match( '#^/user/([^/]+)#', $path, $m ) ) {
		return array( 'type' => 'username', 'id' => rawurldecode( $m[1] ) );
	}
	// Old custom URLs (/c/name) became handles for most channels.
	if ( preg_match( '#^/c/([^/]+)#', $path, $m ) ) {
		return array( 'type' => 'handle', 'id' => '@' . rawurldecode( $m[1] ) );
	}

	if ( 'youtu.be' === $host || preg_match( '#^/(watch|shorts|live|embed)\b#', $path ) ) {
		return new WP_Error( 'vidgalblk_feed_single_video', __( 'This is a link to one video, not a list. Paste the channel link (youtube.com/@name) or a playlist link (…/playlist?list=…) instead.', 'video-gallery-block' ) );
	}

	return new WP_Error( 'vidgalblk_feed_unsupported', __( 'That does not look like a YouTube channel or playlist link.', 'video-gallery-block' ) );
}

/**
 * One call to the YouTube Data API, with its errors turned into messages a
 * site owner can act on.
 *
 * @param string $endpoint e.g. 'playlistItems'.
 * @param array  $query    Query arguments, without the key.
 * @param string $key      API key; defaults to the saved one.
 * @return array|WP_Error Decoded response.
 */
function vidgalblk_feed_api( $endpoint, $query, $key = null ) {
	$key = null === $key ? vidgalblk_feed_api_key() : $key;

	if ( '' === $key ) {
		return new WP_Error( 'vidgalblk_feed_no_key', __( 'Connect YouTube first: add your free API key in the block settings.', 'video-gallery-block' ) );
	}

	$response = wp_remote_get(
		add_query_arg( array_merge( $query, array( 'key' => $key ) ), 'https://www.googleapis.com/youtube/v3/' . $endpoint ),
		array(
			'timeout' => 8,
			'headers' => array(
				// A key restricted to "Websites" checks this header. Sending the
				// site's own address means such a key works here too, instead
				// of failing with a message nobody would connect to it.
				'Referer' => home_url( '/' ),
			),
		)
	);

	if ( is_wp_error( $response ) ) {
		return new WP_Error( 'vidgalblk_feed_network', __( 'Your site could not reach YouTube just now. Please try again in a minute.', 'video-gallery-block' ) );
	}

	$code = (int) wp_remote_retrieve_response_code( $response );
	$body = json_decode( wp_remote_retrieve_body( $response ), true );

	if ( 200 === $code && is_array( $body ) ) {
		return $body;
	}

	// Google puts the useful reason in one of two places.
	$reasons = array();
	if ( isset( $body['error']['errors'] ) && is_array( $body['error']['errors'] ) ) {
		foreach ( $body['error']['errors'] as $error ) {
			$reasons[] = $error['reason'] ?? '';
		}
	}
	if ( isset( $body['error']['details'] ) && is_array( $body['error']['details'] ) ) {
		foreach ( $body['error']['details'] as $detail ) {
			$reasons[] = $detail['reason'] ?? '';
		}
	}
	$reasons = array_filter( $reasons );

	if ( array_intersect( $reasons, array( 'API_KEY_INVALID', 'keyInvalid' ) ) ) {
		return new WP_Error( 'vidgalblk_feed_key_invalid', __( 'This API key is not valid. Copy it again from Google Cloud -- it starts with "AIza".', 'video-gallery-block' ) );
	}
	if ( array_intersect( $reasons, array( 'SERVICE_DISABLED', 'accessNotConfigured' ) ) ) {
		return new WP_Error( 'vidgalblk_feed_api_disabled', __( 'The key works, but "YouTube Data API v3" is not turned on for its Google Cloud project. Open step 2 in the block settings, click Enable, wait a minute, and try again.', 'video-gallery-block' ) );
	}
	if ( array_intersect( $reasons, array( 'API_KEY_HTTP_REFERRER_BLOCKED', 'API_KEY_IP_ADDRESS_BLOCKED', 'API_KEY_SERVICE_BLOCKED', 'API_KEY_ANDROID_APP_BLOCKED', 'API_KEY_IOS_APP_BLOCKED' ) ) ) {
		return new WP_Error( 'vidgalblk_feed_key_restricted', __( 'This key has a restriction that blocks your site. In Google Cloud, open the key and set "Application restrictions" to None. Limiting it to "YouTube Data API v3" under API restrictions is fine.', 'video-gallery-block' ) );
	}
	if ( array_intersect( $reasons, array( 'quotaExceeded', 'dailyLimitExceeded', 'rateLimitExceeded', 'RATE_LIMIT_EXCEEDED' ) ) ) {
		return new WP_Error( 'vidgalblk_feed_quota', __( "This key's free daily YouTube quota is used up. Videos already shown stay up; new ones appear after the quota resets (midnight, Pacific time).", 'video-gallery-block' ) );
	}
	if ( 404 === $code || array_intersect( $reasons, array( 'playlistNotFound', 'channelNotFound', 'notFound' ) ) ) {
		return new WP_Error( 'vidgalblk_feed_not_found', __( 'We could not find that channel or playlist. Check that the link opens on YouTube and that the playlist is public or unlisted.', 'video-gallery-block' ) );
	}

	return new WP_Error(
		'vidgalblk_feed_api_error',
		sprintf(
			/* translators: %s: error message from YouTube. */
			__( 'YouTube answered with an error: %s', 'video-gallery-block' ),
			isset( $body['error']['message'] ) ? wp_strip_all_tags( (string) $body['error']['message'] ) : (string) $code
		)
	);
}

/**
 * Fetch a feed from YouTube, uncached.
 *
 * For a channel, the Shorts setting picks which of YouTube's own lists is read
 * -- every upload (UU…), long videos only (UULF…) or Shorts only (UUSH…) -- so
 * hiding Shorts never costs a slot in the count, and works even though a feed
 * gives plain watch links rather than `/shorts/` ones. A playlist has no such
 * lists, so there it is shown as it is.
 *
 * Always asks for a full page (50) -- it costs YouTube the same single unit as
 * asking for one -- and leaves the "Number of videos" setting to whoever shows
 * the list, so changing that number never needs another trip to YouTube.
 *
 * @param string $url    Pasted channel or playlist link.
 * @param string $shorts 'all', 'hide' or 'only'.
 * @return array|WP_Error `title`, `kind` (channel|playlist), `provider`
 *                        (youtube|vimeo), `shortsApplied`, `videos`.
 */
function vidgalblk_feed_fetch( $url, $shorts ) {
	$parsed = vidgalblk_feed_parse_url( $url );
	if ( is_wp_error( $parsed ) ) {
		return $parsed;
	}

	if ( 'vimeo' === ( $parsed['provider'] ?? '' ) ) {
		return vidgalblk_vimeo_feed_fetch( $parsed );
	}

	$uploads = '';

	if ( 'playlist' === $parsed['type'] ) {
		$info = vidgalblk_feed_api( 'playlists', array( 'part' => 'snippet', 'id' => $parsed['id'] ) );
		if ( is_wp_error( $info ) ) {
			return $info;
		}
		if ( empty( $info['items'][0] ) ) {
			return new WP_Error( 'vidgalblk_feed_not_found', __( 'We could not find that playlist. Check that it is public or unlisted, not private.', 'video-gallery-block' ) );
		}

		$title       = $info['items'][0]['snippet']['title'] ?? '';
		$kind        = 'playlist';
		$playlist_id = $parsed['id'];
		$applied     = false;
	} else {
		$by = array(
			'channel_id' => 'id',
			'handle'     => 'forHandle',
			'username'   => 'forUsername',
		);

		$info = vidgalblk_feed_api(
			'channels',
			array(
				'part'               => 'snippet,contentDetails',
				$by[ $parsed['type'] ] => $parsed['id'],
			)
		);
		if ( is_wp_error( $info ) ) {
			return $info;
		}
		if ( empty( $info['items'][0]['contentDetails']['relatedPlaylists']['uploads'] ) ) {
			return new WP_Error( 'vidgalblk_feed_not_found', __( 'We could not find that channel. Open it on YouTube and copy the link from the address bar.', 'video-gallery-block' ) );
		}

		$title   = $info['items'][0]['snippet']['title'] ?? '';
		$kind    = 'channel';
		$uploads = $info['items'][0]['contentDetails']['relatedPlaylists']['uploads'];
		$suffix  = substr( $uploads, 2 );

		$prefixes    = array(
			'hide' => 'UULF',
			'only' => 'UUSH',
		);
		$playlist_id = isset( $prefixes[ $shorts ] ) ? $prefixes[ $shorts ] . $suffix : $uploads;
		$applied     = true;
	}

	$items = vidgalblk_feed_api(
		'playlistItems',
		array(
			'part'       => 'snippet,contentDetails,status',
			'playlistId' => $playlist_id,
			'maxResults' => VIDGALBLK_FEED_MAX,
		)
	);

	// A channel with no Shorts (or only Shorts) has no such list at all.
	if ( is_wp_error( $items ) && 'vidgalblk_feed_not_found' === $items->get_error_code() && 'channel' === $kind && $playlist_id !== $uploads ) {
		$items = array( 'items' => array() );
	}
	if ( is_wp_error( $items ) ) {
		return $items;
	}

	$videos = array();
	foreach ( (array) ( $items['items'] ?? array() ) as $item ) {
		$video_id = $item['contentDetails']['videoId'] ?? '';
		$privacy  = $item['status']['privacyStatus'] ?? 'public';

		// Private and deleted videos stay listed in playlists, as placeholders.
		if ( ! preg_match( '#^[\w-]{11}$#', $video_id ) || 'private' === $privacy || 'privacyStatusUnspecified' === $privacy ) {
			continue;
		}

		$published = $item['contentDetails']['videoPublishedAt'] ?? ( $item['snippet']['publishedAt'] ?? '' );
		$timestamp = $published ? strtotime( $published ) : false;
		$owner_id  = (string) ( $item['snippet']['videoOwnerChannelId'] ?? '' );

		$videos[] = array(
			'video'      => ( 'only' === $shorts && $applied )
				? 'https://www.youtube.com/shorts/' . $video_id
				: 'https://www.youtube.com/watch?v=' . $video_id,
			'caption'    => (string) ( $item['snippet']['title'] ?? '' ),
			'albs'       => array(),
			// Milliseconds, like the editor's own `Date.now()` stamps, so the
			// Newest/Oldest sort treats feed videos the same as added ones.
			'dateAdded'  => $timestamp ? $timestamp * 1000 : 0,
			'uploadDate' => $timestamp ? gmdate( 'c', $timestamp ) : '',
			// The video's own channel (a playlist can mix channels).
			'channel'    => (string) ( $item['snippet']['videoOwnerChannelTitle'] ?? '' ),
			'channelUrl' => preg_match( '#^[\w-]+$#', $owner_id ) ? 'https://www.youtube.com/channel/' . $owner_id : '',
		);
	}

	return array(
		'title'         => (string) $title,
		'kind'          => $kind,
		'provider'      => 'youtube',
		'shortsApplied' => $applied,
		'videos'        => $videos,
	);
}

/**
 * The cache key for one feed configuration.
 *
 * @param string $url    Link.
 * @param string $shorts Shorts mode.
 * @return string Transient name.
 */
function vidgalblk_feed_cache_key( $url, $shorts ) {
	return 'vidgalblk_feed_' . md5( trim( (string) $url ) . '|' . (string) $shorts );
}

/**
 * A feed, from cache when it is fresh enough.
 *
 * A feed past its refresh time is still served straight away and refreshed in
 * the background (WP-Cron), so no visitor ever waits on YouTube. If YouTube
 * fails -- network, quota, a key that was revoked -- the last good list keeps
 * showing; a gallery never empties itself because of a bad hour.
 *
 * @param string $url     Link.
 * @param string $shorts  Shorts mode.
 * @param int    $refresh Hours between refreshes.
 * @param bool   $force   Skip the cache and ask YouTube now.
 * @return array|WP_Error Feed (see vidgalblk_feed_fetch()) plus `fetchedAt`, and
 *                        `stale` + `error` when an old copy is standing in.
 */
function vidgalblk_feed_get( $url, $shorts, $refresh = 6, $force = false ) {
	$shorts  = in_array( $shorts, array( 'hide', 'only' ), true ) ? $shorts : 'all';
	$parsed  = vidgalblk_feed_parse_url( $url );
	// Only a YouTube channel has separate Shorts lists; anything else is one
	// list whatever the setting, so it is cached once rather than three times.
	if ( is_wp_error( $parsed ) || ! empty( $parsed['provider'] ) || 'playlist' === $parsed['type'] ) {
		$shorts = 'all';
	}
	$refresh = in_array( (int) $refresh, VIDGALBLK_FEED_REFRESH_HOURS, true ) ? (int) $refresh : 6;
	$key     = vidgalblk_feed_cache_key( $url, $shorts );
	$cached  = get_transient( $key );
	$has     = is_array( $cached ) && isset( $cached['data'], $cached['time'] );

	if ( $has && ! $force ) {
		if ( time() - (int) $cached['time'] < $refresh * HOUR_IN_SECONDS ) {
			return $cached['data'] + array( 'fetchedAt' => (int) $cached['time'] );
		}

		$args = array( (string) $url, $shorts, $refresh );
		if ( ! wp_next_scheduled( 'vidgalblk_refresh_feed', $args ) ) {
			wp_schedule_single_event( time(), 'vidgalblk_refresh_feed', $args );
		}

		return $cached['data'] + array( 'fetchedAt' => (int) $cached['time'] );
	}

	$data = vidgalblk_feed_fetch( $url, $shorts );

	/**
	 * A fetch from YouTube or Vimeo failed, or worked -- for the critical
	 * issue alerts (includes/feed-alerts.php).
	 *
	 * @param WP_Error|string $data_or_url The error, or the link that loaded.
	 * @param string          $url         The link (failures only).
	 */
	if ( is_wp_error( $data ) ) {
		do_action( 'vidgalblk_feed_fetch_failed', $data, (string) $url );
	} else {
		do_action( 'vidgalblk_feed_fetch_ok', (string) $url );
	}

	if ( is_wp_error( $data ) ) {
		if ( $has ) {
			return $cached['data'] + array(
				'fetchedAt' => (int) $cached['time'],
				'stale'     => true,
				'error'     => $data->get_error_message(),
			);
		}
		return $data;
	}

	// Kept well past its refresh time on purpose: it is the fallback above.
	set_transient( $key, array( 'time' => time(), 'data' => $data ), 30 * DAY_IN_SECONDS );

	return $data + array( 'fetchedAt' => time() );
}

add_action(
	'vidgalblk_refresh_feed',
	function ( $url, $shorts, $refresh ) {
		vidgalblk_feed_get( $url, $shorts, $refresh, true );
	},
	10,
	3
);

/**
 * Who uploaded a single video, so the editor can offer that creator's whole
 * channel when someone pastes one video's link instead of a list.
 *
 * Uses the public oEmbed endpoints of YouTube and Vimeo, which need no key.
 *
 * @param string $url Pasted video link.
 * @return array|null `url` (channel / profile link) and `name`, or null.
 */
function vidgalblk_feed_video_owner( $url ) {
	$url = trim( (string) $url );
	if ( ! preg_match( '#^https?://#i', $url ) ) {
		$url = 'https://' . $url;
	}
	$host = strtolower( (string) wp_parse_url( $url, PHP_URL_HOST ) );

	if ( preg_match( '#(^|\.)vimeo\.com$#', $host ) ) {
		$endpoint = 'https://vimeo.com/api/oembed.json';
		$owner_re = '#^https://vimeo\.com/[\w-]+/?$#';
	} elseif ( preg_match( '#(^|\.)(youtube\.com|youtu\.be)$#', $host ) ) {
		$endpoint = 'https://www.youtube.com/oembed';
		$owner_re = '#^https://www\.youtube\.com/(@[^/?\#]+|channel/UC[\w-]{22}|user/[^/?\#]+|c/[^/?\#]+)/?$#u';
	} else {
		return null;
	}

	$cache_key = 'vidgalblk_owner_' . md5( $url );
	$cached    = get_transient( $cache_key );
	if ( false !== $cached ) {
		return is_array( $cached ) ? $cached : null;
	}

	$owner    = null;
	$response = wp_remote_get(
		add_query_arg(
			array(
				'url'    => $url,
				'format' => 'json',
			),
			$endpoint
		),
		array( 'timeout' => 5 )
	);

	if ( ! is_wp_error( $response ) && 200 === (int) wp_remote_retrieve_response_code( $response ) ) {
		$body = json_decode( wp_remote_retrieve_body( $response ), true );
		$link = isset( $body['author_url'] ) ? (string) $body['author_url'] : '';
		if ( preg_match( $owner_re, $link ) ) {
			$owner = array(
				'url'  => esc_url_raw( $link ),
				'name' => sanitize_text_field( (string) ( $body['author_name'] ?? '' ) ),
			);
		}
	}

	set_transient( $cache_key, $owner ? $owner : 'none', DAY_IN_SECONDS );

	return $owner;
}

/**
 * The videos a block should show from its feed, or null when it has none
 * switched on.
 *
 * @param array $attributes Block attributes.
 * @return array|null Videos (possibly empty) or null.
 */
function vidgalblk_feed_videos_for_block( $attributes ) {
	$feed = isset( $attributes['feed'] ) && is_array( $attributes['feed'] ) ? $attributes['feed'] : array();

	if ( empty( $feed['enabled'] ) || empty( $feed['url'] ) ) {
		return null;
	}

	$result = vidgalblk_feed_get(
		$feed['url'],
		$attributes['options']['shortsFilter'] ?? 'all',
		$feed['refresh'] ?? 6
	);

	if ( is_wp_error( $result ) ) {
		return array();
	}

	$count = max( 1, min( VIDGALBLK_FEED_MAX, (int) ( $feed['count'] ?? 12 ) ) );

	return array_slice( $result['videos'], 0, $count );
}

/*
 * Editor endpoints.
 *
 * `youtube-feed` previews a link while the owner sets the block up; anyone who
 * can edit posts can use it, since all it does is read public YouTube data
 * with the site's key. Saving the key itself is for administrators only.
 */
add_action(
	'rest_api_init',
	function () {
		register_rest_route(
			'vidgalblk/v1',
			'/youtube-feed',
			array(
				'methods'             => WP_REST_Server::READABLE,
				'permission_callback' => function () {
					return current_user_can( 'edit_posts' );
				},
				'args'                => array(
					'url'     => array(
						'type'              => 'string',
						'required'          => true,
						'sanitize_callback' => 'sanitize_text_field',
					),
					'shorts'  => array(
						'type'    => 'string',
						'default' => 'all',
						'enum'    => array( 'all', 'hide', 'only' ),
					),
					'refresh' => array(
						'type'    => 'integer',
						'default' => 6,
					),
					'force'   => array(
						'type'    => 'boolean',
						'default' => false,
					),
					'allModes' => array(
						'type'    => 'boolean',
						'default' => false,
					),
				),
				'callback'            => function ( WP_REST_Request $request ) {
					// The full list (up to 50): the editor applies "Number of videos" itself,
					// so moving that slider is instant.
					$result = vidgalblk_feed_get(
						$request['url'],
						$request['shorts'],
						$request['refresh'],
						$request['force']
					);

					if ( is_wp_error( $result ) ) {
						$data = array( 'status' => 400 );
						// One video pasted: offer its creator's whole channel instead.
						if ( 'vidgalblk_feed_single_video' === $result->get_error_code() ) {
							$owner = vidgalblk_feed_video_owner( $request['url'] );
							if ( $owner ) {
								$data['suggestion'] = $owner;
							}
						}
						$result->add_data( $data );
						return $result;
					}

					/*
					 * For a channel, the editor can ask for all three Shorts lists
					 * at once, in one request, and keep them: switching the Shorts
					 * setting then needs no request at all. One request rather
					 * than three matters on hosts that answer requests one by one.
					 */
					if ( $request['allModes'] && ! empty( $result['shortsApplied'] ) ) {
						$modes = array();
						foreach ( array( 'all', 'hide', 'only' ) as $mode ) {
							$list           = $mode === $request['shorts'] ? $result : vidgalblk_feed_get( $request['url'], $mode, $request['refresh'] );
							$modes[ $mode ] = is_wp_error( $list ) ? null : $list['videos'];
						}
						$result['modes'] = $modes;
					}

					return $result;
				},
			)
		);

		register_rest_route(
			'vidgalblk/v1',
			'/youtube-key',
			array(
				array(
					'methods'             => WP_REST_Server::READABLE,
					'permission_callback' => function () {
						return current_user_can( 'edit_posts' );
					},
					'callback'            => function () {
						$key = vidgalblk_feed_api_key();
						return array(
							'connected'   => '' !== $key,
							'canManage'   => current_user_can( 'manage_options' ),
							'fromConfig'  => defined( 'VIDGALBLK_YOUTUBE_API_KEY' ) && VIDGALBLK_YOUTUBE_API_KEY,
							// Enough to recognise it, never enough to use it.
							'masked'      => '' !== $key ? substr( $key, 0, 4 ) . '…' . substr( $key, -4 ) : '',
						);
					},
				),
				array(
					'methods'             => WP_REST_Server::CREATABLE,
					'permission_callback' => function () {
						return current_user_can( 'manage_options' );
					},
					'args'                => array(
						'key' => array(
							'type'              => 'string',
							'default'           => '',
							'sanitize_callback' => 'sanitize_text_field',
						),
					),
					'callback'            => function ( WP_REST_Request $request ) {
						$key = trim( (string) $request['key'] );

						if ( '' === $key ) {
							delete_option( 'vidgalblk_youtube_api_key' );
							return array( 'connected' => '' !== vidgalblk_feed_api_key() );
						}

						// Test before saving, with the cheapest call there is (1
						// unit), so a bad key is caught here, with its reason,
						// rather than later as an empty gallery.
						$test = vidgalblk_feed_api(
							'videos',
							array(
								'part' => 'id',
								'id'   => 'dQw4w9WgXcQ',
							),
							$key
						);

						if ( is_wp_error( $test ) ) {
							$test->add_data( array( 'status' => 400 ) );
							return $test;
						}

						update_option( 'vidgalblk_youtube_api_key', $key, false );

						return array(
							'connected' => true,
							'masked'    => substr( $key, 0, 4 ) . '…' . substr( $key, -4 ),
						);
					},
				),
			)
		);
	}
);
