<?php
if ( ! defined( 'ABSPATH' ) ) { exit; }
if ( ! function_exists( 'vgb_IsPremium' ) ) {
	function vgb_IsPremium() {
		return VGB_HAS_PRO ? vgb_fs()->can_use_premium_code() : false;
	}
}
