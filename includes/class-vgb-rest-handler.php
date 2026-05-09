<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class VGB_REST_Handler {

	public function __construct() {
		add_action( 'wp_ajax_vgb_disabled_blocks', array( $this, 'handle_disabled_blocks' ) );
		add_action( 'wp_ajax_vgbPremiumChecker', array( $this, 'handle_premium_checker' ) );
		add_action( 'wp_ajax_nopriv_vgbPremiumChecker', array( $this, 'handle_premium_checker' ) );
		add_action( 'admin_init', array( $this, 'register_settings' ) );
		add_action( 'rest_api_init', array( $this, 'register_settings' ) );
	}

	/**
	 * Handle AJAX for disabling blocks (from Dashboard).
	 */
	// public function handle_disabled_blocks() {
	// 	$nonce = isset( $_POST['_wpnonce'] ) ? sanitize_text_field( wp_unslash( $_POST['_wpnonce'] ) ) : null;
	// 	if ( ! wp_verify_nonce( $nonce, 'vgb_disabled_blocks' ) ) {
	// 		wp_send_json_error( 'Invalid Request' );
	// 	}

	// 	$data    = json_decode( stripslashes( $_POST['data'] ), true );
	// 	$db_data = get_option( 'vgbDisabledBlocks', [] );
		
	// 	if ( ! isset( $data ) && $db_data ) {
	// 		wp_send_json_success( $db_data );
	// 	}
	// 	update_option( 'vgbDisabledBlocks', $data );
	// 	wp_send_json_success( $data );
	// }

	/**
	 * Handle AJAX for premium check (from RestAPI).
	 */
	// public function handle_premium_checker() {
	// 	$nonce = isset( $_POST['_wpnonce'] ) ? sanitize_text_field( wp_unslash( $_POST['_wpnonce'] ) ) : null;
	// 	if ( ! wp_verify_nonce( $nonce, 'wp_ajax' ) ) {
	// 		wp_send_json_error( 'Invalid Request' );
	// 	}

	// 	wp_send_json_success( array(
	// 		'isPipe' => vgb_IsPremium(),
	// 	) );
	// }
	

	/**
	 * Register settings (from RestAPI).
	 */
	public function register_settings() {
		register_setting( 'vgbUtils', 'vgbUtils', array(
			'show_in_rest' => array(
				'name'   => 'vgbUtils',
				'schema' => array( 'type' => 'string' ),
			),
			'type'              => 'string',
			'default'           => wp_json_encode( array( 'nonce' => wp_create_nonce( 'wp_ajax' ) ) ),
			'sanitize_callback' => 'sanitize_text_field',
		) );
	}
}

new VGB_REST_Handler();
