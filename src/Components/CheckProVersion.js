import { Button } from "@wordpress/components";
import "./Styles.scss";

const CheckProVersion = () => {
  return (
    <div className="bplg-card">
      <div className="bplg-card-head">
        <div>
          <h2>Go Pro and unlock 8 premium blocks</h2>
          <p>
            Video Gallery Block Pro gives you more layouts, more controls, and
            more ways to build beautiful galleries that match your brand —
            without writing CSS.
          </p>
        </div>
        <div className="bplg-badge">PRO ✨ 8 New Blocks</div>
      </div>

      <div className="bplg-card-body">
        <div className="bplg-feature-grid">
          <div className="bplg-feature">
            <div className="bplg-ico">▦</div>
            <div>
              <h3>More layouts & blocks</h3>
              <p>
                Build grids, modern galleries, and more with 8 powerful Pro
                blocks.
              </p>
            </div>
          </div>

          <div className="bplg-feature">
            <div className="bplg-ico">🎛</div>
            <div>
              <h3>Advanced styling controls</h3>
              <p>
                Fine-tune spacing, columns, typography, hover effects, and
                overlays.
              </p>
            </div>
          </div>

          <div className="bplg-feature">
            <div className="bplg-ico">🖼</div>
            <div>
              <h3>Better thumbnails & UI</h3>
              <p>
                Enhanced thumbnail options, play icons, and cleaner viewer
                experience.
              </p>
            </div>
          </div>

          <div className="bplg-feature">
            <div className="bplg-ico">⚡</div>
            <div>
              <h3>Optimized & responsive</h3>
              <p>
                Designed to look great on mobile and keep pages fast and smooth.
              </p>
            </div>
          </div>

          <div className="bplg-feature">
            <div className="bplg-ico">🔄</div>
            <div>
              <h3>Multiple video sources</h3>
              <p>
                Use YouTube, Vimeo, or self-hosted videos together in one
                gallery.
              </p>
            </div>
          </div>

          <div className="bplg-feature">
            <div className="bplg-ico">🧩</div>
            <div>
              <h3>Block patterns ready</h3>
              <p>Insert pre-designed video gallery layouts with one click.</p>
            </div>
          </div>
        </div>

        <div className="bplg-mini">
          <span className="bplg-pill">
            <span className="bplg-dot"></span> 15-day money-back guarantee
          </span>
          <span className="bplg-pill">
            <span className="bplg-dot bplg-dot-warn"></span> Priority support
          </span>
          <span className="bplg-pill">No coding required</span>
        </div>

        <div className="bplg-actions">
          <Button
            className="bplg-btn bplg-btn-primary"
            href="edit.php?post_type=video-gallery-block&page=vgb-help-demo#/pricing"
            target="_blank">
            Upgrade to Pro
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckProVersion;
