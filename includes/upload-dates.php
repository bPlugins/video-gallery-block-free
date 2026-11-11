<?php
/**
 * "Show upload time": when each video was uploaded, looked up once in the
 * editor and kept on the video (`uploadDate`), so the page never asks again.
 *
 *  - YouTube: the Data API, with the site's YouTube key (the channel feed's).
 *  - Vimeo:   its public oEmbed answer, no key needed.
 *  - A video from the Media Library: the day it was uploaded there.
 *
 * Editors only. Only ids are sent on (never a link someone typed), and
 * answers are cached for a week.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! function_exists( 'vidgalblk_upload_dates_routes' ) ) {
	function vidgalblk_upload_dates_routes() {
		register_rest_route(
			'vgb/v1',
			'/upload-dates',
			array(
				'methods'             => 'POST',
				'callback'            => 'vidgalblk_upload_dates_rest',
				'permission_callback' => static function () {
					return current_user_can( 'edit_posts' );
				},
				'args'                => array(
					'urls' => array(
						'required' => true,
						'type'     => 'array',
						'items'    => array( 'type' => 'string' ),
						'maxItems' => 50,
					),
				),
			)
		);
	}
	add_action( 'rest_api_init', 'vidgalblk_upload_dates_routes' );
}

if ( ! function_exists( 'vidgalblk_upload_dates_source' ) ) {
	/**
	 * Which video a link is: array( 'youtube'|'vimeo', id ), array( 'file', attachment id ), or null.
	 */
	function vidgalblk_upload_dates_source( $url ) {
		if ( ! is_string( $url ) || '' === $url || strlen( $url ) > 500 ) {
			return null;
		}
		$host = strtolower( (string) wp_parse_url( $url, PHP_URL_HOST ) );
		$path = (string) wp_parse_url( $url, PHP_URL_PATH );
		parse_str( (string) wp_parse_url( $url, PHP_URL_QUERY ), $query );

		if ( preg_match( '#(^|\.)(youtube\.com|youtube-nocookie\.com)$#', $host ) ) {
			if ( ! empty( $query['v'] ) && is_string( $query['v'] ) && preg_match( '/^[A-Za-z0-9_-]{11}$/', $query['v'] ) ) {
				return array( 'youtube', $query['v'] );
			}
			if ( preg_match( '#^/(embed|shorts|live|v)/([A-Za-z0-9_-]{11})(/|$)#', $path, $m ) ) {
				return array( 'youtube', $m[2] );
			}
			return null;
		}
		if ( 'youtu.be' === $host ) {
			return preg_match( '#^/([A-Za-z0-9_-]{11})(/|$)#', $path, $m ) ? array( 'youtube', $m[1] ) : null;
		}
		if ( preg_match( '#(^|\.)vimeo\.com$#', $host ) ) {
			return preg_match( '#/(\d{5,})(/|$)#', $path, $m ) ? array( 'vimeo', $m[1] ) : null;
		}
		// A file on this site: the Media Library knows when it was uploaded.
		$id = attachment_url_to_postid( $url );
		return $id ? array( 'file', (int) $id ) : null;
	}
}

if ( ! function_exists( 'vidgalblk_upload_dates_rest' ) ) {
	function vidgalblk_upload_dates_rest( WP_REST_Request $request ) {
		$urls  = array_slice( array_values( (array) $request->get_param( 'urls' ) ), 0, 50 );
		$out   = array();
		$fresh = array(); // index => source still to look up.

		foreach ( $urls as $i => $url ) {
			$out[ $i ] = '';
			$source    = vidgalblk_upload_dates_source( $url );
			if ( ! $source ) {
				continue;
			}
			if ( 'file' === $source[0] ) {
				$time      = get_post_time( 'U', true, $source[1] );
				$out[ $i ] = $time ? gmdate( 'c', (int) $time ) : '';
				continue;
			}
			$cached = get_transient( 'vidgalblk_up_' . $source[0] . '_' . $source[1] );
			if ( false !== $cached ) {
				$out[ $i ] = (string) $cached;
			} else {
				$fresh[ $i ] = $source;
			}
		}

		if ( $fresh ) {
			$found = array(); // "provider:id" => ISO date.

			// YouTube: up to 50 videos in one Data API call, only with the site's key.
			$ids = array();
			foreach ( $fresh as $source ) {
				if ( 'youtube' === $source[0] ) {
					$ids[ $source[1] ] = true;
				}
			}
			if ( $ids && function_exists( 'vidgalblk_feed_api' ) && function_exists( 'vidgalblk_feed_api_key' ) && '' !== vidgalblk_feed_api_key() ) {
				$data = vidgalblk_feed_api( 'videos', array( 'part' => 'snippet', 'id' => implode( ',', array_keys( $ids ) ), 'maxResults' => 50 ) );
				foreach ( is_array( $data ) ? ( $data['items'] ?? array() ) : array() as $item ) {
					$date = isset( $item['snippet']['publishedAt'] ) ? strtotime( (string) $item['snippet']['publishedAt'] ) : false;
					if ( ! empty( $item['id'] ) && $date ) {
						$found[ 'youtube:' . $item['id'] ] = gmdate( 'c', $date );
					}
				}
			}

			// Vimeo: its public oEmbed answer has the upload date. Built from the id alone.
			$asked = 0;
			foreach ( $fresh as $source ) {
				if ( 'vimeo' !== $source[0] || isset( $found[ 'vimeo:' . $source[1] ] ) || $asked >= 20 ) {
					continue;
				}
				++$asked;
				$response = wp_safe_remote_get(
					add_query_arg( 'url', rawurlencode( 'https://vimeo.com/' . $source[1] ), 'https://vimeo.com/api/oembed.json' ),
					array( 'timeout' => 6 )
				);
				if ( ! is_wp_error( $response ) && 200 === (int) wp_remote_retrieve_response_code( $response ) ) {
					$body = json_decode( wp_remote_retrieve_body( $response ), true );
					$date = is_array( $body ) && ! empty( $body['upload_date'] ) ? strtotime( (string) $body['upload_date'] . ' UTC' ) : false;
					if ( $date ) {
						$found[ 'vimeo:' . $source[1] ] = gmdate( 'c', $date );
					}
				}
			}

			foreach ( $fresh as $i => $source ) {
				$date      = $found[ $source[0] . ':' . $source[1] ] ?? '';
				$out[ $i ] = $date;
				// A date never changes: kept a week. A miss only briefly, so a key added later is noticed.
				set_transient( 'vidgalblk_up_' . $source[0] . '_' . $source[1], $date, '' !== $date ? WEEK_IN_SECONDS : 15 * MINUTE_IN_SECONDS );
			}
		}

		return rest_ensure_response(
			array(
				'dates'   => array_values( $out ),
				// So the editor can say why YouTube videos have no time.
				'youtube' => function_exists( 'vidgalblk_feed_api_key' ) && '' !== vidgalblk_feed_api_key(),
			)
		);
	}
}
