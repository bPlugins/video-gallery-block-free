<?php
namespace VIDGALBLK;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class AdminMenu  {
    function __construct() {
        add_action('admin_menu', [$this, 'adminMenu']);
        add_action('admin_head', [$this, 'highlightHelpDemoMenu']);
    }
    /**
     * Color the "Help & Demos" submenu link so it stands out in the sidebar, the same
     * treatment Image Gallery and Testimonials Block give theirs. One inline <style>
     * since the sidebar persists across every admin screen.
     */
    function highlightHelpDemoMenu() { ?>
        <style>
            #adminmenu a[href*="page=vgb-help-demo"],
            #adminmenu a[href*="page=vgb-help-demo"] *,
            #adminmenu a[href*="page=vgb-help-demo"]:hover,
            #adminmenu a[href*="page=vgb-help-demo"]:hover *,
            #adminmenu a[href*="page=vgb-help-demo"]:focus,
            #adminmenu a[href*="page=vgb-help-demo"]:focus *,
            #adminmenu li.current a[href*="page=vgb-help-demo"],
            #adminmenu li.current a[href*="page=vgb-help-demo"] * {
                color: #f18500 !important;
            }
        </style>
    <?php }

    function adminMenu(){
        add_submenu_page(
            'edit.php?post_type=video-gallery-block',
            __('Help - bPlugins', 'video-gallery-block'),
            __('Help & Demos', 'video-gallery-block'),
            'manage_options',
            'vgb-help-demo',
            [$this, 'renderDashboardPage']
        );
    }

    function renderDashboardPage(){
        ?>
            <div
                id='vidgalblkDashboard'
                data-info='<?php echo esc_attr( wp_json_encode( [
                    'version' => VIDGALBLK_PLUGIN_VERSION,
                    'adminUrl' => admin_url(), 
                    'nonce' => wp_create_nonce('vidgalblk_activation_nonce'),
                    'uninstallNonce' => wp_create_nonce('vidgalblk_activation_nonce'),
                    'deleteDataOnUninstall' => get_option('vidgalblk_delete_data_on_uninstall', false),
                ] ) ); ?>'
            ></div>
        <?php
    }
}
