<?php
/**
 * Plugin Name: Video Gallery Block
 * Description: Display your videos as gallery in a professional way.
 * Version: 1.1.3
 * Author: bPlugins
 * Author URI: https://bplugins.com
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain: video-gallery-block
 */

if (!defined('ABSPATH')) {
    exit;
}

if (function_exists('vgb_fs')) {
    vgb_fs()->set_basename(true, __FILE__);
} else {
    // Constants
    define('VGB_PLUGIN_VERSION', (isset($_SERVER['HTTP_HOST']) && $_SERVER['HTTP_HOST'] === 'localhost') ? time() : '1.1.3');
    define('VGB_DIR_URL', plugin_dir_url(__FILE__));
    define('VGB_PUBLIC_DIR', VGB_DIR_URL . 'public/');
    define('VGB_DIR_PATH', plugin_dir_path(__FILE__));
   
	require_once VGB_DIR_PATH . '/includes/fs-lite.php';
    require_once VGB_DIR_PATH . '/includes/rootPlugin/plugin.php';

    // Main plugin class
    if (!class_exists('VGBPlugin')) {
        class VGBPlugin {
            public function __construct() {
                add_action('enqueue_block_assets', [$this, 'enqueueBlockAssets']);
                add_action('wp_enqueue_scripts', [$this, 'wpEnqueueScripts']);
                add_action('enqueue_block_editor_assets', [$this, 'vgbEnqueueBlockEditorAssets']);
                add_filter( 'default_title', [$this, 'defaultTitle'], 10, 2 );
			    add_filter( 'default_content', [$this, 'defaultContent'], 10, 2 );
            }

            function defaultTitle( $title, $post ) {
                if ( 'page' === $post->post_type && isset( $_GET['title'] ) ) {
                    return sanitize_text_field( wp_unslash( $_GET['title'] ) );
                }
                return $title;
	        }

            function defaultContent( $content, $post ) {
                if ( 'page' === $post->post_type && isset( $_GET['content'] ) ) {
                    return wp_kses_post( wp_unslash( $_GET['content'] ) );
                }
                return $content;
            }

            public function enqueueBlockAssets() {
                wp_register_script(
                    'isotope',
                    VGB_PUBLIC_DIR . 'js/isotope.pkgd.min.js',
                    ['jquery'],
                    '3.0.6',
                    true
                );
                wp_enqueue_script('isotope');

                wp_register_script('plyr', VGB_PUBLIC_DIR . 'js/plyr.js', [], '3.8.4', true);
                wp_register_style('plyr', VGB_PUBLIC_DIR . 'css/plyr.css', [], '3.8.4');
            }

            public function wpEnqueueScripts() {
                wp_enqueue_script('plyr');
                wp_enqueue_style('plyr');
            }

            public function vgbEnqueueBlockEditorAssets() {
                wp_enqueue_script('plyr');
                wp_enqueue_style('plyr');

                $disabledBlocks = get_option( 'vgbDisabledBlocks', [] );
                $disabledBlocks = is_array( $disabledBlocks ) ? $disabledBlocks : [];
				wp_localize_script(
					'vgb-video-gallery-block-editor-script',
					'vgbDisabledBlocks',
					$disabledBlocks
				);
				wp_set_script_translations( 'vgb-video-gallery-block-editor-script', 'video-gallery-block', VGB_DIR_PATH . 'languages' );
            }
        }
        new VGBPlugin();
    }
}

// Add custom block category
add_filter('block_categories_all', function ($categories, $post) {
    array_unshift($categories, [
        'slug'  => 'videoblocks',
        'title' => __('Video Gallery', 'video-gallery-block'),
        'icon'  => 'video-alt',
    ]);
    return $categories;
}, 10, 2);
