import { __ } from "@wordpress/i18n";
import {
  PanelBody,
  __experimentalNumberControl as NumberControl,
  __experimentalToggleGroupControl as ToggleGroupControl,
} from "@wordpress/components";

import AlignOptions from "./AlignOptions";

import { ColorsControl, Typography } from "../../../../../../../bpl-tools/Components";
import { SpaceControl } from "../../../../../../../bpl-tools/Components/Deprecated";

const pxSuffix = <span className="vgbUnit">px</span>;

/**
 * Style tab: the Load More button's own look. Every value starts from what it
 * looks like now (the filter buttons' typography and colors), and is only
 * saved once changed, so nothing moves until then.
 */
const LoadMoreStylePanel = ({ attributes, setAttributes }) => {
  const style = attributes.loadMoreStyle || {};
  const set = (key, val) => setAttributes({ loadMoreStyle: { ...style, [key]: val } });

  return (
    <PanelBody
      className="bPlPanelBody vgbPanel"
      title={__("Load more button", "video-gallery-block")}
      initialOpen={false}>
      <Typography
        label={__("Typography", "video-gallery-block")}
        value={style.typo || attributes.filterBtnTypo}
        onChange={(val) => set("typo", val)}
        defaults={{ fontSize: { desktop: 14, tablet: 14, mobile: 14 } }}
      />

      <ColorsControl
        label={__("Colors", "video-gallery-block")}
        value={style.colors || attributes.filterBtnColors}
        onChange={(val) => set("colors", val)}
        defaults={{ color: "#fff", bg: "#146ef5" }}
      />

      <ColorsControl
        label={__("Hover colors", "video-gallery-block")}
        value={style.hoverColors || attributes.filterBtnHoverColors}
        onChange={(val) => set("hoverColors", val)}
        defaults={{ color: "#fff", bg: "#ff7a00" }}
      />

      <SpaceControl
        label={__("Padding", "video-gallery-block")}
        value={style.padding || { vertical: "10px", horizontal: "20px" }}
        onChange={(val) => set("padding", val)}
        defaults={{ vertical: "10px", horizontal: "20px" }}
      />

      <NumberControl
        className="vgbInlineNumber"
        label={__("Corner radius", "video-gallery-block")}
        labelPosition="side"
        value={style.radius ?? 50}
        min={0}
        max={100}
        suffix={pxSuffix}
        onChange={(val) => set("radius", Math.max(0, parseInt(val) || 0))}
      />

      <div className="vgbToggleGroupWrap">
        <ToggleGroupControl
          label={__("Alignment", "video-gallery-block")}
          value={style.align || "center"}
          onChange={(val) => set("align", val || "center")}
          isBlock
          __nextHasNoMarginBottom>
          <AlignOptions
            options={[
              { value: "left", label: __("Left", "video-gallery-block") },
              { value: "center", label: __("Center", "video-gallery-block") },
              { value: "right", label: __("Right", "video-gallery-block") },
              { value: "full", label: __("Full width", "video-gallery-block") },
            ]}
          />
        </ToggleGroupControl>
      </div>

      <NumberControl
        className="vgbInlineNumber"
        label={__("Space above", "video-gallery-block")}
        labelPosition="side"
        value={style.spaceAbove ?? 20}
        min={0}
        max={200}
        suffix={pxSuffix}
        onChange={(val) => set("spaceAbove", Math.max(0, parseInt(val) || 0))}
      />
    </PanelBody>
  );
};

export default LoadMoreStylePanel;
