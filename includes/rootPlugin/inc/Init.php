<?php
namespace VIDGALBLK;

if ( ! defined( 'ABSPATH' ) ) { exit; }

class Init {
    function __construct() {
        add_action( 'init', [ $this, 'onInit' ] );
        add_filter( 'block_editor_settings_all', [ $this, 'vidgalblk_dynamic_template_lock' ], 10, 2 );
        add_filter( 'block_type_metadata', [ $this, 'vidgalblk_version_block_assets' ] );
    }

    /**
     * Stamps the plugin's own version onto this block's metadata before
     * WordPress registers it, so `style`/`editorStyle` get a version that
     * actually changes on update.
     *
     * Without a `version` in block.json, `register_block_style_handle()` (in
     * wp-includes/blocks.php) only busts a block style's cache via
     * `filemtime()` when `SCRIPT_DEBUG` is on -- which no real site enables.
     * Otherwise it falls back to the static `$wp_version`, so the CSS/JS URL
     * never changes between plugin updates: a browser that already cached
     * `view.css`/`index.css` keeps serving that cached copy forever, and a
     * fix that rebuilt correctly can look like it never shipped.
     */
    function vidgalblk_version_block_assets( $metadata ) {
        if ( isset( $metadata['name'] ) && 0 === strpos( $metadata['name'], 'vgb/' ) ) {
            $metadata['version'] = VIDGALBLK_PLUGIN_VERSION;
        }
        return $metadata;
    }
    function onInit() {
		$this->vidgalblk_register_blocks();
		register_post_type('video-gallery-block', [
			'label' => __('Video Gallery', 'video-gallery-block'),
			'labels' => [
				'name'                  => __('Video Gallery', 'video-gallery-block'),
				'singular_name'         => __('Video Gallery', 'video-gallery-block'),
				'add_new'               => __('Add New', 'video-gallery-block'),
				'add_new_item'          => __('Add New Video Gallery', 'video-gallery-block'),
				'edit_item'             => __('Edit Video Gallery', 'video-gallery-block'),
				'new_item'              => __('New Video Gallery', 'video-gallery-block'),
				'view_item'             => __('View Video Gallery', 'video-gallery-block'),
				'view_items'            => __('View Video Gallery', 'video-gallery-block'),
				'search_items'          => __('Search Video Gallery', 'video-gallery-block'),
				'not_found'             => __('No Video Gallery found.', 'video-gallery-block'),
				'not_found_in_trash'    => __('No Video Gallery found in Trash.', 'video-gallery-block'),
				'all_items'             => __('All Video Gallery', 'video-gallery-block'),
				'archives'              => __('Video Gallery Archives', 'video-gallery-block'),
				'item_published'        => __('Video Gallery Published', 'video-gallery-block'),
				'item_updated'          => __('Video Gallery Updated', 'video-gallery-block'),
			],
            'show_in_rest' => true,
			/*
			 * Admin-only on purpose.
			 *
			 * A Video Gallery is a piece of configuration that gets placed with
			 * a block or a shortcode, not a page of its own. Registered as
			 * `public` it behaved like one: galleries turned up in the site's
			 * own search results, and following the result landed the visitor
			 * on the front page with a 200 -- a soft 404, which is worse for
			 * search engines than a real one. `show_ui` keeps the whole editing
			 * experience exactly as it was.
			 */
			'public' => false,
			'show_ui' => true,
			'show_in_menu' => true,
			'publicly_queryable' => false,
			'exclude_from_search' => true,
			'show_in_nav_menus' => false,
			'has_archive' => false,
			'rewrite' => false,
			'query_var' => false,
			'menu_icon' => 'data:image/svg+xml;base64,' . base64_encode('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="#f0f6fc99" fill-rule="evenodd" d="M2.7 3h5.1a1.2 1.2 0 0 1 1.2 1.2v3.6a1.2 1.2 0 0 1-1.2 1.2H2.7a1.2 1.2 0 0 1-1.2-1.2V4.2a1.2 1.2 0 0 1 1.2-1.2zM4.5 4.5v3l2.4-1.5zM12.2 3h5.1a1.2 1.2 0 0 1 1.2 1.2v3.6a1.2 1.2 0 0 1-1.2 1.2H12.2a1.2 1.2 0 0 1-1.2-1.2V4.2a1.2 1.2 0 0 1 1.2-1.2zM14 4.5v3l2.4-1.5zM2.7 11h5.1a1.2 1.2 0 0 1 1.2 1.2v3.6a1.2 1.2 0 0 1-1.2 1.2H2.7a1.2 1.2 0 0 1-1.2-1.2V12.2a1.2 1.2 0 0 1 1.2-1.2zM4.5 12.5v3l2.4-1.5zM12.2 11h5.1a1.2 1.2 0 0 1 1.2 1.2v3.6a1.2 1.2 0 0 1-1.2 1.2H12.2a1.2 1.2 0 0 1-1.2-1.2V12.2a1.2 1.2 0 0 1 1.2-1.2zM14 12.5v3l2.4-1.5z"/></svg>'),
            'template' => [['vgb/video-gallery']],
            'template_lock' => 'all',
        ]);

	}

	function vidgalblk_register_blocks() {
        // VIDGALBLK_DIR_PATH already ends in a separator; the extra one only
        // ever showed up as a doubled slash in error messages.
        $blocks_path = VIDGALBLK_DIR_PATH . 'build/blocks/';
        $all_blocks  = glob( $blocks_path . '*', GLOB_ONLYDIR );

        if ( empty( $all_blocks ) ) {
            return;
        }

        foreach ( $all_blocks as $block_path ) {
            /*
             * register_block_type() only treats its argument as a PATH while
             * that path exists; the moment it does not, the same string is
             * taken as a block NAME, and a Windows path fails the lowercase
             * rule with a _doing_it_wrong notice printed before the headers --
             * which then breaks every admin redirect on the page.
             *
             * `npm run build` empties build/ before it rewrites it, so a
             * request landing mid-build globs a directory that is gone a moment
             * later. Confirming the metadata is really there closes that
             * window, and skips any stray folder under build/blocks that was
             * never a block to begin with.
             */
            if ( ! file_exists( $block_path . '/block.json' ) ) {
                continue;
            }

			register_block_type( $block_path );
        }
    }

    /**
     * Dynamically lock the block editor once a video gallery layout has been selected.
     */
    function vidgalblk_dynamic_template_lock( $settings, $context ) {
        if ( ! empty( $context->post ) && $context->post->post_type === 'video-gallery-block' ) {
            $settings['templateLock'] = 'all'; 
        }
        return $settings;
    }
}
