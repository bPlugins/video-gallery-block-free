<?php
/**
 * Critical issue alerts for the YouTube / Vimeo feeds.
 *
 * A feed that stops working fails quietly by design: vidgalblk_feed_get() keeps
 * showing the last list it loaded, so a gallery never empties itself because
 * of a bad hour. The cost is that nobody notices a revoked key or a deleted
 * playlist -- the gallery simply stops getting new videos. This file tells
 * the site's administrators: a notice in the dashboard, and, if they ask for
 * it, an email.
 *
 * Only failures on the live site count -- a page being shown, or a feed being
 * refreshed in the background. A wrong link typed into the editor is already
 * explained there, under the link, and is not an alert.
 *
 * @package video-gallery-block-free
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/** Where the open issues are kept -- the same option as the free plugin's. */
const VIDGALBLK_FEED_ALERTS_OPTION = 'vidgalblk_feed_alerts';

/** "Email me about feed problems": off unless an administrator turns it on. */
const VIDGALBLK_FEED_ALERTS_EMAIL_OPTION = 'vidgalblk_feed_alerts_email';

/** A failure that may only be a bad moment counts once it has lasted this long. */
const VIDGALBLK_FEED_ALERTS_GRACE = 6 * HOUR_IN_SECONDS;

/**
 * What each failure is about: the whole site's YouTube connection, or one
 * link. Anything not listed (an unsupported or single-video link) is a setup
 * mistake the editor already shows, not an alert.
 *
 * @return array Error code => array( scope, needs the grace period ).
 */
function vidgalblk_feed_alert_codes() {
	return array(
		'vidgalblk_feed_no_key'         => array( 'site', false ),
		'vidgalblk_feed_key_invalid'    => array( 'site', false ),
		'vidgalblk_feed_api_disabled'   => array( 'site', false ),
		'vidgalblk_feed_key_restricted' => array( 'site', false ),
		'vidgalblk_feed_quota'          => array( 'site', false ),
		'vidgalblk_feed_not_found'      => array( 'link', false ),
		'vidgalblk_feed_network'        => array( 'link', true ),
		'vidgalblk_feed_api_error'      => array( 'link', true ),
	);
}

/**
 * The open issues.
 *
 * @return array Keyed by issue (the code, plus the link for a link's issue).
 */
function vidgalblk_feed_alerts() {
	$issues = get_option( VIDGALBLK_FEED_ALERTS_OPTION, array() );
	return is_array( $issues ) ? $issues : array();
}

/**
 * Keep the open issues. Not autoloaded: only the dashboard reads them.
 *
 * @param array $issues Issues.
 */
function vidgalblk_feed_alerts_save( $issues ) {
	if ( $issues ) {
		update_option( VIDGALBLK_FEED_ALERTS_OPTION, $issues, false );
	} else {
		delete_option( VIDGALBLK_FEED_ALERTS_OPTION );
	}
}

/**
 * Whether this request is the live site, not the editor previewing a link.
 *
 * @return bool
 */
function vidgalblk_feed_alerts_live_request() {
	return ! ( defined( 'REST_REQUEST' ) && REST_REQUEST );
}

/**
 * Note a failed fetch.
 *
 * @param WP_Error $error What went wrong.
 * @param string   $url   The feed's link.
 */
function vidgalblk_feed_alert_record( $error, $url ) {
	$codes = vidgalblk_feed_alert_codes();
	$code  = $error->get_error_code();

	if ( ! isset( $codes[ $code ] ) || ! vidgalblk_feed_alerts_live_request() ) {
		return;
	}

	$issues = vidgalblk_feed_alerts();
	$key    = 'site' === $codes[ $code ][0] ? $code : $code . '|' . $url;
	$now    = time();
	$issue  = $issues[ $key ] ?? array(
		'code'  => $code,
		'first' => $now,
		'links' => array(),
	);

	$issue['message'] = $error->get_error_message();
	$issue['last']    = $now;
	$issue['count']   = (int) ( $issue['count'] ?? 0 ) + 1;
	// Which links it stopped, and a page it showed on, to point at.
	$issue['links'][ $url ] = $now;
	if ( count( $issue['links'] ) > 10 ) {
		arsort( $issue['links'] );
		$issue['links'] = array_slice( $issue['links'], 0, 10, true );
	}
	if ( ! wp_doing_cron() && ! is_admin() && isset( $_SERVER['REQUEST_URI'] ) ) {
		// REQUEST_URI already holds the folder WordPress lives in, which
		// home_url() would add a second time.
		$request = esc_url_raw( wp_unslash( $_SERVER['REQUEST_URI'] ) );
		$folder  = untrailingslashit( (string) wp_parse_url( home_url(), PHP_URL_PATH ) );
		if ( '' !== $folder && 0 === strpos( $request, $folder . '/' ) ) {
			$request = substr( $request, strlen( $folder ) );
		}
		$issue['page'] = home_url( $request );
	}

	$issues[ $key ] = $issue;
	vidgalblk_feed_alerts_save( $issues );

	if ( vidgalblk_feed_alert_shown( $issue ) ) {
		vidgalblk_feed_alert_email( $key, $issue );
	}
}

/**
 * A link loaded again: whatever was wrong with it, or with the whole
 * connection, is over.
 *
 * @param string $url The feed's link.
 */
function vidgalblk_feed_alert_clear( $url ) {
	$issues = vidgalblk_feed_alerts();
	if ( ! $issues ) {
		return;
	}

	$codes = vidgalblk_feed_alert_codes();
	$left  = array();
	foreach ( $issues as $key => $issue ) {
		$site = 'site' === ( $codes[ $issue['code'] ?? '' ][0] ?? '' );
		// The connection works again only if this link is YouTube's, as the
		// key's issues are.
		$fixed = $site
			? false === stripos( $url, 'vimeo.' )
			: isset( $issue['links'][ $url ] );
		// And nothing has been seen of it for a week: that feed is gone.
		$old = (int) ( $issue['last'] ?? 0 ) < time() - WEEK_IN_SECONDS;
		if ( ! $fixed && ! $old ) {
			$left[ $key ] = $issue;
		}
	}

	if ( count( $left ) !== count( $issues ) ) {
		vidgalblk_feed_alerts_save( $left );
	}
}

/**
 * Whether an issue is worth telling anyone about yet: a network hiccup only
 * once it has lasted a while, everything else straight away.
 *
 * @param array $issue Issue.
 * @return bool
 */
function vidgalblk_feed_alert_shown( $issue ) {
	$codes = vidgalblk_feed_alert_codes();
	$grace = ! empty( $codes[ $issue['code'] ?? '' ][1] );

	return ! $grace || (int) $issue['last'] - (int) $issue['first'] >= VIDGALBLK_FEED_ALERTS_GRACE;
}

/**
 * The issues to show, worst first: the whole connection before single links.
 *
 * @return array
 */
function vidgalblk_feed_alerts_open() {
	$codes  = vidgalblk_feed_alert_codes();
	$issues = array_filter(
		vidgalblk_feed_alerts(),
		function ( $issue ) {
			return (int) ( $issue['last'] ?? 0 ) >= time() - WEEK_IN_SECONDS && vidgalblk_feed_alert_shown( $issue );
		}
	);

	uasort(
		$issues,
		function ( $a, $b ) use ( $codes ) {
			$sa = 'site' === ( $codes[ $a['code'] ][0] ?? '' ) ? 0 : 1;
			$sb = 'site' === ( $codes[ $b['code'] ][0] ?? '' ) ? 0 : 1;
			return $sa <=> $sb ?: (int) $b['last'] <=> (int) $a['last'];
		}
	);

	return $issues;
}

/**
 * Email the site's administrator about an issue, if they asked for emails:
 * once per issue, and again only if it is still open a day later.
 *
 * @param string $key   Issue key.
 * @param array  $issue Issue.
 */
function vidgalblk_feed_alert_email( $key, $issue ) {
	if ( ! get_option( VIDGALBLK_FEED_ALERTS_EMAIL_OPTION ) ) {
		return;
	}
	if ( ! empty( $issue['mailed'] ) && (int) $issue['mailed'] > time() - DAY_IN_SECONDS ) {
		return;
	}

	$issues                    = vidgalblk_feed_alerts();
	$issues[ $key ]['mailed'] = time();
	vidgalblk_feed_alerts_save( $issues );

	$lines = array(
		__( 'A video feed on your site has stopped updating.', 'video-gallery-block' ),
		'',
		$issue['message'],
		'',
		__( 'Affected links:', 'video-gallery-block' ) . ' ' . implode( ', ', array_keys( (array) $issue['links'] ) ),
	);
	if ( ! empty( $issue['page'] ) ) {
		$lines[] = __( 'Seen on:', 'video-gallery-block' ) . ' ' . $issue['page'];
	}
	$lines[] = '';
	$lines[] = __( 'Your galleries keep showing the videos they already have, so nothing looks broken to visitors -- but new uploads will not appear until this is fixed.', 'video-gallery-block' );
	$lines[] = '';
	$lines[] = __( 'Turn these emails off from the notice in your dashboard:', 'video-gallery-block' ) . ' ' . admin_url();

	wp_mail(
		get_option( 'admin_email' ),
		sprintf(
			/* translators: %s: site name. */
			__( '[%s] Video Gallery: a video feed needs attention', 'video-gallery-block' ),
			wp_specialchars_decode( get_option( 'blogname' ), ENT_QUOTES )
		),
		implode( "\n", $lines )
	);
}

add_action(
	'vidgalblk_feed_fetch_failed',
	'vidgalblk_feed_alert_record',
	10,
	2
);

add_action( 'vidgalblk_feed_fetch_ok', 'vidgalblk_feed_alert_clear' );

// A new key (or none) changes everything about the connection: start afresh.
foreach ( array( 'add_option_vidgalblk_youtube_api_key', 'update_option_vidgalblk_youtube_api_key', 'delete_option_vidgalblk_youtube_api_key' ) as $vidgalblk_feed_alert_hook ) {
	add_action(
		$vidgalblk_feed_alert_hook,
		function () {
			$codes = vidgalblk_feed_alert_codes();
			vidgalblk_feed_alerts_save(
				array_filter(
					vidgalblk_feed_alerts(),
					function ( $issue ) use ( $codes ) {
						return 'site' !== ( $codes[ $issue['code'] ?? '' ][0] ?? '' );
					}
				)
			);
		}
	);
}
unset( $vidgalblk_feed_alert_hook );

/*
 * The dashboard notice.
 */

/**
 * Whether the notice belongs on the current screen: the Dashboard, Plugins
 * and the plugin's own pages -- not every admin page.
 *
 * @return bool
 */
function vidgalblk_feed_alerts_screen() {
	$screen = function_exists( 'get_current_screen' ) ? get_current_screen() : null;
	if ( ! $screen ) {
		return false;
	}

	return in_array( $screen->id, array( 'dashboard', 'plugins' ), true )
		|| 'video-gallery-block' === $screen->post_type;
}

/**
 * What the open issues add up to, so a dismissal lasts until something new
 * goes wrong.
 *
 * @param array $issues Open issues.
 * @return string
 */
function vidgalblk_feed_alerts_signature( $issues ) {
	return md5( implode( ',', array_keys( $issues ) ) );
}

add_action(
	'admin_init',
	function () {
		if ( empty( $_GET['vidgalblk_feed_alerts'] ) || ! current_user_can( 'manage_options' ) ) {
			return;
		}
		check_admin_referer( 'vidgalblk_feed_alerts' );

		$action = sanitize_key( wp_unslash( $_GET['vidgalblk_feed_alerts'] ) );
		if ( 'hide' === $action ) {
			update_user_meta(
				get_current_user_id(),
				'vidgalblk_feed_alerts_hidden',
				array(
					'signature' => vidgalblk_feed_alerts_signature( vidgalblk_feed_alerts_open() ),
					'until'     => time() + DAY_IN_SECONDS,
				)
			);
		} elseif ( 'email-on' === $action ) {
			update_option( VIDGALBLK_FEED_ALERTS_EMAIL_OPTION, 1, false );
		} elseif ( 'email-off' === $action ) {
			delete_option( VIDGALBLK_FEED_ALERTS_EMAIL_OPTION );
		}

		wp_safe_redirect( remove_query_arg( array( 'vidgalblk_feed_alerts', '_wpnonce' ) ) );
		exit;
	}
);

add_action(
	'admin_notices',
	function () {
		if ( ! current_user_can( 'manage_options' ) || ! vidgalblk_feed_alerts_screen() ) {
			return;
		}

		$issues = vidgalblk_feed_alerts_open();
		if ( ! $issues ) {
			return;
		}

		$hidden = get_user_meta( get_current_user_id(), 'vidgalblk_feed_alerts_hidden', true );
		if ( is_array( $hidden )
			&& vidgalblk_feed_alerts_signature( $issues ) === ( $hidden['signature'] ?? '' )
			&& (int) ( $hidden['until'] ?? 0 ) > time() ) {
			return;
		}

		$link  = function ( $action ) {
			return wp_nonce_url( add_query_arg( 'vidgalblk_feed_alerts', $action ), 'vidgalblk_feed_alerts' );
		};
		$email = (bool) get_option( VIDGALBLK_FEED_ALERTS_EMAIL_OPTION );
		?>
		<div class="notice notice-error vgb-feed-alert">
			<p>
				<strong><?php esc_html_e( 'Video Gallery: a video feed has stopped updating.', 'video-gallery-block' ); ?></strong>
				<?php esc_html_e( 'Your galleries still show the videos they already have, so visitors see nothing wrong -- but new uploads will not appear until this is fixed.', 'video-gallery-block' ); ?>
			</p>
			<ul style="list-style:disc;margin-left:1.5em">
				<?php foreach ( $issues as $issue ) : ?>
					<li>
						<?php echo esc_html( $issue['message'] ); ?>
						<br />
						<small>
							<?php
							$urls = array_keys( (array) $issue['links'] );
							echo esc_html(
								sprintf(
									/* translators: %s: links. */
									_n( 'Link: %s', 'Links: %s', count( $urls ), 'video-gallery-block' ),
									implode( ', ', $urls )
								)
							);
							if ( ! empty( $issue['page'] ) ) {
								echo ' &middot; ';
								printf(
									/* translators: %s: page link. */
									esc_html__( 'Seen on %s', 'video-gallery-block' ),
									'<a href="' . esc_url( $issue['page'] ) . '" target="_blank" rel="noopener">' . esc_html( wp_parse_url( $issue['page'], PHP_URL_PATH ) ?: '/' ) . '</a>'
								);
							}
							echo ' &middot; ';
							echo esc_html(
								sprintf(
									/* translators: %s: how long ago, e.g. "2 hours". */
									__( 'Since %s ago', 'video-gallery-block' ),
									human_time_diff( (int) $issue['first'] )
								)
							);
							?>
						</small>
					</li>
				<?php endforeach; ?>
			</ul>
			<?php
			$codes = vidgalblk_feed_alert_codes();
			if ( array_filter( $issues, function ( $issue ) use ( $codes ) { return 'site' === ( $codes[ $issue['code'] ][0] ?? '' ); } ) ) :
				?>
				<p>
					<?php esc_html_e( 'Where to fix the YouTube connection: edit any page with a video feed, select the block, then open Video Source → Connect YouTube and click Change key.', 'video-gallery-block' ); ?>
				</p>
			<?php endif; ?>
			<p>
				<?php esc_html_e( 'This notice goes away by itself once the feeds load again.', 'video-gallery-block' ); ?>
				<a href="<?php echo esc_url( $link( 'hide' ) ); ?>"><?php esc_html_e( 'Hide for a day', 'video-gallery-block' ); ?></a>
				&middot;
				<?php if ( $email ) : ?>
					<a href="<?php echo esc_url( $link( 'email-off' ) ); ?>"><?php esc_html_e( 'Stop emailing me about feed problems', 'video-gallery-block' ); ?></a>
				<?php else : ?>
					<a href="<?php echo esc_url( $link( 'email-on' ) ); ?>"><?php esc_html_e( 'Email me about feed problems', 'video-gallery-block' ); ?></a>
				<?php endif; ?>
			</p>
		</div>
		<?php
	}
);
