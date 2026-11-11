import { __ } from "@wordpress/i18n";
import {
  PanelBody,
  __experimentalToggleGroupControl as ToggleGroupControl,
  __experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from "@wordpress/components";

import { animationOf } from "../../../utils/animation";

/**
 * Style tab: how the thumbnails move on hover. Off unless chosen.
 */
const AnimationPanel = ({ attributes, setAttributes }) => {
  const { hover, speed } = animationOf(attributes);
  const set = (key, val) =>
    setAttributes({ animation: { ...(attributes.animation || {}), [key]: val } });

  return (
    <PanelBody className="bPlPanelBody vgbPanel" title={__("Animation", "video-gallery-block")} initialOpen={false}>
      <div className="vgbToggleGroupWrap">
        <ToggleGroupControl
          label={__("Hover effect", "video-gallery-block")}
          value={hover}
          onChange={(val) => set("hover", val || "none")}
          isBlock
          __nextHasNoMarginBottom
          help={
            "zoom" === hover
              ? __("The picture grows a little inside its tile.", "video-gallery-block")
              : __("The thumbnails stay still.", "video-gallery-block")
          }>
          <ToggleGroupControlOption value="none" label={__("None", "video-gallery-block")} />
          <ToggleGroupControlOption value="zoom" label={__("Zoom", "video-gallery-block")} />
        </ToggleGroupControl>
      </div>

      {"none" !== hover && (
        <div className="vgbToggleGroupWrap mt20">
          <ToggleGroupControl
            label={__("Speed", "video-gallery-block")}
            value={speed}
            onChange={(val) => set("speed", val || "normal")}
            isBlock
            __nextHasNoMarginBottom
            help={__(
              "Visitors who turned on “reduce motion” on their device see no movement.",
              "video-gallery-block",
            )}>
            <ToggleGroupControlOption value="slow" label={__("Slow", "video-gallery-block")} />
            <ToggleGroupControlOption value="normal" label={__("Normal", "video-gallery-block")} />
            <ToggleGroupControlOption value="fast" label={__("Fast", "video-gallery-block")} />
          </ToggleGroupControl>
        </div>
      )}
    </PanelBody>
  );
};

export default AnimationPanel;
