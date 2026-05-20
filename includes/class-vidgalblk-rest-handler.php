<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class VIDGALBLK_REST_Handler {

	public function __construct() {
		add_action( 'wp_ajax_vidgalblk_disabled_blocks', array( $this, 'handle_disabled_blocks' ) );
		add_action( 'wp_ajax_vidgalblkSaveUninstallOption', array( $this, 'handle_uninstall_option' ) );
		add_action( 'admin_init', array( $this, 'register_settings' ) );
		add_action( 'rest_api_init', array( $this, 'register_settings' ) );
	}

	/**
	 * Handle AJAX for saving uninstall data deletion preference.
	 */
	public function handle_uninstall_option() {
		$nonce = isset( $_POST['nonce'] ) ? sanitize_text_field( wp_unslash( $_POST['nonce'] ) ) : null;
		if ( ! wp_verify_nonce( $nonce, 'vidgalblk_activation_nonce' ) ) {
			wp_send_json_error( array( 'message' => __( 'Invalid security token.', 'video-gallery-block' ) ) );
		}

		if ( ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( array( 'message' => __( 'You do not have permission to perform this action.', 'video-gallery-block' ) ) );
		}

		// Support both string 'true' and actual boolean/numeric values
		$raw_enabled = isset( $_POST['enabled'] ) ? sanitize_text_field( wp_unslash( $_POST['enabled'] ) ) : '';
		$enabled = ( 'true' === $raw_enabled || '1' === $raw_enabled );
		update_option( 'vidgalblk_delete_data_on_uninstall', $enabled );

		wp_send_json_success( array(
			'enabled' => $enabled,
			'message' => __( 'Setting saved successfully.', 'video-gallery-block' ),
		) );
	}

	/**
	 * Handle AJAX for disabling blocks (from Dashboard).
	 */
	public function handle_disabled_blocks() {
		$nonce = isset( $_POST['_wpnonce'] ) ? sanitize_text_field( wp_unslash( $_POST['_wpnonce'] ) ) : null;
		if ( ! wp_verify_nonce( $nonce, 'vidgalblk_disabled_blocks' ) ) {
			wp_send_json_error( 'Invalid Request' );
		}

		if ( ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( 'You do not have permission to perform this action.' );
		}

		$data = isset( $_POST['data'] ) ? json_decode( wp_unslash( $_POST['data'] ), true, 3 ) : null;
		
		if ( is_array( $data ) ) {
			$data = array_map( 'sanitize_text_field', $data );
			update_option( 'vidgalblkDisabledBlocks', $data );
			wp_send_json_success( $data );
		} else {
			$db_data = get_option( 'vidgalblkDisabledBlocks', [] );
			wp_send_json_success( $db_data );
		}
	}
	
	
	/**
	 * Register settings (from RestAPI).
	 */
	public function register_settings() {
		register_setting( 'vidgalblkUtils', 'vidgalblkUtils', array(
			'show_in_rest' => array(
				'name'   => 'vidgalblkUtils',
				'schema' => array( 'type' => 'string' ),
			),
			'type'              => 'string',
			'default'           => '{}',
			'sanitize_callback' => 'sanitize_text_field',
		) );
	}
}

new VIDGALBLK_REST_Handler();
