<?php
/**
 * Plugin Name: Video Gallery Block
 * Description: Display your videos as gallery in a professional way.
 * Version: 1.1.3
 * Requires at least: 6.5
 * Tested up to: 7.0
 * Requires PHP: 7.4
 * Author: bPlugins
 * Author URI: https://bplugins.com
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain: video-gallery-block
 */

if (!defined('ABSPATH')) {
    exit;
}

if (function_exists('vidgalblk_fs')) {
    vidgalblk_fs()->set_basename(true, __FILE__);
} else {
    // Constants
    define('VIDGALBLK_PLUGIN_VERSION', (isset($_SERVER['HTTP_HOST']) && 'localhost' === sanitize_text_field(wp_unslash($_SERVER['HTTP_HOST']))) ? time() : '1.1.3');
    define('VIDGALBLK_DIR_URL', plugin_dir_url(__FILE__));
    define('VIDGALBLK_PUBLIC_DIR', VIDGALBLK_DIR_URL . 'public/');
    define('VIDGALBLK_DIR_PATH', plugin_dir_path(__FILE__));
   
	require_once VIDGALBLK_DIR_PATH . '/includes/fs-lite.php';
    require_once VIDGALBLK_DIR_PATH . '/includes/rootPlugin/plugin.php';

    // Main plugin class
    if (!class_exists('VidGalBlkPlugin')) {
        class VidGalBlkPlugin {
            public function __construct() {
                add_action('enqueue_block_assets', [$this, 'enqueueBlockAssets']);
                add_action('enqueue_block_editor_assets', [$this, 'vidgalblkEnqueueBlockEditorAssets']);
            }

            public function enqueueBlockAssets() {
                wp_register_script(
                    'isotope',
                    VIDGALBLK_PUBLIC_DIR . 'js/isotope.pkgd.min.js',
                    ['jquery'],
                    '3.0.6',
                    true
                );

                wp_register_script('plyr', VIDGALBLK_PUBLIC_DIR . 'js/plyr.js', [], '3.8.4', true);
                wp_register_style('plyr', VIDGALBLK_PUBLIC_DIR . 'css/plyr.css', [], '3.8.4');
            }

            public function vidgalblkEnqueueBlockEditorAssets() {
                wp_enqueue_script('plyr');
                wp_enqueue_style('plyr');

				wp_set_script_translations( 'vgb-video-gallery-block-editor-script', 'video-gallery-block', VIDGALBLK_DIR_PATH . 'languages' );
            }
        }
        new VidGalBlkPlugin();
    }

    // Add custom block category.
    function vidgalblk_register_block_category( $categories ) {
        array_unshift($categories, [
            'slug'  => 'videoblocks',
            'title' => __('Video Gallery', 'video-gallery-block'),
            'icon'  => 'video-alt',
        ]);
        return $categories;
    }
    add_filter( 'block_categories_all', 'vidgalblk_register_block_category' );
}
