<?php
namespace VGB;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
class Enqueue {
    function __construct() {
        add_action( 'admin_enqueue_scripts', [$this, 'adminEnqueueScripts']);
    }
    function adminEnqueueScripts($screen) {
        global $typenow;
        // For post type screens
        if ('video-gallery-block' === $typenow) {
            wp_enqueue_script('admin-post-js', VGB_DIR_URL . 'build/admin/post.js', [], VGB_PLUGIN_VERSION, true);
            wp_enqueue_style('admin-post-css', VGB_DIR_URL . 'build/admin/post.css', [], VGB_PLUGIN_VERSION);
        }
        // For dashboard/menu page screen
        if ($screen === "video-gallery-block_page_vgb-help-demo") {
            wp_enqueue_script('vgb-admin-dashboard-js', VGB_DIR_URL . 'build/admin/dashboard.js', ['react', 'react-dom', 'wp-util'], VGB_PLUGIN_VERSION, true);
            wp_enqueue_style('vgb-admin-dashboard-css', VGB_DIR_URL . 'build/admin/dashboard.css', [], VGB_PLUGIN_VERSION);
            wp_set_script_translations( 'vgb-admin-dashboard', 'video-gallery-block', VGB_DIR_PATH . 'languages' );
            wp_localize_script('vgb-admin-dashboard-js', 'vgbAdmin', [
                'ajaxUrl' => admin_url('admin-ajax.php'),
            ]);
        }
    }
}
