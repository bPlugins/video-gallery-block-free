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
 * The image to show for one video.
 *
 * A poster the user set always wins. Otherwise: YouTube's `hqdefault.jpg`,
 * which is the largest size that exists for every video -- `maxresdefault.jpg`
 * does not, and asking for it here would put a 404 in the markup for anyone
 * without JavaScript. The browser upgrades to the larger sizes once the block's
 * script takes over.
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
		return 'https://img.youtube.com/vi/' . $youtube_id . '/hqdefault.jpg';
	}

	$vimeo_id = vidgalblk_vimeo_id( $url );
	if ( $vimeo_id ) {
		return vidgalblk_vimeo_thumbnail( $vimeo_id );
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

	// Only the ratios the editor offers. Anything else is treated as unset,
	// rather than passed through into a stylesheet.
	$ratio = $attributes['aspectRatio'] ?? '';
	if ( ! in_array( $ratio, array( '16/9', '4/3', '1/1', '9/16' ), true ) ) {
		$ratio = '';
	}

	$vars = array(
		'--vgbCols'   => max( 1, (int) $columns['desktop'] ),
		'--vgbColsT'  => max( 1, (int) $columns['tablet'] ),
		'--vgbColsM'  => max( 1, (int) $columns['mobile'] ),
		'--vgbColGap' => (int) ( $attributes['columnGap'] ?? 10 ) . 'px',
		'--vgbRowGap' => (int) ( $attributes['rowGap'] ?? 10 ) . 'px',
		/*
		 * A tile is sized by one of these two, never both -- a definite height
		 * wins over aspect-ratio, so the height has to step aside for the ratio
		 * to mean anything.
		 */
		'--vgbItemH'  => $ratio ? 'auto' : ( $attributes['itemHeight'] ?? '200px' ),
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
