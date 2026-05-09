<?php

if (!defined('ABSPATH')) exit;

if( !class_exists( 'VGB_VideoGallery' ) ){
    class VGB_VideoGallery{
        function __construct(){
            $this -> loaded_classes();
        }
        function loaded_classes(){
			require_once VGB_DIR_PATH . 'includes/rootPlugin/inc/Init.php';
			require_once VGB_DIR_PATH . 'includes/rootPlugin/inc/Enqueue.php';
			require_once VGB_DIR_PATH . 'includes/rootPlugin/inc/AdminMenu.php';
			require_once VGB_DIR_PATH . 'includes/rootPlugin/inc/ShortCode.php';
			require_once VGB_DIR_PATH . 'includes/rootPlugin/inc/CustomColumn.php';
			require_once VGB_DIR_PATH . 'includes/class-vgb-rest-handler.php';

			new VGB\Init();
			new VGB\Enqueue();
			new VGB\AdminMenu();
			new VGB\ShortCode();
			new VGB\CustomColumn();
		}
    }
    new VGB_VideoGallery();
}
