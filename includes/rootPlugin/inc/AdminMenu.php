<?php
namespace VIDGALBLK;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class AdminMenu  {
    function __construct() {
        add_action('admin_menu', [$this, 'adminMenu']);
        add_filter('plugin_action_links_' . plugin_basename(VIDGALBLK_DIR_PATH . 'index.php'), [$this, 'actionLinks']);
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

    /**
     * "Help" and "Demo" links under the plugin's name on the Plugins screen,
     * each opening in a new tab. Help is the plugin's own Help & Demos page.
     *
     * @param array $links The plugin's existing action links.
     * @return array The links with Help and Demo added.
     */
    function actionLinks($links){
        $extra = [
            '<a href="' . esc_url(admin_url('edit.php?post_type=video-gallery-block&page=vgb-help-demo')) . '" target="_blank" rel="noopener" style="font-weight:600;">' . esc_html__('Help', 'video-gallery-block') . '</a>',
            '<a href="' . esc_url('https://bblockswp.com/demo/video-gallery-block-all-demos/') . '" target="_blank" rel="noopener" style="font-weight:600;">' . esc_html__('Demo', 'video-gallery-block') . '</a>',
        ];

        return array_merge($links, $extra);
    }

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
