<?php
/**
 * BFCM (Black Friday & Cyber Monday) Promotional Banner & Action Link.
 *
 * For Video Gallery Block.
 *
 * @package Video_Gallery_Block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'VGBF_BFCM_Notice' ) ) {

	/**
	 * Class VGBF_BFCM_Notice
	 *
	 * A self-contained, reusable promotional notice class for Video Gallery Block.
	 */
	class VGBF_BFCM_Notice {

		/**
		 * Configuration settings.
		 *
		 * @var array
		 */
		protected $config = [];

		/**
		 * Constructor.
		 *
		 * @param array $config Configuration arguments.
		 */
		public function __construct( array $config = [] ) {
			$defaults = [
				'campaign_id'         => 'bfcm2026',
				'plugin_slug'         => 'video-gallery-block',
				'plugin_name'         => 'Video Gallery Block',
				'short_name'          => 'VIDEO GALLERY',
				'plugin_file'         => '',
				'logo_url'            => '',
				'pricing_url'         => 'https://bplugins.com/products/video-gallery-block/pricing/',
				'start_date'          => '',
				'end_date'            => '2026-12-05 23:59:59',
				'discount_text'       => 'Flat 45% OFF',
				'coupon_code'         => 'BFCM45',
				'pro_name'            => 'Video Gallery Pro',
				'brand_gradient'      => 'linear-gradient(135deg, #0a192f 0%, #1e3a8a 100%)',
				'btn_color'           => '#2563eb',
				'btn_hover_color'     => '#1d4ed8',
				'features'            => [
					'YouTube & Vimeo Feeds',
					'31+ Advanced Layouts',
					'Video SEO & Lightbox',
					'Use Code: BFCM45',
				],
				'action_link_color'   => '#d63638',
				'show_row_notice'     => false,
				'post_types'          => [ 'video-gallery-block', 'post', 'page' ],
				'admin_screens'       => [
					'edit-video-gallery-block',
					'video-gallery-block',
					'video-gallery-block_page_vgb-help-demo',
					'vgb-help-demo',
					'edit-post',
					'edit-page',
				],
				'is_premium_callback' => null,
			];

			$this->config = wp_parse_args( $config, $defaults );

			// Hook into WordPress admin.
			add_action( 'admin_init', [ $this, 'handle_fallback_dismiss' ] );
			add_action( 'admin_notices', [ $this, 'render_banner_notice' ] );
			add_action( 'wp_ajax_' . $this->get_ajax_action(), [ $this, 'ajax_dismiss' ] );

			// Plugin action links and optional row notice on plugins.php.
			$plugin_file = $this->get_plugin_file();
			if ( ! empty( $this->config['show_row_notice'] ) && ! empty( $plugin_file ) ) {
				add_action( "after_plugin_row_{$plugin_file}", [ $this, 'render_plugin_row_notice' ], 10, 3 );
			}
			if ( ! empty( $plugin_file ) ) {
				add_filter( "plugin_action_links_{$plugin_file}", [ $this, 'add_plugin_action_link' ], 20 );
			}
			add_filter( 'plugin_action_links', [ $this, 'filter_plugin_action_links' ], 20, 2 );
		}

		/**
		 * Get the plugin file basename dynamically.
		 *
		 * @return string
		 */
		public function get_plugin_file() {
			if ( ! empty( $this->config['plugin_file'] ) ) {
				return $this->config['plugin_file'];
			}

			if ( defined( 'VIDGALBLK_DIR_PATH' ) ) {
				return plugin_basename( VIDGALBLK_DIR_PATH . 'index.php' );
			}

			return plugin_basename( dirname( __DIR__ ) . '/index.php' );
		}

		/**
		 * Universal filter for plugin action links that ensures the link is added
		 * even if the plugin directory on the testing site is renamed.
		 *
		 * @param array  $links       Plugin action links.
		 * @param string $plugin_file Plugin file path relative to wp-content/plugins.
		 * @return array
		 */
		public function filter_plugin_action_links( $links, $plugin_file ) {
			$link_key = 'bfcm2026_' . sanitize_key( $this->config['plugin_slug'] );
			if ( isset( $links[ $link_key ] ) ) {
				return $links;
			}

			$my_file = $this->get_plugin_file();

			$match = false;
			if ( $my_file && $plugin_file === $my_file ) {
				$match = true;
			} else {
				$dir    = dirname( $plugin_file );
				$my_dir = $my_file ? dirname( $my_file ) : '';
				if (
					( $my_dir && $dir === $my_dir ) ||
					false !== strpos( $dir, $this->config['plugin_slug'] ) ||
					false !== strpos( $dir, 'video-gallery' ) ||
					false !== strpos( $dir, 'plugin-slug' )
				) {
					if ( basename( $plugin_file ) === basename( $my_file ) ) {
						$match = true;
					}
				}
			}

			if ( $match ) {
				return $this->add_plugin_action_link( $links );
			}

			return $links;
		}

		/**
		 * Get the unique dismissal meta key for the user.
		 *
		 * @return string
		 */
		public function get_dismiss_meta_key() {
			return sanitize_key( 'bpl_' . $this->config['campaign_id'] . '_' . str_replace( '-', '_', $this->config['plugin_slug'] ) . '_dismissed' );
		}

		/**
		 * Get the unique AJAX action name.
		 *
		 * @return string
		 */
		public function get_ajax_action() {
			return sanitize_key( 'bpl_dismiss_' . $this->config['campaign_id'] . '_' . str_replace( '-', '_', $this->config['plugin_slug'] ) );
		}

		/**
		 * Check whether the promotion campaign is active within the date range.
		 *
		 * @return bool
		 */
		public function is_campaign_active() {
			// 1. Time expiration check.
			$now        = time();
			$end_time   = ! empty( $this->config['end_date'] ) ? strtotime( $this->config['end_date'] ) : 0;
			$start_time = ! empty( $this->config['start_date'] ) ? strtotime( $this->config['start_date'] ) : 0;

			if ( $end_time && $now > $end_time ) {
				return false;
			}

			if ( $start_time && $now < $start_time ) {
				return false;
			}

			// 2. User capabilities.
			if ( ! current_user_can( 'manage_options' ) ) {
				return false;
			}

			// 3. Premium check if callback is provided.
			if ( is_callable( $this->config['is_premium_callback'] ) ) {
				if ( call_user_func( $this->config['is_premium_callback'] ) ) {
					return false;
				}
			}

			return true;
		}

		/**
		 * Check whether the banner is active and eligible to display (not dismissed).
		 *
		 * @return bool
		 */
		public function is_active() {
			if ( ! $this->is_campaign_active() ) {
				return false;
			}

			// Dismissal check (per user).
			$user_id = get_current_user_id();
			if ( $user_id && get_user_meta( $user_id, $this->get_dismiss_meta_key(), true ) ) {
				return false;
			}

			return true;
		}

		/**
		 * Build the pricing URL with UTM parameters.
		 *
		 * @param string $medium 'dashboard' or 'plugins'.
		 * @return string
		 */
		public function get_offer_url( $medium ) {
			return add_query_arg(
				[
					'utm_source'   => 'admin',
					'utm_medium'   => sanitize_key( $medium ),
					'utm_campaign' => sanitize_key( $this->config['campaign_id'] ),
				],
				$this->config['pricing_url']
			);
		}

		/**
		 * Handle fallback non-AJAX dismissal.
		 */
		public function handle_fallback_dismiss() {
			if ( ! isset( $_GET['bpl_bfcm_dismiss'], $_GET['campaign'], $_GET['_wpnonce'] ) ) {
				return;
			}

			if ( sanitize_key( $_GET['campaign'] ) !== $this->config['campaign_id'] ) {
				return;
			}

			if ( ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_GET['_wpnonce'] ) ), 'bpl_bfcm_dismiss_' . $this->config['campaign_id'] ) ) {
				return;
			}

			if ( ! current_user_can( 'manage_options' ) ) {
				return;
			}

			$user_id = get_current_user_id();
			if ( $user_id ) {
				update_user_meta( $user_id, $this->get_dismiss_meta_key(), 1 );
			}

			$redirect = remove_query_arg( [ 'bpl_bfcm_dismiss', 'campaign', '_wpnonce' ] );
			wp_safe_redirect( $redirect );
			exit;
		}

		/**
		 * Handle AJAX dismissal.
		 */
		public function ajax_dismiss() {
			check_ajax_referer( 'bpl_bfcm_nonce_' . $this->config['campaign_id'], 'nonce' );

			if ( ! current_user_can( 'manage_options' ) ) {
				wp_send_json_error( [ 'message' => 'Unauthorized' ], 403 );
			}

			$user_id = get_current_user_id();
			if ( $user_id ) {
				update_user_meta( $user_id, $this->get_dismiss_meta_key(), 1 );
				wp_send_json_success( [ 'dismissed' => true ] );
			}

			wp_send_json_error( [ 'message' => 'User not found' ], 400 );
		}

		/**
		 * Render banner on the plugin's own admin pages and post type screens.
		 */
		public function render_banner_notice() {
			if ( ! $this->is_active() ) {
				return;
			}

			$screen = function_exists( 'get_current_screen' ) ? get_current_screen() : null;
			if ( ! $screen ) {
				return;
			}

			$matched = false;

			// 1. Direct match by screen post_type.
			$post_types = (array) ( $this->config['post_types'] ?? [ 'video-gallery-block', 'post', 'page' ] );
			if ( ! empty( $screen->post_type ) && in_array( $screen->post_type, $post_types, true ) ) {
				$matched = true;
			}

			// 2. Match screen id, base, or substring against allowed admin screens.
			if ( ! $matched && ! empty( $this->config['admin_screens'] ) && is_array( $this->config['admin_screens'] ) ) {
				foreach ( $this->config['admin_screens'] as $target ) {
					if (
						$screen->id === $target ||
						$screen->base === $target ||
						( ! empty( $screen->post_type ) && $screen->post_type === $target ) ||
						false !== strpos( $screen->id, $target )
					) {
						$matched = true;
						break;
					}
				}
			}

			if ( ! $matched ) {
				return;
			}

			$this->render_dashboard_banner();
		}

		/**
		 * Render Dashboard Banner (Dual-tone asymmetric ribbon with feature badges).
		 */
		protected function render_dashboard_banner() {
			$offer_url    = esc_url( $this->get_offer_url( 'dashboard' ) );
			$nonce        = wp_create_nonce( 'bpl_bfcm_nonce_' . $this->config['campaign_id'] );
			$fallback_url = esc_url(
				wp_nonce_url(
					add_query_arg(
						[
							'bpl_bfcm_dismiss' => 1,
							'campaign'         => $this->config['campaign_id'],
						],
						function_exists( 'self_admin_url' ) ? self_admin_url() : ''
					),
					'bpl_bfcm_dismiss_' . $this->config['campaign_id']
				)
			);
			$ajax_action  = esc_js( $this->get_ajax_action() );
			$notice_id    = 'bpl-bfcm-banner-' . esc_attr( $this->config['plugin_slug'] );
			?>
			<div id="<?php echo esc_attr( $notice_id ); ?>" class="bpl-bfcm-banner-wrap">
				<style>
					#<?php echo esc_attr( $notice_id ); ?> {
						margin: 12px 20px 12px 0;
						background: #ffffff;
						border: 1px solid #e2e8f0;
						border-radius: 8px;
						box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
						display: flex;
						flex-direction: row;
						align-items: stretch;
						overflow: hidden;
						font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
						position: relative;
						box-sizing: border-box;
					}
					#<?php echo esc_attr( $notice_id ); ?> * {
						box-sizing: border-box;
					}
					#<?php echo esc_attr( $notice_id ); ?> .bpl-ribbon {
						background: <?php echo esc_attr( $this->config['brand_gradient'] ); ?>;
						width: 100px;
						min-width: 100px;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						padding: 10px 8px;
						color: #ffffff;
						text-align: center;
						flex-shrink: 0;
					}
					#<?php echo esc_attr( $notice_id ); ?> .bpl-ribbon-icon {
						width: 36px;
						height: 36px;
						border-radius: 7px;
						object-fit: contain;
						box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
					}
					#<?php echo esc_attr( $notice_id ); ?> .bpl-ribbon-title {
						font-size: 10px;
						font-weight: 800;
						letter-spacing: 0.05em;
						text-transform: uppercase;
						margin: 5px 0 0 0 !important;
						line-height: 1.2;
						opacity: 0.95;
					}
					#<?php echo esc_attr( $notice_id ); ?> .bpl-content-body {
						flex: 1;
						padding: 10px 18px;
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: space-between;
						gap: 16px;
						background: #ffffff;
						min-width: 0;
					}
					#<?php echo esc_attr( $notice_id ); ?> .bpl-text-block {
						flex: 1;
						min-width: 0;
						display: flex;
						flex-direction: column;
						justify-content: center;
						gap: 4px;
						margin: 0 !important;
						padding: 0 !important;
					}
					#<?php echo esc_attr( $notice_id ); ?> .bpl-top-row {
						display: flex;
						align-items: center;
						gap: 8px;
						flex-wrap: wrap;
						margin: 0 !important;
						padding: 0 !important;
					}
					#<?php echo esc_attr( $notice_id ); ?> .bpl-heading {
						margin: 0 !important;
						padding: 0 !important;
						font-size: 15px;
						font-weight: 700;
						color: #0f172a;
						line-height: 1.25;
					}
					#<?php echo esc_attr( $notice_id ); ?> .bpl-description {
						margin: 0 !important;
						padding: 0 !important;
						font-size: 12.5px;
						line-height: 1.45;
						color: #475569;
						max-width: 820px;
					}
					#<?php echo esc_attr( $notice_id ); ?> .bpl-description strong {
						color: #0f172a;
					}
					#<?php echo esc_attr( $notice_id ); ?> .bpl-features-row {
						display: flex;
						align-items: center;
						gap: 14px;
						margin: 2px 0 0 0 !important;
						padding: 0 !important;
						flex-wrap: wrap;
					}
					#<?php echo esc_attr( $notice_id ); ?> .bpl-feature-item {
						display: inline-flex;
						align-items: center;
						gap: 4px;
						font-size: 11.5px;
						color: #475569;
						font-weight: 500;
						white-space: nowrap;
					}
					#<?php echo esc_attr( $notice_id ); ?> .bpl-check-icon {
						color: #16a34a;
						font-weight: 700;
						font-size: 11.5px;
					}
					#<?php echo esc_attr( $notice_id ); ?> .bpl-actions {
						display: flex;
						align-items: center;
						gap: 10px;
						flex-shrink: 0;
					}
					#<?php echo esc_attr( $notice_id ); ?> .bpl-btn-cta {
						background: <?php echo esc_attr( $this->config['btn_color'] ); ?>;
						color: #ffffff !important;
						font-size: 12.5px;
						font-weight: 600;
						padding: 7px 15px;
						border-radius: 6px;
						text-decoration: none !important;
						display: inline-flex;
						align-items: center;
						gap: 6px;
						transition: background-color 0.15s ease, transform 0.1s ease;
						box-shadow: 0 1px 3px rgba(37, 99, 235, 0.2);
						white-space: nowrap;
					}
					#<?php echo esc_attr( $notice_id ); ?> .bpl-btn-cta:hover {
						background: <?php echo esc_attr( $this->config['btn_hover_color'] ); ?>;
						color: #ffffff !important;
					}
					#<?php echo esc_attr( $notice_id ); ?> .bpl-dismiss-btn {
						background: transparent;
						border: none;
						color: #94a3b8;
						font-size: 18px;
						line-height: 1;
						cursor: pointer;
						padding: 4px;
						display: inline-flex;
						align-items: center;
						justify-content: center;
						border-radius: 4px;
						transition: color 0.15s ease;
						text-decoration: none;
					}
					#<?php echo esc_attr( $notice_id ); ?> .bpl-dismiss-btn:hover {
						color: #475569;
					}
					@media (max-width: 900px) {
						#<?php echo esc_attr( $notice_id ); ?> .bpl-content-body {
							gap: 12px;
							padding: 10px 14px;
						}
						#<?php echo esc_attr( $notice_id ); ?> .bpl-features-row {
							gap: 8px 12px;
						}
					}
					@media (max-width: 782px) {
						#<?php echo esc_attr( $notice_id ); ?> {
							flex-direction: column;
							margin: 10px 10px 10px 0;
						}
						#<?php echo esc_attr( $notice_id ); ?> .bpl-ribbon {
							width: 100%;
							min-width: 100%;
							flex-direction: row;
							justify-content: flex-start;
							gap: 10px;
							padding: 8px 14px;
						}
						#<?php echo esc_attr( $notice_id ); ?> .bpl-ribbon-icon {
							width: 28px;
							height: 28px;
						}
						#<?php echo esc_attr( $notice_id ); ?> .bpl-ribbon-title {
							margin: 0 !important;
							font-size: 11px;
						}
						#<?php echo esc_attr( $notice_id ); ?> .bpl-content-body {
							flex-direction: column;
							align-items: flex-start;
							padding: 12px 14px;
							gap: 10px;
						}
						#<?php echo esc_attr( $notice_id ); ?> .bpl-text-block {
							width: 100%;
						}
						#<?php echo esc_attr( $notice_id ); ?> .bpl-description {
							max-width: 100%;
						}
						#<?php echo esc_attr( $notice_id ); ?> .bpl-actions {
							width: 100%;
							justify-content: space-between;
							margin-top: 2px;
							padding-top: 8px;
							border-top: 1px solid #f1f5f9;
						}
					}
					@media (max-width: 480px) {
						#<?php echo esc_attr( $notice_id ); ?> {
							margin: 8px 5px;
						}
						#<?php echo esc_attr( $notice_id ); ?> .bpl-actions {
							display: flex;
							align-items: center;
							gap: 8px;
						}
						#<?php echo esc_attr( $notice_id ); ?> .bpl-btn-cta {
							flex: 1;
							justify-content: center;
							text-align: center;
							padding: 8px 12px;
							font-size: 12px;
						}
					}
				</style>

				<!-- Left Asymmetric Ribbon -->
				<div class="bpl-ribbon">
					<?php if ( ! empty( $this->config['logo_url'] ) ) : ?>
						<img src="<?php echo esc_url( $this->config['logo_url'] ); ?>" alt="<?php echo esc_attr( $this->config['plugin_name'] ); ?>" class="bpl-ribbon-icon" />
					<?php endif; ?>
					<div class="bpl-ribbon-title"><?php echo esc_html( $this->config['short_name'] ); ?></div>
				</div>

				<!-- Main Content Body -->
				<div class="bpl-content-body">
					<div class="bpl-text-block">
						<div class="bpl-top-row">
							<h3 class="bpl-heading">
								<?php esc_html_e( 'Biggest Black Friday Sale – Flat 45% OFF!', 'video-gallery-block' ); ?>
							</h3>
						</div>

						<p class="bpl-description">
							<?php
							$pro_name = ! empty( $this->config['pro_name'] ) ? $this->config['pro_name'] : 'Video Gallery Pro';
							echo sprintf(
								/* translators: %s: Pro plugin name */
								esc_html__( 'Showcase your videos in a responsive, filterable gallery. Upgrade to %s to unlock 31+ advanced layouts, YouTube & Vimeo auto-feeds, Wistia support, and enhanced video SEO during this limited-time sale!', 'video-gallery-block' ),
								'<strong>' . esc_html( $pro_name ) . '</strong>'
							);
							?>
						</p>

						<!-- Feature Badges -->
						<?php if ( ! empty( $this->config['features'] ) && is_array( $this->config['features'] ) ) : ?>
							<div class="bpl-features-row">
								<?php foreach ( $this->config['features'] as $feature ) : ?>
									<div class="bpl-feature-item">
										<span class="bpl-check-icon">&#10004;</span>
										<span><?php echo esc_html( $feature ); ?></span>
									</div>
								<?php endforeach; ?>
							</div>
						<?php endif; ?>
					</div>

					<div class="bpl-actions">
						<a href="<?php echo $offer_url; ?>" target="_blank" rel="noopener noreferrer" class="bpl-btn-cta">
							<?php esc_html_e( 'Unlock PRO Features →', 'video-gallery-block' ); ?>
						</a>
						<a href="<?php echo $fallback_url; ?>" class="bpl-dismiss-btn" title="<?php esc_attr_e( 'Dismiss notice', 'video-gallery-block' ); ?>" aria-label="<?php esc_attr_e( 'Dismiss notice', 'video-gallery-block' ); ?>">
							&times;
						</a>
					</div>
				</div>
			</div>

			<script>
				(function() {
					var banner = document.getElementById('<?php echo esc_js( $notice_id ); ?>');
					if (!banner) return;

					var dismissBtn = banner.querySelector('.bpl-dismiss-btn');
					if (!dismissBtn) return;

					dismissBtn.addEventListener('click', function(e) {
						e.preventDefault();
						banner.style.transition = 'opacity 0.25s ease, max-height 0.3s ease';
						banner.style.opacity = '0';
						banner.style.maxHeight = '0';
						banner.style.overflow = 'hidden';
						setTimeout(function() {
							banner.remove();
						}, 300);

						var formData = new FormData();
						formData.append('action', '<?php echo $ajax_action; ?>');
						formData.append('nonce', '<?php echo esc_js( $nonce ); ?>');

						fetch(window.ajaxurl || '<?php echo esc_js( admin_url( 'admin-ajax.php' ) ); ?>', {
							method: 'POST',
							body: formData
						}).catch(function(err) {
							console.warn('Notice dismissal failed:', err);
						});
					});
				})();
			</script>
			<?php
		}

		/**
		 * Add BFCM action link in plugin row on plugins.php.
		 *
		 * @param array $links Plugin action links.
		 * @return array
		 */
		public function add_plugin_action_link( $links ) {
			if ( ! $this->is_campaign_active() ) {
				return $links;
			}

			$offer_url = esc_url( $this->get_offer_url( 'plugins' ) );
			$color     = ! empty( $this->config['action_link_color'] ) ? $this->config['action_link_color'] : '#d63638';
			$link_key  = 'bfcm2026_' . sanitize_key( $this->config['plugin_slug'] );

			$links[ $link_key ] = sprintf(
				'<a href="%s" target="_blank" rel="noopener noreferrer" style="color: %s; font-weight: 700;">%s</a>',
				$offer_url,
				esc_attr( $color ),
				esc_html__( 'Black Friday: 45% OFF', 'video-gallery-block' )
			);

			return $links;
		}

		/**
		 * Render inline plugin-row notice on plugins.php (below the plugin's own row).
		 *
		 * @param string $plugin_file Plugin basename.
		 * @param array  $plugin_data Plugin data array.
		 * @param string $status      Plugin status.
		 */
		public function render_plugin_row_notice( $plugin_file, $plugin_data, $status ) {
			if ( ! $this->is_active() ) {
				return;
			}

			$offer_url   = esc_url( $this->get_offer_url( 'plugins' ) );
			$nonce       = wp_create_nonce( 'bpl_bfcm_nonce_' . $this->config['campaign_id'] );
			$ajax_action = esc_js( $this->get_ajax_action() );
			$notice_id   = 'bpl-bfcm-row-' . esc_attr( $this->config['plugin_slug'] );

			$wp_list_table = _get_list_table( 'WP_Plugins_List_Table' );
			$colspan       = $wp_list_table ? $wp_list_table->get_column_count() : 4;
			?>
			<tr id="<?php echo esc_attr( $notice_id ); ?>" class="plugin-update-tr active bpl-bfcm-row">
				<td colspan="<?php echo esc_attr( $colspan ); ?>" class="plugin-update colspanchange">
					<div class="update-message notice inline notice-warning notice-alt" style="
						display: flex;
						align-items: center;
						justify-content: space-between;
						padding: 8px 14px;
						margin: 0;
						border-left: 4px solid #d63638;
						background: #fff8f8;
					">
						<div style="font-size: 13px; line-height: 1.5; color: #1e293b;">
							🎉 <strong><?php esc_html_e( 'Black Friday: 45% OFF', 'video-gallery-block' ); ?></strong>
							<?php if ( ! empty( $this->config['coupon_code'] ) ) : ?>
								<?php
								/* translators: %s: Coupon code */
								printf(
									esc_html__( 'Use coupon code %s (Ends Dec 5th).', 'video-gallery-block' ),
									'<code style="font-weight:bold;background:#ffedd5;color:#c2410c;padding:1px 6px;border-radius:3px;">' . esc_html( $this->config['coupon_code'] ) . '</code>'
								);
								?>
							<?php endif; ?>
							<a href="<?php echo $offer_url; ?>" target="_blank" rel="noopener noreferrer" style="margin-left: 8px; font-weight: 600; color: #d63638; text-decoration: underline;">
								<?php esc_html_e( 'Claim Discount →', 'video-gallery-block' ); ?>
							</a>
						</div>
						<button type="button" class="bpl-row-dismiss" title="<?php esc_attr_e( 'Dismiss', 'video-gallery-block' ); ?>" style="
							background: transparent;
							border: none;
							color: #999;
							font-size: 16px;
							cursor: pointer;
							padding: 0 4px;
							line-height: 1;
						">&times;</button>
					</div>
				</td>
			</tr>
			<script>
				(function() {
					var row = document.getElementById('<?php echo esc_js( $notice_id ); ?>');
					if (!row) return;

					var btn = row.querySelector('.bpl-row-dismiss');
					if (!btn) return;

					btn.addEventListener('click', function(e) {
						e.preventDefault();
						row.style.transition = 'opacity 0.2s ease';
						row.style.opacity = '0';
						setTimeout(function() { row.remove(); }, 200);

						var formData = new FormData();
						formData.append('action', '<?php echo $ajax_action; ?>');
						formData.append('nonce', '<?php echo esc_js( $nonce ); ?>');

						fetch(window.ajaxurl || '<?php echo esc_js( admin_url( 'admin-ajax.php' ) ); ?>', {
							method: 'POST',
							body: formData
						}).catch(function(err) {
							console.warn('Row notice dismissal failed:', err);
						});
					});
				})();
			</script>
			<?php
		}
	}
}

/**
 * Initialize BFCM Notice for Video Gallery Block.
 */
function vgbf_init_bfcm_notice() {
	new VGBF_BFCM_Notice(
		[
			'campaign_id'         => 'bfcm2026',
			'plugin_slug'         => 'video-gallery-block',
			'plugin_name'         => 'Video Gallery Block',
			'short_name'          => 'VIDEO GALLERY',
			'plugin_file'         => defined( 'VIDGALBLK_DIR_PATH' ) ? plugin_basename( VIDGALBLK_DIR_PATH . 'index.php' ) : plugin_basename( dirname( __DIR__ ) . '/index.php' ),
			'logo_url'            => defined( 'VIDGALBLK_DIR_URL' ) ? VIDGALBLK_DIR_URL . 'public/icon.svg' : '',
			'pricing_url'         => 'https://bplugins.com/products/video-gallery-block/pricing/',
			'start_date'          => '',
			'end_date'            => '2026-12-05 23:59:59',
			'discount_text'       => 'Flat 45% OFF',
			'coupon_code'         => 'BFCM45',
			'pro_name'            => 'Video Gallery Pro',
			'brand_gradient'      => 'linear-gradient(135deg, #0a192f 0%, #1e3a8a 100%)',
			'btn_color'           => '#2563eb',
			'btn_hover_color'     => '#1d4ed8',
			'action_link_color'   => '#d63638',
			'features'            => [
				'YouTube & Vimeo Feeds',
				'31+ Advanced Layouts',
				'Video SEO & Lightbox',
				'Use Code: BFCM45',
			],
			'post_types'          => [
				'video-gallery-block',
				'post',
				'page',
			],
			'admin_screens'       => [
				'edit-video-gallery-block',
				'video-gallery-block',
				'video-gallery-block_page_vgb-help-demo',
				'vgb-help-demo',
				'edit-post',
				'edit-page',
			],
			'is_premium_callback' => function () {
				return ( function_exists( 'vgb_fs' ) && vgb_fs()->can_use_premium_code() ) || defined( 'VIDGALBLK_PRO_VERSION' ) || defined( 'VGB_PRO_VERSION' );
			},
		]
	);
}

vgbf_init_bfcm_notice();
