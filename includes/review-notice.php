<?php
/**
 * A polite, one-time review request.
 *
 * - Shown only to administrators, only on the Dashboard, the Plugins page and
 *   this plugin's list screen, and only after a week of use.
 * - Three buttons: leave a review, "maybe later" (30 days), "already did / don't
 *   show again". After three "maybe later" answers it stops by itself.
 * - Shared across bPlugins plugins: only one request is shown at a time, and
 *   any answer silences the others for two weeks, so nobody gets a stack of them.
 * - Existing sites start their week the first time an admin page loads after
 *   this version is installed, so nobody sees it the moment they update.
 * - Every action is a nonce-checked link; no JavaScript, no external request.
 *
 * @package video-gallery-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! function_exists( 'vidgalblk_review_config' ) ) {

	/**
	 * Per-plugin settings. Everything else in this file is generic.
	 *
	 * @return array
	 */
	function vidgalblk_review_config() {
		return array(
			'name'    => 'Video Gallery Block',
			// Optional: name of a function that is true for licensed (paying) sites, which are never asked.
			'is_premium' => '',
			'slug'    => 'video-gallery-block', // WordPress.org plugin slug.
			'domain'  => 'video-gallery-block',
			'option'  => 'vidgalblk_review_state',
			'param'   => 'vidgalblk_review',
						'screens' => array( 'dashboard', 'plugins', 'edit-video-gallery-block' ),
			'delay'   => 7 * DAY_IN_SECONDS,
			'snooze'  => 30 * DAY_IN_SECONDS,
			'max_later' => 3,
			// Same key in every bPlugins plugin, on purpose.
			'cooldown_option' => 'bpl_review_cooldown_until',
			'cooldown'        => 14 * DAY_IN_SECONDS,
		);
	}

	/**
	 * The saved state: when the plugin was first seen, and what the admin chose.
	 *
	 * @return array{installed:int,status:string,until:int,later:int}
	 */
	function vidgalblk_review_state() {
		$cfg   = vidgalblk_review_config();
		$state = get_option( $cfg['option'], array() );
		$state = is_array( $state ) ? $state : array();

		return array(
			'installed' => isset( $state['installed'] ) ? (int) $state['installed'] : 0,
			'status'    => isset( $state['status'] ) ? (string) $state['status'] : '',
			'until'     => isset( $state['until'] ) ? (int) $state['until'] : 0,
			'later'     => isset( $state['later'] ) ? (int) $state['later'] : 0,
		);
	}

	/**
	 * @param array $state New state.
	 */
	function vidgalblk_review_save( $state ) {
		$cfg = vidgalblk_review_config();
		update_option( $cfg['option'], $state, false );
	}

	/**
	 * Start the clock on first sight, and handle the three links.
	 */
	function vidgalblk_review_init() {
		if ( ! current_user_can( 'manage_options' ) || wp_doing_ajax() ) {
			return;
		}

		$cfg   = vidgalblk_review_config();
		$state = vidgalblk_review_state();

		if ( ! $state['installed'] ) {
			$state['installed'] = time();
			vidgalblk_review_save( $state );
		}

		// The links carry a nonce, so this is not a form post.
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended
		if ( empty( $_GET[ $cfg['param'] ] ) ) {
			return;
		}

		// phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$action = sanitize_key( wp_unslash( $_GET[ $cfg['param'] ] ) );
		if ( ! in_array( $action, array( 'review', 'later', 'done' ), true ) ) {
			return;
		}

		check_admin_referer( $cfg['param'] . '_' . $action );

		if ( 'later' === $action ) {
			++$state['later'];
			$state['until'] = time() + $cfg['snooze'];
			if ( $state['later'] >= $cfg['max_later'] ) {
				$state['status'] = 'done';
			}
		} else {
			$state['status'] = 'done';
		}
		vidgalblk_review_save( $state );
		update_option( $cfg['cooldown_option'], time() + $cfg['cooldown'], false );

		if ( 'review' === $action ) {
			// A fixed WordPress.org address, never taken from the request.
			wp_redirect( 'https://wordpress.org/support/plugin/' . $cfg['slug'] . '/reviews/#new-post' ); // phpcs:ignore WordPress.Security.SafeRedirect.wp_redirect_wp_redirect
			exit;
		}

		wp_safe_redirect( remove_query_arg( array( $cfg['param'], '_wpnonce' ) ) );
		exit;
	}

	/**
	 * The notice itself.
	 */
	function vidgalblk_review_notice() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}

		$cfg = vidgalblk_review_config();
		if ( ! empty( $cfg['is_premium'] ) && is_callable( $cfg['is_premium'] ) && call_user_func( $cfg['is_premium'] ) ) {
			return;
		}

		$screen = function_exists( 'get_current_screen' ) ? get_current_screen() : null;
		if ( ! $screen || ! in_array( $screen->id, $cfg['screens'], true ) ) {
			return;
		}

		$state = vidgalblk_review_state();
		$now   = time();
		if ( 'done' === $state['status'] || ! $state['installed'] || $now < $state['installed'] + $cfg['delay'] || $now < $state['until'] ) {
			return;
		}

		// One request at a time across bPlugins plugins, and a pause after any answer.
		if ( $now < (int) get_option( $cfg['cooldown_option'], 0 ) || ! empty( $GLOBALS['bpl_review_notice_shown'] ) ) {
			return;
		}
		$GLOBALS['bpl_review_notice_shown'] = true;

		$link = function ( $action ) use ( $cfg ) {
			return esc_url( wp_nonce_url( add_query_arg( $cfg['param'], $action ), $cfg['param'] . '_' . $action ) );
		};
		?>
		<div class="notice notice-info" style="padding:12px 16px;">
			<p style="margin:0 0 4px;font-size:14px;">
				<strong>
					<?php
					/* translators: %s: plugin name */
					echo esc_html( sprintf( __( 'Enjoying %s?', 'video-gallery-block' ), $cfg['name'] ) );
					?>
				</strong>
			</p>
			<p style="margin:0 0 10px;">
				<?php esc_html_e( 'A short review on WordPress.org helps other people find the plugin and tells us what to improve. It takes about a minute.', 'video-gallery-block' ); ?>
			</p>
			<p style="margin:0;">
				<a class="button button-primary" href="<?php echo $link( 'review' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- escaped in $link(). ?>" target="_blank" rel="noopener" onclick="this.closest('.notice').style.display='none'"><?php esc_html_e( 'Leave a review', 'video-gallery-block' ); ?></a>
				<a class="button" href="<?php echo $link( 'later' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- escaped in $link(). ?>"><?php esc_html_e( 'Maybe later', 'video-gallery-block' ); ?></a>
				<a class="button-link" style="margin-left:8px;" href="<?php echo $link( 'done' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- escaped in $link(). ?>"><?php esc_html_e( "I already did / don't show again", 'video-gallery-block' ); ?></a>
			</p>
		</div>
		<?php
	}

	add_action( 'admin_init', 'vidgalblk_review_init' );
	add_action( 'admin_notices', 'vidgalblk_review_notice' );
}
