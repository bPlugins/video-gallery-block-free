<?php
/**
 * Helpers shared by the block's server-side render.
 *
 * These exist because the gallery is now rendered on the server as well as in
 * the browser. Before, `render.php` emitted an empty `<div>` and everything --
 * the thumbnails, the links, the captions -- was built by React after the page
 * had loaded. That meant search engines never saw a single video, the space
 * where the gallery goes was blank until the JavaScript ran, and if that
 * JavaScript failed or was blocked the gallery simply was not there.
 *
 * @package video-gallery-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/*
 * Video SEO markup. Kept in its own file, and attached through the same action
 * the Pro plugin fires (`vgb_after_block`), so one implementation can serve
 * every block in both plugins.
 */
require_once __DIR__ . '/schema.php';

add_action(
	'vidgalblk_after_block',
	function ( $attributes ) {
		vidgalblk_print_video_schema( $attributes );
	}
);

/**
 * The 11-character video id in any shape of YouTube URL.
 *
 * Kept in step with `getYoutubeId()` in the block's JavaScript, including the
 * `shorts/` and `live/` forms.
 *
 * @param string $url Video URL.
 * @return string Video id, or '' if the URL is not YouTube.
 */
function vidgalblk_youtube_id( $url ) {
	if ( ! is_string( $url ) || '' === $url ) {
		return '';
	}

	$patterns = array(
		'#youtu\.be/([\w-]{11})#',
		'#youtube\.com/watch\?(?:.*&)?v=([\w-]{11})#',
		'#youtube\.com/(?:embed|v|shorts|live)/([\w-]{11})#',
		'#youtube\.com/u/\w+/([\w-]{11})#',
	);

	foreach ( $patterns as $pattern ) {
		if ( preg_match( $pattern, $url, $matches ) ) {
			return $matches[1];
		}
	}

	return '';
}

/**
 * The numeric video id in a Vimeo URL.
 *
 * @param string $url Video URL.
 * @return string Video id, or '' if the URL is not Vimeo.
 */
function vidgalblk_vimeo_id( $url ) {
	if ( ! is_string( $url ) || '' === $url ) {
		return '';
	}

	if ( preg_match( '#vimeo\.com/(?:video/|channels/[\w-]+/|groups/[\w-]+/videos/)?(\d{6,})#', $url, $matches ) ) {
		return $matches[1];
	}

	return '';
}

/**
 * Whether a URL is a Facebook video link (a Watch page, a video permalink, or
 * an `fb.watch` short link).
 *
 * Unlike YouTube and Vimeo, there is no id to pull out -- Facebook's public
 * embed iframe (`vidgalblk_facebook_embed_url()`) takes the whole URL, not an
 * id -- so this only has to say yes or no.
 *
 * @param string $url Video URL.
 * @return bool
 */
function vidgalblk_is_facebook_video( $url ) {
	return is_string( $url ) && (bool) preg_match( '#(?:facebook\.com/.+/videos/|facebook\.com/watch/?\?|facebook\.com/reel/|facebook\.com/share/[rv]/|fb\.watch/)#', $url );
}

/**
 * Facebook's public video-embed iframe URL for a Facebook video link.
 *
 * This is the one part of Facebook video support that needs no API key: the
 * `/plugins/video.php` iframe is the same public embed Facebook's own "Embed"
 * share option generates, and plays the video without any app credentials.
 * Getting the video's *title or thumbnail* automatically is the part that
 * would need one -- Facebook's oEmbed endpoint requires an app access token
 * where YouTube's and Vimeo's do not -- which is why this plugin asks for a
 * poster image and caption to be set by hand for a Facebook video, the same
 * as it already does for a self-hosted file with neither.
 *
 * @param string $url Facebook video URL.
 * @return string Embed iframe URL.
 */
function vidgalblk_facebook_embed_url( $url ) {
	// `add_query_arg()` encodes each value itself -- encoding `$url` first as
	// well would double-encode it, the same trap noted on
	// `vidgalblk_vimeo_thumbnail()` above.
	return add_query_arg(
		array(
			'href'      => $url,
			'show_text' => 'false',
		),
		'https://www.facebook.com/plugins/video.php'
	);
}

/**
 * Whether a URL is a YouTube Shorts link.
 *
 * Duration is not something this plugin can ask a video for -- there is no
 * API key here to ask YouTube's Data API with -- but a Short's URL always
 * says so itself, so that is what stands in for it.
 *
 * @param string $url Video URL.
 * @return bool
 */
function vidgalblk_is_youtube_short( $url ) {
	return is_string( $url ) && (bool) preg_match( '#youtube\.com/shorts/#', $url );
}

/**
 * A gallery's videos, with Shorts included, excluded, or kept as the only
 * ones -- whichever the `shortsFilter` option asks for.
 *
 * This is an editorial choice the gallery owner makes once, not something a
 * visitor toggles -- unlike the album filter buttons, which is why it is
 * applied here, before the video list reaches either the server-rendered
 * markup or the JSON a visitor's browser hydrates from, rather than as a
 * client-side filter a visitor could see change.
 *
 * @param array  $videos The block's `videos` attribute.
 * @param string $mode   'all', 'hide', or 'only'.
 * @return array Filtered videos, reindexed.
 */
function vidgalblk_apply_shorts_filter( $videos, $mode ) {
	if ( ! in_array( $mode, array( 'hide', 'only' ), true ) ) {
		return $videos;
	}

	return array_values(
		array_filter(
			$videos,
			function ( $video ) use ( $mode ) {
				$is_short = is_array( $video ) && vidgalblk_is_youtube_short( $video['video'] ?? '' );
				return 'only' === $mode ? $is_short : ! $is_short;
			}
		)
	);
}

/**
 * A gallery's videos, reordered by when each was added to it.
 *
 * Applied here rather than in JavaScript for the same reason as the Shorts
 * filter above: an editorial choice the gallery owner makes once should
 * render that way from the very first byte, so the server-rendered markup,
 * the JSON a visitor's browser hydrates from, and the video-schema markup
 * never briefly disagree with each other.
 *
 * A video added before this option existed carries no `dateAdded` and is
 * treated as timestamp 0 -- the oldest possible entry -- so "Oldest First"
 * puts it exactly where it belongs, and "Newest First" leaves it undisturbed
 * at the bottom rather than jumbling it in among videos that do have a real
 * date.
 *
 * @param array  $videos The block's `videos` attribute.
 * @param string $mode   'manual', 'newest', or 'oldest'.
 * @return array Reordered videos.
 */
function vidgalblk_apply_sort_order( $videos, $mode ) {
	if ( ! is_array( $videos ) || count( $videos ) < 2 ) {
		return $videos;
	}

	if ( ! in_array( $mode, array( 'newest', 'oldest' ), true ) ) {
		return $videos;
	}

	usort(
		$videos,
		function ( $a, $b ) use ( $mode ) {
			$a_date = is_array( $a ) && ! empty( $a['dateAdded'] ) ? (int) $a['dateAdded'] : 0;
			$b_date = is_array( $b ) && ! empty( $b['dateAdded'] ) ? (int) $b['dateAdded'] : 0;

			return 'newest' === $mode ? ( $b_date <=> $a_date ) : ( $a_date <=> $b_date );
		}
	);

	return $videos;
}

/**
 * A Vimeo thumbnail, via Vimeo's oEmbed endpoint, cached.
 *
 * There is no way to work a Vimeo thumbnail URL out from the video URL the way
 * there is for YouTube, so it has to be asked for. New videos get their poster
 * filled in by the editor when the URL is pasted, so this is really for
 * galleries built before that existed -- which is why a miss is cached too, and
 * why a slow or unreachable Vimeo can never hold a page render open for long.
 *
 * @param string $video_id Vimeo video id.
 * @return string Thumbnail URL, or '' if it could not be resolved.
 */
function vidgalblk_vimeo_thumbnail( $video_id ) {
	$cache_key = 'vidgalblk_vimeo_' . $video_id;
	$cached    = get_transient( $cache_key );

	if ( false !== $cached ) {
		return is_string( $cached ) ? $cached : '';
	}

	// `add_query_arg()` encodes the value itself -- encoding it first as well
	// produces a double-encoded URL that Vimeo answers with a 404.
	$response = wp_safe_remote_get(
		add_query_arg(
			'url',
			'https://vimeo.com/' . $video_id,
			'https://vimeo.com/api/oembed.json'
		),
		array( 'timeout' => 3 )
	);

	$thumbnail = '';

	if ( ! is_wp_error( $response ) && 200 === wp_remote_retrieve_response_code( $response ) ) {
		$data = json_decode( wp_remote_retrieve_body( $response ), true );

		if ( ! empty( $data['thumbnail_url'] ) ) {
			$thumbnail = esc_url_raw( $data['thumbnail_url'] );
		}
	}

	// A week for a hit, an hour for a miss: long enough not to matter, short
	// enough that a transient failure fixes itself.
	set_transient( $cache_key, $thumbnail, $thumbnail ? WEEK_IN_SECONDS : HOUR_IN_SECONDS );

	return $thumbnail;
}

/**
 * Download a remote thumbnail into the Media Library, once, permanently.
 *
 * Every visitor's browser used to fetch YouTube's and Vimeo's thumbnails
 * directly -- a request to a third party on every page view, a permanent 404
 * in the grid the day YouTube reshuffles a thumbnail size, and one more
 * external host for a site trying to keep its GDPR request list short. This
 * fetches the image once and serves it from the site's own Media Library
 * after that, the same way an uploaded poster already is.
 *
 * Deliberately not a background job: this plugin has no cron infrastructure,
 * and adding one for a single image fetch is more machinery than the problem
 * needs. Instead this runs inline during render, the same place
 * `vidgalblk_vimeo_thumbnail()` already makes a network call -- but capped at
 * one caching attempt per request, so a gallery full of not-yet-cached videos
 * cannot turn a single page load into a dozen sequential downloads. The rest
 * fall back to hotlinking for this view and get cached on a later one; the
 * gallery is never left waiting on a slow or unreachable source.
 *
 * @param string $remote_url Thumbnail URL as it comes from YouTube or Vimeo.
 * @param string $cache_key  Stable id for this thumbnail, e.g. `yt_dQw4w9WgXcQ`.
 * @return string The Media Library URL once cached, otherwise `$remote_url`.
 *
 * Known, low-severity limitation: the "does a cached copy already exist"
 * check and the "create one" step are not atomic. Two requests that both hit
 * the same not-yet-cached video within moments of each other -- two visitors
 * loading the gallery at once, or one visitor's page being requested twice in
 * quick succession -- can each decide the video is not yet cached and both
 * end up downloading and inserting an attachment for it. The gallery still
 * renders correctly either way, since every visitor's request resolves to a
 * valid attachment; the only cost is an extra, unused file left behind in the
 * Media Library. A mutex around this would close it, but is more machinery
 * than a cosmetic, self-limiting duplicate justifies.
 */
function vidgalblk_cache_remote_thumbnail( $remote_url, $cache_key ) {
	if ( '' === $remote_url ) {
		return '';
	}

	$option_name = 'vidgalblk_cthumb_' . $cache_key;
	$attachment_id = get_option( $option_name );

	if ( $attachment_id ) {
		$cached_url = wp_get_attachment_url( (int) $attachment_id );
		if ( $cached_url ) {
			return $cached_url;
		}
		// The attachment was deleted from under us -- fall through and redo it.
		delete_option( $option_name );
	}

	static $vidgalblk_caching_budget = 1;

	if ( $vidgalblk_caching_budget < 1 ) {
		return $remote_url;
	}

	// A source that failed a minute ago is not worth trying again this second.
	$miss_key = 'vidgalblk_cmiss_' . $cache_key;
	if ( get_transient( $miss_key ) ) {
		return $remote_url;
	}

	$vidgalblk_caching_budget--;

	if ( ! function_exists( 'wp_generate_attachment_metadata' ) ) {
		require_once ABSPATH . 'wp-admin/includes/image.php';
	}
	if ( ! function_exists( 'download_url' ) ) {
		require_once ABSPATH . 'wp-admin/includes/file.php';
	}

	$tmp_file = download_url( $remote_url, 5 );

	if ( is_wp_error( $tmp_file ) ) {
		set_transient( $miss_key, 1, HOUR_IN_SECONDS );
		return $remote_url;
	}

	$path      = wp_parse_url( $remote_url, PHP_URL_PATH );
	$extension = $path ? strtolower( pathinfo( $path, PATHINFO_EXTENSION ) ) : '';
	if ( ! in_array( $extension, array( 'jpg', 'jpeg', 'png', 'webp' ), true ) ) {
		$extension = 'jpg';
	}

	$upload = wp_upload_bits(
		sanitize_file_name( $cache_key . '.' . $extension ),
		null,
		file_get_contents( $tmp_file ) // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents -- reading our own just-downloaded temp file, not a remote stream.
	);

	wp_delete_file( $tmp_file );

	if ( ! empty( $upload['error'] ) ) {
		set_transient( $miss_key, 1, HOUR_IN_SECONDS );
		return $remote_url;
	}

	$filetype   = wp_check_filetype( $upload['file'] );
	$attach_id  = wp_insert_attachment(
		array(
			'post_mime_type' => $filetype['type'] ? $filetype['type'] : 'image/jpeg',
			'post_title'     => sanitize_file_name( $cache_key ),
			'post_status'    => 'inherit',
			'post_content'   => '',
			'guid'           => $upload['url'],
		),
		$upload['file']
	);

	if ( is_wp_error( $attach_id ) || ! $attach_id ) {
		set_transient( $miss_key, 1, HOUR_IN_SECONDS );
		return $remote_url;
	}

	/*
	 * No `wp_generate_attachment_metadata()` here on purpose -- that would
	 * resize this into WordPress's full set of registered image sizes, work
	 * this plugin has no use for. The grid always requests one size, so the
	 * file as downloaded is the only size that is ever needed.
	 */
	update_option( $option_name, $attach_id, false );

	return $upload['url'];
}

/**
 * The best YouTube thumbnail that exists for a video, cached.
 *
 * Tried in the same order as `getYoutubeThumbnails()` in the block's script --
 * maxres (16:9, 1280px), then sd, then hq (both 4:3) -- so the live page shows
 * the very picture the editor does. It used to go straight to `hqdefault.jpg`
 * here while the editor showed `maxresdefault.jpg`: a 4:3 image cropped into
 * a 16:9 tile loses its top and bottom, so the same gallery looked different
 * on the page (most visibly on Shorts, whose 16:9 thumbnail has the vertical
 * frame centred between blurred sides), and blurrier too.
 *
 * A size YouTube does not have answers 404; it is remembered as missing and
 * the next one is tried on a later page view. Until a size is cached the
 * remote URL is returned, and the script steps down the same list on error,
 * so a missing maxres never shows as a broken image.
 *
 * @param string $id YouTube video id.
 * @return string Image URL.
 */
function vidgalblk_youtube_thumbnail( $id ) {
	$sizes = array( 'maxresdefault', 'sddefault', 'hqdefault' );

	foreach ( $sizes as $size ) {
		$attachment = get_option( 'vidgalblk_cthumb_yt_' . $size . '_' . $id );
		$cached     = $attachment ? wp_get_attachment_url( (int) $attachment ) : '';
		if ( $cached ) {
			vidgalblk_forget_legacy_youtube_thumbnail( $id );
			return $cached;
		}
	}

	foreach ( $sizes as $size ) {
		$key = 'yt_' . $size . '_' . $id;
		if ( get_transient( 'vidgalblk_cmiss_' . $key ) ) {
			continue;
		}
		return vidgalblk_cache_remote_thumbnail( 'https://img.youtube.com/vi/' . $id . '/' . $size . '.jpg', $key );
	}

	return 'https://img.youtube.com/vi/' . $id . '/hqdefault.jpg';
}

/**
 * Remove the hqdefault copy cached under the old key (`yt_{id}`) once a copy
 * under the new keys exists, so upgrading does not leave a second, unused
 * image per video in the Media Library.
 *
 * @param string $id YouTube video id.
 */
function vidgalblk_forget_legacy_youtube_thumbnail( $id ) {
	$option     = 'vidgalblk_cthumb_yt_' . $id;
	$attachment = get_option( $option );

	if ( $attachment ) {
		wp_delete_attachment( (int) $attachment, true );
		delete_option( $option );
	}
}

/**
 * The image to show for one video.
 *
 * A poster the user set always wins -- it is the user's own choice and, if
 * uploaded through the media picker, is already local. Otherwise the best
 * YouTube thumbnail there is (see vidgalblk_youtube_thumbnail()), or Vimeo's
 * oEmbed thumbnail. Both are cached into the Media Library so this is asked
 * of the source only once per video, ever, rather than by every visitor's
 * browser on every page view.
 *
 * @param array $video One entry from the `videos` attribute.
 * @return string Image URL, or '' if there is nothing to show.
 */
function vidgalblk_thumbnail_url( $video ) {
	if ( ! empty( $video['poster'] ) ) {
		return $video['poster'];
	}

	$url = isset( $video['video'] ) ? $video['video'] : '';

	$youtube_id = vidgalblk_youtube_id( $url );
	if ( $youtube_id ) {
		return vidgalblk_youtube_thumbnail( $youtube_id );
	}

	$vimeo_id = vidgalblk_vimeo_id( $url );
	if ( $vimeo_id ) {
		$vimeo_thumb = vidgalblk_vimeo_thumbnail( $vimeo_id );
		return vidgalblk_cache_remote_thumbnail( $vimeo_thumb, 'vimeo_' . $vimeo_id );
	}

	return '';
}

/**
 * A CSS-safe class for an album, from its position in the album list.
 *
 * Matches `albumClass()` in the block's JavaScript. Position rather than name,
 * because slugifying the name dropped every non-Latin character -- a Bengali or
 * Cyrillic album name came out empty -- and names starting with a digit
 * produced classes no CSS selector can address.
 *
 * @param array  $albums The block's album list.
 * @param string $album  Album to get a class for.
 * @return string Class name, or '' if the album is not in the list.
 */
function vidgalblk_album_class( $albums, $album ) {
	if ( ! is_array( $albums ) ) {
		return '';
	}

	$index = array_search( $album, $albums, true );

	return false === $index ? '' : 'vgbAlb' . (int) $index;
}

/**
 * Classes for every album a video belongs to.
 *
 * @param array $albums The block's album list.
 * @param array $albs   Albums this video is in.
 * @return string Space-separated class names.
 */
function vidgalblk_album_classes( $albums, $albs ) {
	if ( ! is_array( $albs ) ) {
		return '';
	}

	$classes = array();

	foreach ( $albs as $alb ) {
		$class = vidgalblk_album_class( $albums, $alb );
		if ( $class ) {
			$classes[] = $class;
		}
	}

	return implode( ' ', $classes );
}

/**
 * The subset of HTML a caption may contain.
 *
 * Deliberately the same list the block's JavaScript sanitiser allows, so a
 * caption does not change shape between the server-rendered markup and what
 * React puts in its place.
 *
 * @return array Allowed tags, in `wp_kses()` form.
 */
function vidgalblk_caption_tags() {
	return array(
		'b'      => array( 'class' => array(), 'style' => array() ),
		'strong' => array( 'class' => array(), 'style' => array() ),
		'i'      => array( 'class' => array(), 'style' => array() ),
		'em'     => array( 'class' => array(), 'style' => array() ),
		'span'   => array( 'class' => array(), 'style' => array() ),
		'a'      => array(
			'class'  => array(),
			'style'  => array(),
			'href'   => array(),
			'target' => array(),
			'rel'    => array(),
		),
		'br'     => array(),
	);
}

/**
 * A video or poster link, made safe to print and to hand to the lightbox.
 *
 * Fancybox treats a link that ends like an image file as a picture and writes
 * it, with the caption, into an <img> tag as text -- so a YouTube or Vimeo link
 * with ".jpg" on the end is cut back to the plain video link, and
 * esc_url_raw() drops quotes and angle brackets, which could otherwise close
 * the attribute the link is written into.
 *
 * @param string $url A video or poster link.
 * @return string The link, safe to use.
 */
function vidgalblk_clean_link( $url ) {
	$url = trim( (string) $url );

	if ( '' === $url ) {
		return '';
	}

	if ( preg_match( '/\.(avif|bmp|gif|ico|jpe?g|png|svg|webp)(?:[?#]|$)/i', $url ) ) {
		if ( preg_match( '#youtube(?:-nocookie)?\.com|youtu\.be#i', $url ) && preg_match( '#(?:[?&]v=|youtu\.be/|/embed/|/shorts/|/live/)([A-Za-z0-9_-]{11})#i', $url, $match ) ) {
			$url = 'https://www.youtube.com/watch?v=' . $match[1];
		} elseif ( preg_match( '#vimeo\.com/(?:.*/)?(\d+)#i', $url, $match ) ) {
			$url = 'https://vimeo.com/' . $match[1];
		}
	}

	return esc_url_raw( $url );
}

/**
 * The videos of a gallery with every link and caption cleaned.
 *
 * A caption can come from a stranger -- it is filled in from the video's title
 * on YouTube or Vimeo -- and these values are written into the page's markup
 * and into the data the lightbox script reads, so they are cleaned here once,
 * before either happens.
 *
 * @param array $videos The gallery's videos.
 * @return array The same videos, cleaned.
 */
function vidgalblk_clean_videos( $videos ) {
	if ( ! is_array( $videos ) ) {
		return array();
	}

	foreach ( $videos as $index => $video ) {
		if ( ! is_array( $video ) ) {
			continue;
		}

		foreach ( array( 'video', 'poster' ) as $key ) {
			if ( isset( $video[ $key ] ) && is_string( $video[ $key ] ) ) {
				$video[ $key ] = vidgalblk_clean_link( $video[ $key ] );
			}
		}

		if ( isset( $video['caption'] ) && is_string( $video['caption'] ) ) {
			$video['caption'] = wp_kses( $video['caption'], vidgalblk_caption_tags() );
		}

		$videos[ $index ] = $video;
	}

	return $videos;
}

/**
 * The custom properties that drive the gallery's layout.
 *
 * The grid in `style.scss` reads these, and `Style.js` sets the same ones in
 * the editor. Setting them inline here is what makes the server-rendered
 * gallery come out with the right columns, gaps and item height before any
 * JavaScript has run.
 *
 * @param array $attributes Block attributes.
 * @return string An inline `style` value.
 */
function vidgalblk_layout_vars( $attributes ) {
	$columns = isset( $attributes['columns'] ) ? $attributes['columns'] : array();

	if ( is_numeric( $columns ) ) {
		$columns = array(
			'desktop' => (int) $columns,
			'tablet'  => max( 1, (int) $columns - 1 ),
			'mobile'  => 1,
		);
	}

	$columns = wp_parse_args(
		is_array( $columns ) ? $columns : array(),
		array(
			'desktop' => 3,
			'tablet'  => 2,
			'mobile'  => 1,
		)
	);

	/*
	 * `columnGap`/`rowGap` are the original, single-number attributes --
	 * untouched, so a gallery saved before per-device gaps existed keeps
	 * reading correctly (retyping them would have made WordPress silently
	 * discard any customized value on every subsequent load: see
	 * `feedback_block_json_additive_only`). `columnGapResponsive`/
	 * `rowGapResponsive` are new attributes the Settings panel actually
	 * writes to now. Prefer the new one once it has been customized away
	 * from its own default; otherwise fall back to the old number if that
	 * was customized, so neither an old nor a fresh gallery loses its gap.
	 */
	$vidgalblk_device_gap = function ( $legacy, $responsive ) {
		$responsive = is_array( $responsive ) ? $responsive : array();
		$defaults   = array(
			'desktop' => 10,
			'tablet'  => 10,
			'mobile'  => 10,
		);
		$responsive_customized = (
			(int) ( $responsive['desktop'] ?? 10 ) !== 10
			|| (int) ( $responsive['tablet'] ?? 10 ) !== 10
			|| (int) ( $responsive['mobile'] ?? 10 ) !== 10
		);

		if ( $responsive_customized ) {
			return wp_parse_args( $responsive, $defaults );
		}

		if ( is_numeric( $legacy ) && 10 !== (int) $legacy ) {
			return array(
				'desktop' => (int) $legacy,
				'tablet'  => (int) $legacy,
				'mobile'  => (int) $legacy,
			);
		}

		return wp_parse_args( $responsive, $defaults );
	};

	$column_gap = $vidgalblk_device_gap( $attributes['columnGap'] ?? null, $attributes['columnGapResponsive'] ?? array() );
	$row_gap    = $vidgalblk_device_gap( $attributes['rowGap'] ?? null, $attributes['rowGapResponsive'] ?? array() );

	// Only visible when the video count doesn't divide evenly into the column
	// count -- where the incomplete last row of tiles sits horizontally.
	$row_align_map = array(
		'start'  => 'flex-start',
		'center' => 'center',
		'end'    => 'flex-end',
	);
	$row_align     = $row_align_map[ $attributes['options']['rowAlign'] ?? 'center' ] ?? 'center';

	// Only the ratios the editor offers. Anything else is treated as unset,
	// rather than passed through into a stylesheet.
	$ratio = $attributes['aspectRatio'] ?? '';
	if ( ! in_array( $ratio, array( '16/9', '4/3', '1/1', '9/16' ), true ) ) {
		$ratio = '';
	}

	$item_height = $attributes['itemHeight'] ?? '200px';
	if ( is_numeric( $item_height ) ) {
		$item_height = $item_height . 'px';
	}

	$vars = array(
		'--vgbCols'    => max( 1, (int) $columns['desktop'] ),
		'--vgbColsT'   => max( 1, (int) $columns['tablet'] ),
		'--vgbColsM'   => max( 1, (int) $columns['mobile'] ),
		'--vgbColGap'  => max( 0, (int) $column_gap['desktop'] ) . 'px',
		'--vgbColGapT' => max( 0, (int) $column_gap['tablet'] ) . 'px',
		'--vgbColGapM' => max( 0, (int) $column_gap['mobile'] ) . 'px',
		'--vgbRowGap'  => max( 0, (int) $row_gap['desktop'] ) . 'px',
		'--vgbRowGapT' => max( 0, (int) $row_gap['tablet'] ) . 'px',
		'--vgbRowGapM' => max( 0, (int) $row_gap['mobile'] ) . 'px',
		'--vgbRowAlign' => $row_align,
		/*
		 * A tile is sized by one of these two, never both -- a definite height
		 * wins over aspect-ratio, so the height has to step aside for the ratio
		 * to mean anything.
		 */
		'--vgbItemH'  => $ratio ? 'auto' : $item_height,
		'--vgbRatio'  => $ratio ? $ratio : 'auto',
		'--vgbFit'    => $attributes['options']['objectFit'] ?? 'cover',
	);

	$declarations = array();

	foreach ( $vars as $name => $value ) {
		// The two free-text values are the only ones that are not already
		// integers, and a CSS value has no business containing either of these.
		$value = str_replace( array( ';', '}' ), '', (string) $value );

		$declarations[] = $name . ':' . $value;
	}

	// Trailing semicolon on purpose: `get_block_wrapper_attributes()` merges a
	// caller's `style` with the block supports' own by joining them with a
	// space, so the last declaration has to be closed.
	return implode( ';', $declarations ) . ';';
}

/**
 * A feed video's channel name, for "Show channel name", or '' when it has
 * none (only feed videos carry one; an old cached feed does not, until it
 * refreshes). The same as itemChannel() in utils/channel.js.
 *
 * It is a link-like span rather than a link: it sits inside the tile's own
 * link, and links cannot nest. The block's script opens it in a new tab.
 *
 * @param array $video One entry from the videos attribute.
 * @return string HTML.
 */
function vidgalblk_item_channel( $video ) {
	$channel = is_array( $video ) && isset( $video['channel'] ) ? trim( (string) $video['channel'] ) : '';
	if ( '' === $channel ) {
		return '';
	}

	$url = isset( $video['channelUrl'] ) && preg_match( '#^https://#', (string) $video['channelUrl'] ) ? esc_url( (string) $video['channelUrl'] ) : '';

	return '' !== $url
		? sprintf( '<span class="vgbItemChannel" role="link" tabindex="0" data-href="%1$s">%2$s</span>', $url, esc_html( $channel ) )
		: sprintf( '<span class="vgbItemChannel">%s</span>', esc_html( $channel ) );
}
