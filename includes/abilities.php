<?php
/**
 * Read-only "abilities" for AI agents (WordPress 6.9+ Abilities API).
 *
 * Lets an AI app such as Claude or ChatGPT, connected to the site through the
 * MCP Adapter, look at the site's video galleries: which pages have one, what
 * is in it, and whether its YouTube / Vimeo feed is healthy. Nothing here
 * changes anything, and nothing here ever returns the YouTube API key.
 *
 * Each ability checks the capability of the user the agent acts as.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class VidGalBlk_Abilities {

	const CATEGORY = 'video-gallery';
	const MAX_LIST = 50;
	const MAX_VIDEOS = 200;

	public static function init() {
		if ( ! function_exists( 'wp_register_ability' ) ) {
			return; // WordPress older than 6.9: nothing to do.
		}
		add_action( 'wp_abilities_api_categories_init', array( __CLASS__, 'register_category' ) );
		add_action( 'wp_abilities_api_init', array( __CLASS__, 'register_abilities' ) );
	}

	public static function register_category() {
		wp_register_ability_category(
			self::CATEGORY,
			array(
				'label'       => __( 'Video Gallery', 'video-gallery-block' ),
				'description' => __( 'Abilities that read the site\'s video galleries.', 'video-gallery-block' ),
			)
		);
	}

	/** The block names a gallery can have in a post. */
	private static function block_prefixes() {
		$prefixes = array( 'vgb/video-gallery' );
		return $prefixes;
	}

	private static function is_gallery_block( $name ) {
		foreach ( self::block_prefixes() as $prefix ) {
			if ( 0 === strpos( (string) $name, $prefix ) ) {
				return true;
			}
		}
		return false;
	}

	private static function readonly_meta() {
		return array(
			'show_in_rest' => true,
			'annotations'  => array(
				'readonly'    => true,
				'destructive' => false,
				'idempotent'  => true,
			),
			'public'       => true,
		);
	}

	public static function register_abilities() {
		wp_register_ability(
			'video-gallery-block/list-galleries',
			array(
				'label'               => __( 'List video galleries', 'video-gallery-block' ),
				'description'         => __( 'Lists the pages and posts that contain a video gallery, newest first, with each gallery\'s layout, number of videos and whether it uses a YouTube or Vimeo feed.', 'video-gallery-block' ),
				'category'            => self::CATEGORY,
				'input_schema'        => array(
					'type'                 => 'object',
					'properties'           => array(
						'limit' => array(
							'type'        => 'integer',
							'minimum'     => 1,
							'maximum'     => self::MAX_LIST,
							'default'     => 20,
							'description' => __( 'How many pages to return.', 'video-gallery-block' ),
						),
					),
					'additionalProperties' => false,
					'default'              => array(),
				),
				'output_schema'       => array(
					'type'  => 'array',
					'items' => array(
						'type'       => 'object',
						'properties' => array(
							'post_id'   => array( 'type' => 'integer' ),
							'title'     => array( 'type' => 'string' ),
							'status'    => array( 'type' => 'string' ),
							'edit_url'  => array( 'type' => 'string' ),
							'galleries' => array( 'type' => 'array' ),
						),
					),
				),
				'execute_callback'    => array( __CLASS__, 'list_galleries' ),
				'permission_callback' => static function (): bool {
					return current_user_can( 'edit_posts' );
				},
				'meta'                => self::readonly_meta(),
			)
		);

		wp_register_ability(
			'video-gallery-block/get-gallery',
			array(
				'label'               => __( 'Get a video gallery', 'video-gallery-block' ),
				'description'         => __( 'Returns the video galleries on one page or post: their layout, settings that matter, feed link and the list of videos (title and link).', 'video-gallery-block' ),
				'category'            => self::CATEGORY,
				'input_schema'        => array(
					'type'                 => 'object',
					'properties'           => array(
						'post_id' => array(
							'type'        => 'integer',
							'minimum'     => 1,
							'description' => __( 'The ID of the page or post.', 'video-gallery-block' ),
						),
					),
					'required'             => array( 'post_id' ),
					'additionalProperties' => false,
				),
				'output_schema'       => array(
					'type'       => 'object',
					'properties' => array(
						'post_id'   => array( 'type' => 'integer' ),
						'title'     => array( 'type' => 'string' ),
						'galleries' => array( 'type' => 'array' ),
					),
				),
				'execute_callback'    => array( __CLASS__, 'get_gallery' ),
				'permission_callback' => static function ( $input = array() ): bool {
					$post_id = is_array( $input ) && isset( $input['post_id'] ) ? absint( $input['post_id'] ) : 0;
					return $post_id > 0 && current_user_can( 'edit_post', $post_id );
				},
				'meta'                => self::readonly_meta(),
			)
		);

		wp_register_ability(
			'video-gallery-block/get-feed-status',
			array(
				'label'               => __( 'Get video feed status', 'video-gallery-block' ),
				'description'         => __( 'Says whether a YouTube API key is saved (never the key itself) and lists any problems the YouTube or Vimeo feeds hit recently.', 'video-gallery-block' ),
				'category'            => self::CATEGORY,
				'input_schema'        => array(
					'type'                 => 'object',
					'properties'           => new stdClass(),
					'additionalProperties' => false,
					'default'              => array(),
				),
				'output_schema'       => array(
					'type'       => 'object',
					'properties' => array(
						'youtube_key_saved' => array( 'type' => 'boolean' ),
						'open_issues'       => array( 'type' => 'array' ),
					),
				),
				'execute_callback'    => array( __CLASS__, 'get_feed_status' ),
				'permission_callback' => static function (): bool {
					return current_user_can( 'manage_options' );
				},
				'meta'                => self::readonly_meta(),
			)
		);
	}

	/* ------------------------------------------------------------------ */

	/** Every gallery block in a post, nested blocks included. */
	private static function find_galleries( $blocks, $with_videos ) {
		$found = array();
		foreach ( $blocks as $block ) {
			if ( ! empty( $block['blockName'] ) && self::is_gallery_block( $block['blockName'] ) ) {
				$found[] = self::summarize( $block, $with_videos );
			}
			if ( ! empty( $block['innerBlocks'] ) ) {
				$found = array_merge( $found, self::find_galleries( $block['innerBlocks'], $with_videos ) );
			}
		}
		return $found;
	}

	private static function summarize( $block, $with_videos ) {
		$a      = is_array( $block['attrs'] ) ? $block['attrs'] : array();
		$videos = isset( $a['videos'] ) && is_array( $a['videos'] ) ? $a['videos'] : array();
		$feed   = isset( $a['feed'] ) && is_array( $a['feed'] ) ? $a['feed'] : array();

		$out = array(
			'block'        => (string) $block['blockName'],
			'layout'       => isset( $a['layout'] ) && is_string( $a['layout'] ) ? $a['layout'] : 'grid',
			'columns'      => isset( $a['columns'] ) && is_array( $a['columns'] ) ? array_map( 'intval', $a['columns'] ) : array( 'desktop' => 3, 'tablet' => 2, 'mobile' => 1 ),
			'video_count'  => count( $videos ),
			'album_count'  => isset( $a['albums'] ) && is_array( $a['albums'] ) ? count( $a['albums'] ) : 0,
			'feed_enabled' => ! empty( $feed['enabled'] ),
			'feed_url'     => ! empty( $feed['enabled'] ) && ! empty( $feed['url'] ) ? esc_url_raw( (string) $feed['url'] ) : '',
		);

		if ( $with_videos ) {
			$list = array();
			foreach ( array_slice( $videos, 0, self::MAX_VIDEOS ) as $item ) {
				if ( ! is_array( $item ) ) {
					continue;
				}
				$list[] = array(
					'title' => isset( $item['caption'] ) ? wp_strip_all_tags( (string) $item['caption'] ) : '',
					'url'   => isset( $item['video'] ) ? esc_url_raw( (string) $item['video'] ) : '',
				);
			}
			$out['videos'] = $list;
		}
		return $out;
	}

	public static function list_galleries( $input = array() ) {
		global $wpdb;

		$limit = is_array( $input ) && isset( $input['limit'] ) ? max( 1, min( self::MAX_LIST, (int) $input['limit'] ) ) : 20;

		$likes = array();
		$args  = array();
		foreach ( self::block_prefixes() as $prefix ) {
			$likes[] = 'post_content LIKE %s';
			$args[]  = '%' . $wpdb->esc_like( '<!-- wp:' . $prefix ) . '%';
		}
		$args[] = $limit * 3; // Read a few extra: some pages may not be editable by this user.

		// phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared, WordPress.DB.DirectDatabaseQuery
		$ids = $wpdb->get_col(
			$wpdb->prepare(
				"SELECT ID FROM {$wpdb->posts} WHERE post_status NOT IN ('trash','auto-draft','inherit') AND post_type NOT IN ('revision','nav_menu_item') AND (" . implode( ' OR ', $likes ) . ') ORDER BY post_modified DESC LIMIT %d', // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared
				$args
			)
		);

		$out = array();
		foreach ( (array) $ids as $id ) {
			$id = (int) $id;
			if ( ! current_user_can( 'edit_post', $id ) ) {
				continue;
			}
			$post = get_post( $id );
			if ( ! $post ) {
				continue;
			}
			$out[] = array(
				'post_id'   => $id,
				'title'     => wp_strip_all_tags( get_the_title( $post ) ),
				'status'    => (string) $post->post_status,
				'edit_url'  => (string) get_edit_post_link( $id, 'raw' ),
				'galleries' => self::find_galleries( parse_blocks( $post->post_content ), false ),
			);
			if ( count( $out ) >= $limit ) {
				break;
			}
		}
		return $out;
	}

	public static function get_gallery( $input = array() ) {
		$post_id = is_array( $input ) && isset( $input['post_id'] ) ? absint( $input['post_id'] ) : 0;
		$post    = $post_id ? get_post( $post_id ) : null;
		if ( ! $post || ! current_user_can( 'edit_post', $post_id ) ) {
			return new WP_Error( 'video_gallery_not_found', __( 'That page was not found.', 'video-gallery-block' ) );
		}
		return array(
			'post_id'   => $post_id,
			'title'     => wp_strip_all_tags( get_the_title( $post ) ),
			'galleries' => self::find_galleries( parse_blocks( $post->post_content ), true ),
		);
	}

	public static function get_feed_status( $input = array() ) {
		$key_saved = function_exists( 'vidgalblk_feed_api_key' ) && '' !== (string) vidgalblk_feed_api_key();

		$issues = array();
		if ( function_exists( 'vidgalblk_feed_alerts_open' ) ) {
			foreach ( vidgalblk_feed_alerts_open() as $issue ) {
				$issues[] = array(
					'problem'   => isset( $issue['message'] ) ? wp_strip_all_tags( (string) $issue['message'] ) : '',
					'code'      => isset( $issue['code'] ) ? (string) $issue['code'] : '',
					'last_seen' => isset( $issue['last'] ) ? gmdate( 'c', (int) $issue['last'] ) : '',
					'links'     => isset( $issue['links'] ) && is_array( $issue['links'] ) ? array_map( 'esc_url_raw', array_slice( array_keys( $issue['links'] ), 0, 5 ) ) : array(),
				);
			}
		}

		return array(
			'youtube_key_saved' => $key_saved,
			'open_issues'       => $issues,
		);
	}
}

VidGalBlk_Abilities::init();
