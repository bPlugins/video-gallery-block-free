<?php
/**
 * Plugin Name: Video Gallery Block
 * Description: Display your videos as gallery in a professional way.
 * Version: 1.1.2
 * Author: bPlugins
 * Author URI: https://bplugins.com
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain: video-gallery-block
 * @fs_premium_only vendor/freemius, /includes/fs.php, /build/blocks/index.js, /build/blocks/index.css, /build/blocks/index.asset.php, /build/blocks/index.js.LICENSE.txt, /build/blocks/lightbox-video-gallery, /build/blocks/masonry-video-grid, /build/blocks/parallax-row-video-gallery, /build/blocks/slider-autoplay-video, /build/blocks/video-carousel-gallery, /build/blocks/video-playlist-gallery, /build/blocks/video-slider, /build/blocks/video-testimonial-section, /includes/video-stats-api.php, /includes/woocommerce-integration.php, /public/images/video-gallery-block-banner.gif, /includes/LicenseActivation.php
 * @fs_free_only /vendor/freemius-lite, /includes/fs-lite.php, /public/images/blocks.png
 */

if (!defined('ABSPATH')) {
    exit;
}

if (function_exists('vgb_fs')) {
    vgb_fs()->set_basename(true, __FILE__);
} else {
    // Constants
    define('VGB_PLUGIN_VERSION', (isset($_SERVER['HTTP_HOST']) && $_SERVER['HTTP_HOST'] === 'localhost') ? time() : '1.1.2');
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
                    return wp_unslash( $_GET['content'] );
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
            }

            public function wpEnqueueScripts() {
                wp_register_script('plyr', VGB_PUBLIC_DIR . 'js/plyr.js', [], '3.8.4', true);
                wp_register_style('plyr', VGB_PUBLIC_DIR . 'css/plyr.css', [], '3.8.4');
            }

            public function vgbEnqueueBlockEditorAssets() {
                $disabledBlocks = get_option( 'vgbDisabledBlocks', [] );
                $disabledBlocks = is_array( $disabledBlocks ) ? $disabledBlocks : [];
                $editor_scripts = [
                    'vgb-video-gallery-editor-script',
                ];
                // Localize + Inline for each script
                foreach ( $editor_scripts as $handle ) {
                    if ( wp_script_is( $handle, 'registered' ) ) {
                        wp_localize_script(
                            $handle,
                            'vgbDisabledBlocks',
                            $disabledBlocks
                        );
                        wp_add_inline_script(
                            $handle,
                            'var vgbpipecheck = ' . wp_json_encode( vgb_IsPremium() ) . ';',
                            'before'
                        );
                        wp_set_script_translations( $handle, 'video-gallery-block', VGB_DIR_PATH . 'languages' );
                    }
                }
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
