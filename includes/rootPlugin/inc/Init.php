<?php
namespace VGB;

if ( ! defined( 'ABSPATH' ) ) { exit; }

class Init {
    function __construct() {
        add_action( 'init', [ $this, 'onInit' ] );
        add_filter( 'block_editor_settings_all', [ $this, 'vgb_dynamic_template_lock' ], 10, 2 );
    }
    function onInit() {
		register_setting(
			'vgbPluginSettings',
			'vgbAPIKey',
			[
				'default'		    => '',
				'show_in_rest'	    => true,
				'type'			    => 'string',
				'sanitize_callback' => 'sanitize_text_field',
			]
		);
		$this->vgb_register_blocks();
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
			],
            'show_in_rest' => true,
            'public' => true,
			'menu_icon' => 'data:image/svg+xml;base64,' . base64_encode('
				<svg fill="#f0f6fc99" height="200px" width="200px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 490.718 490.718" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M245.359,0.359C109.852,0.359,0,110.049,0,245.358s109.852,245,245.359,245s245.359-109.691,245.359-245 S380.866,0.359,245.359,0.359z M176.828,341.011V140.824l187.489,100.098L176.828,341.011z"></path> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </g> </g></svg>
			'),
            'publicly_queryable' => false,
            'item_published' => 'Video Gallery Published',
            'item_updated' => 'Video Gallery Updated',
            'template' => [['vgb/video-gallery-block']],
            'template_lock' => 'all',
        ]);

		wp_set_script_translations( 'vgb-video-gallery-editor-script', 'video-gallery-block', VGB_DIR_PATH . 'languages' );
	}

	function vgb_register_blocks() {
        $blocks_path = VGB_DIR_PATH . '/build/blocks/';
        $all_blocks  = glob( $blocks_path . '*', GLOB_ONLYDIR );

        if ( empty( $all_blocks ) ) {
            return;
        }

        $disabled_blocks = get_option( 'vgbDisabledBlocks', [] );
        if ( ! is_array( $disabled_blocks ) ) {
            $disabled_blocks = [];
        }

        foreach ( $all_blocks as $block_path ) {
            $block_name = basename( $block_path );

            if ( $block_name === 'video-gallery-block' ) {
                register_block_type( $block_path );
                continue;
            }
            
            if ( in_array( $block_name, $disabled_blocks, true ) ) {
                continue;
            }
			register_block_type( $block_path );			
        }
    }

    /**
     * Dynamically lock the block editor once a video gallery layout has been selected.
     */
    function vgb_dynamic_template_lock( $settings, $context ) {
        if ( ! empty( $context->post ) && $context->post->post_type === 'video-gallery-block' ) {
            $settings['templateLock'] = 'all'; 
        }
        return $settings;
    }
}
