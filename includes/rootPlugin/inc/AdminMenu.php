<?php
namespace VGB;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class AdminMenu  {
    function __construct() {
        add_action('admin_menu', [$this, 'adminMenu']);
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
                id='vgbDashboard'
                data-info='<?php echo esc_attr( wp_json_encode( [
                    'version' => VGB_PLUGIN_VERSION,
                    'adminUrl' => admin_url(), 
                    'nonce' => wp_create_nonce('vgb_activation_nonce'),
                    'licenseActiveNonce' => wp_create_nonce('vgb_activation_nonce'),
                    'disabledBlocksNonce' => wp_create_nonce('vgb_disabled_blocks'),
                    'uninstallNonce' => wp_create_nonce('vgb_activation_nonce'),
                    'vgbDisabledBlocks' => get_option('vgbDisabledBlocks', []),
                    'deleteDataOnUninstall' => get_option('vgb_delete_data_on_uninstall', false),
                ] ) ); ?>'
            ></div>
        <?php
    }
}
