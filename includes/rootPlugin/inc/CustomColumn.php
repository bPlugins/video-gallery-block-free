<?php
namespace VGB;
class CustomColumn {
    function __construct() {
        add_filter(
            'manage_video-gallery-block_posts_columns',
            [$this, 'manageColumns']
        );
        add_action(
            'manage_video-gallery-block_posts_custom_column',
            [$this, 'manageCustomColumns'],
            10,
            2
        );
    }
    
    function manageColumns($columns) {
        unset($columns['date']);
        $columns['shortcode'] = __('Shortcode', 'video-gallery-block');
        $columns['date'] = __('Date', 'video-gallery-block');
        return $columns;
    }

    function manageCustomColumns($column_name, $post_id) {
        if ($column_name === 'shortcode') {
            echo '<div class="bPlAdminShortcode" id="bPlAdminShortcode-' . esc_attr($post_id) . '">
                    <input value="[video_gallery id=' . esc_attr($post_id) . ']" onclick="copyBPlAdminShortcode(\'' . esc_attr($post_id) . '\')" readonly>
                    <span class="tooltip">Copy To Clipboard</span>
                  </div>';
        }
    }
}
