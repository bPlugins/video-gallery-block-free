<?php
/**
 * Uninstall handler for Video Gallery Block.
 *
 * Cleans up plugin data when the plugin is deleted from the admin.
 * Only runs if the user has opted in via the "Delete data on uninstall" setting.
 *
 * @package VGB
 */

// Exit if not called by WordPress.
if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	exit;
}

$isDeleteData = get_option( 'vgb_delete_data_on_uninstall', false );

if ( ! $isDeleteData ) {
	return;
}

global $wpdb;

// 1. Delete all 'video-gallery-block' custom post type posts and their meta/revisions efficiently.
$vgb_post_ids = $wpdb->get_col( $wpdb->prepare( "SELECT ID FROM $wpdb->posts WHERE post_type = %s", 'video-gallery-block' ) );

if ( ! empty( $vgb_post_ids ) ) {
	foreach ( $vgb_post_ids as $post_id ) {
		wp_delete_post( $post_id, true ); // Force delete (bypass trash).
	}
}

// 2. Delete plugin options.
delete_option( 'vgb_delete_data_on_uninstall' );
delete_option( 'vgbDisabledBlocks' );
delete_option( 'vgbAPIKey' );
delete_option( 'vgbUtils' );

