<?php
/**
 * Vimeo channel / showcase / user auto-feed.
 *
 * The Vimeo side of the channel feed in youtube-feed.php: the same link field,
 * the same cache and the same "last good list keeps showing" fallback, so a
 * gallery behaves the same whichever site its videos come from.
 *
 * Unlike YouTube this needs no key. Vimeo's "Simple API" (vimeo.com/api/v2)
 * still answers without one for public users, channels, groups and showcases,
 * 20 videos a page, 3 pages at most. Vimeo calls that API deprecated, so the
 * channel / user / group RSS feeds -- also key-less -- stand in if it ever
 * stops answering. Vimeo's current API (api.vimeo.com) needs an access token
 * for everything, which is a setup step not worth asking of anyone for public
 * videos.
 *
 * Only public videos come back, from either source: private and unlisted
 * videos never appear in a feed.
 *
 * @package video-gallery-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/** Videos on one page of the Simple API; it serves 3 pages at most. */
const VIDGALBLK_VIMEO_PAGE = 20;

/**
 * Work out what a pasted Vimeo link points at.
 *
 * @param string $host  Lower-cased host.
 * @param string $path  URL path.
 * @return array|WP_Error `provider` (vimeo), `type` (vimeo_user, vimeo_channel,
 *                        vimeo_group, vimeo_album) and `id`.
 */
function vidgalblk_vimeo_feed_parse( $host, $path ) {
	$single = new WP_Error( 'vidgalblk_feed_single_video', __( 'This is a link to one video, not a list. Paste the link of a Vimeo profile (vimeo.com/name), channel (vimeo.com/channels/…) or showcase (vimeo.com/showcase/…) instead.', 'video-gallery-block' ) );

	if ( 'player.vimeo.com' === $host ) {
		return $single;
	}

	$parts = array_values( array_filter( explode( '/', $path ), 'strlen' ) );
	$first = strtolower( $parts[0] ?? '' );
	$next  = $parts[1] ?? '';

	// A link copied from a video inside a channel or showcase means that list.
	if ( 'channels' === $first && preg_match( '#^[\w-]+$#', $next ) ) {
		return array( 'provider' => 'vimeo', 'type' => 'vimeo_channel', 'id' => $next );
	}
	if ( 'groups' === $first && preg_match( '#^[\w-]+$#', $next ) ) {
		return array( 'provider' => 'vimeo', 'type' => 'vimeo_group', 'id' => $next );
	}
	if ( in_array( $first, array( 'showcase', 'album' ), true ) ) {
		if ( preg_match( '#^\d+$#', $next ) ) {
			return array( 'provider' => 'vimeo', 'type' => 'vimeo_album', 'id' => $next );
		}
		return new WP_Error( 'vidgalblk_feed_unsupported', __( 'Use the showcase link with its number (vimeo.com/showcase/1234567). On Vimeo, open the showcase and copy the address from its Share button.', 'video-gallery-block' ) );
	}

	if ( '' === $first || preg_match( '#^\d+$#', $first ) || in_array( $first, array( 'video', 'ondemand', 'event', 'manage' ), true ) ) {
		return $first ? $single : new WP_Error( 'vidgalblk_feed_unsupported', __( 'Paste the link of a Vimeo profile, channel or showcase.', 'video-gallery-block' ) );
	}

	// Vimeo's own pages, which are not anybody's profile.
	$reserved = array( 'categories', 'search', 'watch', 'features', 'blog', 'help', 'join', 'log_in', 'upload', 'settings', 'stock', 'solutions', 'enterprise', 'create', 'pricing', 'home' );
	if ( in_array( $first, $reserved, true ) || ! preg_match( '#^[\w-]{2,}$#', $parts[0] ) ) {
		return new WP_Error( 'vidgalblk_feed_unsupported', __( 'That does not look like a Vimeo profile, channel or showcase link.', 'video-gallery-block' ) );
	}

	return array( 'provider' => 'vimeo', 'type' => 'vimeo_user', 'id' => $parts[0] );
}

/**
 * One call to the Simple API.
 *
 * @param string $path e.g. 'channel/staffpicks/videos'.
 * @param array  $query Query arguments.
 * @return array|WP_Error Decoded response.
 */
function vidgalblk_vimeo_feed_api( $path, $query = array() ) {
	$response = wp_remote_get(
		add_query_arg( $query, 'https://vimeo.com/api/v2/' . $path . '.json' ),
		array( 'timeout' => 8 )
	);

	if ( is_wp_error( $response ) ) {
		return new WP_Error( 'vidgalblk_feed_network', __( 'Your site could not reach Vimeo just now. Please try again in a minute.', 'video-gallery-block' ) );
	}

	$code = (int) wp_remote_retrieve_response_code( $response );
	$body = json_decode( wp_remote_retrieve_body( $response ), true );

	if ( 200 === $code && is_array( $body ) ) {
		return $body;
	}
	if ( 404 === $code ) {
		return new WP_Error( 'vidgalblk_feed_not_found', __( 'We could not find that on Vimeo. Check that the link opens on Vimeo and that it is public.', 'video-gallery-block' ) );
	}

	return new WP_Error(
		'vidgalblk_feed_api_error',
		sprintf(
			/* translators: %d: HTTP status code. */
			__( 'Vimeo answered with an error (%d). Please try again later.', 'video-gallery-block' ),
			$code
		)
	);
}

/**
 * A Vimeo date ("2026-06-17 12:41:41", New York time) as a Unix timestamp.
 *
 * @param string $date Date from the Simple API.
 * @return int|false Timestamp.
 */
function vidgalblk_vimeo_feed_time( $date ) {
	if ( ! $date ) {
		return false;
	}
	try {
		return ( new DateTimeImmutable( $date, new DateTimeZone( 'America/New_York' ) ) )->getTimestamp();
	} catch ( Exception $e ) {
		return false;
	}
}

/**
 * One feed video, shaped like the YouTube ones.
 *
 * The poster comes with it, at 1280px rather than the 640px the API names: the
 * gallery then shows it straight away, the same in the editor and on the page,
 * instead of asking Vimeo for each thumbnail one video at a time.
 *
 * @param string   $id        Vimeo video id.
 * @param string   $title     Title.
 * @param int|bool $timestamp Upload time.
 * @param string   $thumbnail Thumbnail URL.
 * @param array    $extra     Optional: channel, channelUrl.
 * @return array Video.
 */
function vidgalblk_vimeo_feed_video( $id, $title, $timestamp, $thumbnail, $extra = array() ) {
	$thumbnail = (string) $thumbnail;
	if ( preg_match( '#^https://i\.vimeocdn\.com/#', $thumbnail ) ) {
		$thumbnail = preg_replace( '#-d_\d+(x\d+)?(?=$|\?)#', '-d_1280', $thumbnail );
	} else {
		$thumbnail = '';
	}

	return array(
		'video'      => 'https://vimeo.com/' . $id,
		'caption'    => (string) $title,
		'poster'     => esc_url_raw( $thumbnail ),
		'albs'       => array(),
		'dateAdded'  => $timestamp ? $timestamp * 1000 : 0,
		'uploadDate' => $timestamp ? gmdate( 'c', $timestamp ) : '',
	) + vidgalblk_vimeo_feed_details( $extra );
}

/**
 * The channel a Vimeo source gave, cleaned; empty ones left out.
 *
 * @param array $extra channel, channelUrl.
 * @return array
 */
function vidgalblk_vimeo_feed_details( $extra ) {
	$out = array();
	if ( ! empty( $extra['channel'] ) ) {
		$out['channel'] = sanitize_text_field( (string) $extra['channel'] );
	}
	if ( ! empty( $extra['channelUrl'] ) && preg_match( '#^https://vimeo\.com/#', (string) $extra['channelUrl'] ) ) {
		$out['channelUrl'] = esc_url_raw( (string) $extra['channelUrl'] );
	}
	return $out;
}

/**
 * The same list from the RSS feed, for when the Simple API does not answer.
 *
 * Showcases have no RSS feed, so there is nothing to fall back to for them.
 *
 * @param array $parsed From vidgalblk_vimeo_feed_parse().
 * @return array|WP_Error `title` and `videos`.
 */
function vidgalblk_vimeo_feed_rss( $parsed ) {
	$paths = array(
		'vimeo_user'    => '%s/videos/rss',
		'vimeo_channel' => 'channels/%s/videos/rss',
		'vimeo_group'   => 'groups/%s/videos/rss',
	);
	if ( ! isset( $paths[ $parsed['type'] ] ) || ! function_exists( 'simplexml_load_string' ) ) {
		return new WP_Error( 'vidgalblk_feed_network', __( 'Your site could not reach Vimeo just now. Please try again in a minute.', 'video-gallery-block' ) );
	}

	$response = wp_remote_get( 'https://vimeo.com/' . sprintf( $paths[ $parsed['type'] ], rawurlencode( $parsed['id'] ) ), array( 'timeout' => 8 ) );
	if ( is_wp_error( $response ) ) {
		return new WP_Error( 'vidgalblk_feed_network', __( 'Your site could not reach Vimeo just now. Please try again in a minute.', 'video-gallery-block' ) );
	}
	if ( 200 !== (int) wp_remote_retrieve_response_code( $response ) ) {
		return new WP_Error( 'vidgalblk_feed_not_found', __( 'We could not find that on Vimeo. Check that the link opens on Vimeo and that it is public.', 'video-gallery-block' ) );
	}

	$previous = libxml_use_internal_errors( true );
	$xml      = simplexml_load_string( wp_remote_retrieve_body( $response ), 'SimpleXMLElement', LIBXML_NONET );
	libxml_use_internal_errors( $previous );

	if ( ! $xml || ! isset( $xml->channel ) ) {
		return new WP_Error( 'vidgalblk_feed_api_error', __( 'Vimeo sent something we could not read. Please try again later.', 'video-gallery-block' ) );
	}

	$videos = array();
	foreach ( $xml->channel->item as $item ) {
		if ( ! preg_match( '#(\d{6,})/?$#', (string) $item->link, $m ) ) {
			continue;
		}
		$media     = $item->children( 'http://search.yahoo.com/mrss/' );
		$thumbnail = isset( $media->content->thumbnail ) ? (string) $media->content->thumbnail->attributes()->url : '';
		$time      = strtotime( (string) $item->pubDate );
		$extra     = array(
			'channel' => isset( $media->content->credit ) ? (string) $media->content->credit : '',
		);
		// A user's own feed: every video is theirs, so their page is known.
		if ( 'vimeo_user' === $parsed['type'] ) {
			$extra['channelUrl'] = 'https://vimeo.com/' . rawurlencode( $parsed['id'] );
		}

		$videos[] = vidgalblk_vimeo_feed_video( $m[1], (string) $item->title, $time, $thumbnail, $extra );
		if ( count( $videos ) >= VIDGALBLK_FEED_MAX ) {
			break;
		}
	}

	// "Vimeo / Name's videos" -> "Name's videos" is close enough as a title.
	$title = preg_replace( '#^Vimeo\s*/\s*#', '', (string) $xml->channel->title );

	return array(
		'title'  => $title,
		'videos' => $videos,
	);
}

/**
 * Fetch a Vimeo feed, uncached.
 *
 * @param array $parsed From vidgalblk_vimeo_feed_parse().
 * @return array|WP_Error Same shape as vidgalblk_feed_fetch().
 */
function vidgalblk_vimeo_feed_fetch( $parsed ) {
	$prefixes = array(
		'vimeo_user'    => '',
		'vimeo_channel' => 'channel/',
		'vimeo_group'   => 'group/',
		'vimeo_album'   => 'album/',
	);
	$base = $prefixes[ $parsed['type'] ] . rawurlencode( $parsed['id'] );
	$kind = 'vimeo_album' === $parsed['type'] ? 'playlist' : 'channel';

	$list = vidgalblk_vimeo_feed_api( $base . '/videos' );

	if ( is_wp_error( $list ) ) {
		// "Not found" is an answer; anything else may be the API itself failing.
		if ( 'vidgalblk_feed_not_found' === $list->get_error_code() ) {
			return $list;
		}
		$rss = vidgalblk_vimeo_feed_rss( $parsed );
		if ( is_wp_error( $rss ) ) {
			return $list;
		}
		return array(
			'title'         => $rss['title'],
			'kind'          => $kind,
			'provider'      => 'vimeo',
			'shortsApplied' => false,
			'videos'        => $rss['videos'],
		);
	}

	$items = $list;
	for ( $page = 2; $page <= 3 && count( $list ) >= VIDGALBLK_VIMEO_PAGE && count( $items ) < VIDGALBLK_FEED_MAX; $page++ ) {
		$list = vidgalblk_vimeo_feed_api( $base . '/videos', array( 'page' => $page ) );
		if ( is_wp_error( $list ) || ! $list ) {
			break;
		}
		$items = array_merge( $items, $list );
	}

	$videos = array();
	foreach ( $items as $item ) {
		$id = isset( $item['id'] ) ? (string) $item['id'] : '';

		// "nowhere" means the owner turned embedding off; it could not play here.
		if ( ! preg_match( '#^\d+$#', $id ) || 'nowhere' === ( $item['embed_privacy'] ?? '' ) ) {
			continue;
		}

		$videos[] = vidgalblk_vimeo_feed_video(
			$id,
			$item['title'] ?? '',
			vidgalblk_vimeo_feed_time( $item['upload_date'] ?? '' ),
			$item['thumbnail_large'] ?? '',
			array(
				'channel'    => $item['user_name'] ?? '',
				'channelUrl' => $item['user_url'] ?? '',
			)
		);
		if ( count( $videos ) >= VIDGALBLK_FEED_MAX ) {
			break;
		}
	}

	// The name, for the editor's status line; a feed works without it.
	$info  = vidgalblk_vimeo_feed_api( $base . '/info' );
	$title = '';
	if ( ! is_wp_error( $info ) ) {
		$title = $info['display_name'] ?? ( $info['name'] ?? ( $info['title'] ?? '' ) );
	}

	return array(
		'title'         => (string) $title,
		'kind'          => $kind,
		'provider'      => 'vimeo',
		'shortsApplied' => false,
		'videos'        => $videos,
	);
}
