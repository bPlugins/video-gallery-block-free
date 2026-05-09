<?php
namespace VGB;

class ShortCode {
    function __construct() {
        add_shortcode('video_gallery', [$this, 'vgb_shortcode']);
    }
    function vgb_shortcode($atts){
        $atts = shortcode_atts( array(
            'id' => 0,
        ), $atts, 'video_gallery' );

        $post_id = absint( $atts['id'] );
        if ( ! $post_id ) {
            return '';
        }

        $post = get_post( $post_id );
        if ( !$post || $post->post_type !== 'video-gallery-block' ) {
            return '';
        }

        if ( post_password_required( $post ) ) {
            return get_the_password_form( $post );
        }

        switch ( $post->post_status ) {
            case 'publish':
                return $this->displayContent( $post );
                
            case 'private':
                if (current_user_can('read_private_posts')) {
                    return $this->displayContent( $post );
                }
                return '';
                
            case 'draft':
            case 'pending':
            case 'future':
                if ( current_user_can( 'edit_post', $post_id ) ) {
                    return $this->displayContent( $post );
                }
                return '';
                
            default:
                return '';
        }
    }
    function displayContent( $post ){
        $blocks = parse_blocks( $post->post_content );
        if ( empty( $blocks ) ) {
            return '';
        }
        return wp_kses_post( render_block( $blocks[0] ) );
    }
}
