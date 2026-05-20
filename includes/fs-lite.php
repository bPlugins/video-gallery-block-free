<?php
if ( !defined( 'ABSPATH' ) ) { exit; }

 if (!function_exists('vidgalblk_fs')) {
        function vidgalblk_fs() {
            global $vidgalblk_fs;
            if (!isset($vidgalblk_fs)) {
                require_once VIDGALBLK_DIR_PATH . 'vendor/freemius-lite/start.php';
                $vidgalblk_fs = fs_lite_dynamic_init([
                    'id'                  => '20637',
                    'slug'                => 'video-gallery-block',
                    '__FILE__'            => VIDGALBLK_DIR_PATH . 'index.php',
                    'premium_slug'        => 'video-gallery-block-pro',
                    'type'                => 'plugin',
                    'public_key'          => 'pk_02d017aab6844d54db3238a59e91c',
                    'is_premium'          => false,
                    'premium_suffix'      => 'Pro',
                    'has_premium_version' => true,
                    'has_addons'          => false,
                    'has_paid_plans'      => true,
                    'menu'                => array(
                        'slug'           => 'edit.php?post_type=video-gallery-block',
                        'first-path'     => 'edit.php?post_type=video-gallery-block&page=vidgalblk-help-demo#/welcome',
                        'support'        => false,
                    ),
                ]); 
            }
            return $vidgalblk_fs;
        }
        vidgalblk_fs();
        do_action('vidgalblk_fs_loaded');
    }
