import { __ } from "@wordpress/i18n";
import { withSelect, withDispatch } from "@wordpress/data";
import { compose } from "@wordpress/compose";
import { BlockControls, InspectorControls } from "@wordpress/block-editor";
import {
  TabPanel,
  PanelBody,
  PanelRow,
  TextControl,
  RangeControl,
  __experimentalUnitControl as UnitControl,
  __experimentalNumberControl as NumberControl,
  __experimentalToggleGroupControl as ToggleGroupControl,
  __experimentalToggleGroupControlOption as ToggleGroupControlOption,
  Tooltip,
  Button,
  Dashicon,
  ToolbarGroup,
  ToolbarButton,
  ToggleControl,
} from "@wordpress/components";

import {
  Label,
  Background,
  Device,
  ColorsControl,
  HelpPanel,
  Typography,
  ShadowControl,
  ItemsPanel,
} from "../../../../../../../bpl-tools/Components";
import {
  BorderControl,
  SpaceControl,
} from "../../../../../../../bpl-tools/Components/Deprecated";
import {
  pxUnit,
  perUnit,
  emUnit,
} from "../../../../../../../bpl-tools/utils/options";

import {
  generalStyleTabs,
  videoSizeOptions,
  aspectRatioOptions,
  shortsFilterOptions,
  sortOrderOptions,
  rowAlignOptions,
} from "../../../utils/options";
import ItemSettings from "./ItemSettings";
import BulkImport from "./BulkImport";
import { updateData } from "../../../../../../../bpl-tools/utils/functions";
import { AdvertiseCard } from "../../../../../../../bpl-tools/ProControls";
import { pricingUrl } from "../../../utils/data";
import LivePreview from "./LivePreview";

const Settings = ({
  attributes,
  setAttributes,
  activeIndex,
  setActiveIndex,
  device,
  setDevice,
}) => {
  const {
    albums,
    videos,
    columns,
    columnGap,
    rowGap,
    columnGapResponsive,
    rowGapResponsive,
    isPopupWidthAsRatio,
    perPage,
    loadMoreLabel,
    filter = { show: true, commonLabel: "All Videos" },
    background,
    padding,
    border,
    shadow,
    filterBtnTypo,
    filterBtnColors,
    filterBtnHoverColors,
    playIconColors,
    playIconSize,
    playIconHoverScale,
    itemHeight,
    itemBorder,
    itemShadow,
    aspectRatio,
    options,
    styles,
  } = attributes;

  const currentDevice = (device || "desktop").toLowerCase();
  const columnsObj =
    typeof columns === "number"
      ? { desktop: columns, tablet: Math.max(1, columns - 1), mobile: 1 }
      : { desktop: 3, tablet: 2, mobile: 1, ...(columns || {}) };

  /*
   * `columnGap`/`rowGap` are the original single-number attributes, left
   * untouched -- see `feedback_block_json_additive_only`: retyping them
   * would make WordPress silently discard a customized value on every load.
   * `columnGapResponsive`/`rowGapResponsive` are the new per-device
   * attributes this panel actually writes to now. Shown here is whichever
   * one is actually in effect (mirrors `layoutVars()` in Style.js), so a
   * gallery that still carries a legacy customized number displays it
   * instead of silently showing the new default.
   */
  const toDeviceGap = (legacyValue, responsiveValue) => {
    const isResponsiveCustomized =
      responsiveValue &&
      (responsiveValue.desktop !== 10 || responsiveValue.tablet !== 10 || responsiveValue.mobile !== 10);
    if (isResponsiveCustomized) {
      return { desktop: 10, tablet: 10, mobile: 10, ...responsiveValue };
    }
    if (typeof legacyValue === "number" && legacyValue !== 10) {
      return { desktop: legacyValue, tablet: legacyValue, mobile: legacyValue };
    }
    return { desktop: 10, tablet: 10, mobile: 10, ...(responsiveValue || {}) };
  };

  const columnGapObj = toDeviceGap(columnGap, columnGapResponsive);
  const rowGapObj = toDeviceGap(rowGap, rowGapResponsive);

  const newItem = {
    video: "",
    albs: [],
  };

  const addVideo = () => {
    setAttributes({
      videos: [...videos, { ...newItem, dateAdded: Date.now() }],
    });
    setActiveIndex(videos.length);
  };

  const itemsProps = {
    attributes,
    setAttributes,
    arrKey: "videos",
    activeIndex,
    setActiveIndex,
  };

  return (
    <>
      <InspectorControls>
        <TabPanel
          className="bPlTabPanel"
          activeClass="activeTab"
          tabs={generalStyleTabs}>
          {(tab) => (
            <>
              {"general" === tab.name && (
                <>
                  <HelpPanel
                    slug="video-gallery-block"
                    docsLink="https://bblockswp.com/docs/video-gallery-block"
                  />

                  {/* {isGalleryPostType && (
                    <div className="bPlInspectorInfo">
                      <FrontShortCode
                        postType={currentPostType}
                        shortCode={`[video_gallery id=${currentPostId}]`}
                        stacked={true}
                      />
                    </div>
                  )} */}

                  <PanelBody
                    className="bPlPanelBody addRemoveItems"
                    title={__("Add or Remove Albums", "video-gallery-block")}>
                    {albums.map((album, index) => (
                      <PanelRow key={index}>
                        <Label className="">
                          {__(`Al ${index + 1}:`, "video-gallery-block")}
                        </Label>
                        <TextControl
                          value={album}
                          onChange={(val) => {
                            const newAlbums = [...albums];
                            newAlbums[index] = val;
                            setAttributes({ albums: newAlbums });
                          }}
                        />

                        <Tooltip
                          text={__("Remove this album", "video-gallery-block")}
                          placement="top"
                          position="top">
                          <Button
                            className="removeAlbum"
                            onClick={(e) => {
                              e.preventDefault();
                              setAttributes({
                                albums: [
                                  ...albums.slice(0, index),
                                  ...albums.slice(index + 1),
                                ],
                              });
                            }}>
                            <Dashicon icon="no" />
                          </Button>
                        </Tooltip>
                      </PanelRow>
                    ))}

                    <div className="addItem mt15">
                      <Button
                        label={__("Add New Album", "video-gallery-block")}
                        onClick={() =>
                          setAttributes({ albums: [...albums, ""] })
                        }>
                        <Dashicon icon="plus" />
                        {__("Add New Album", "video-gallery-block")}
                      </Button>
                    </div>
                  </PanelBody>

                  <PanelBody
                    className="bPlPanelBody"
                    title={__("Import Videos", "video-gallery-block")}
                    initialOpen={false}>
                    <BulkImport
                      attributes={attributes}
                      setAttributes={setAttributes}
                      setActiveIndex={setActiveIndex}
                    />
                  </PanelBody>

                  <PanelBody
                    className="bPlPanelBody"
                    title={__("Videos", "video-gallery-block")}>
                    <ItemsPanel
                      {...itemsProps}
                      newItem={newItem}
                      ItemSettings={ItemSettings}
                      itemLabel="Video"
                      design="single"
                    />
                  </PanelBody>

                  <PanelBody
                    className="bPlPanelBody"
                    title={__("Layout Settings", "video-gallery-block")}
                    initialOpen={false}>
                    <PanelRow>
                      <Label className="mb5">
                        {__("Columns:", "video-gallery-block")}
                      </Label>
                      <Device device={currentDevice} setDevice={setDevice} />
                    </PanelRow>
                    <RangeControl
                      value={columnsObj[currentDevice] ?? 3}
                      onChange={(val) => {
                        setAttributes({
                          columns: {
                            ...columnsObj,
                            [currentDevice]: parseInt(val) || 1,
                          },
                        });
                      }}
                      min={1}
                      max={6}
                      step={1}
                      beforeIcon="grid-view"
                    />

                    <NumberControl
                      className="mt20"
                      label={__("Column Gap:", "video-gallery-block")}
                      labelPosition="left"
                      value={columnGapObj[currentDevice] ?? 10}
                      onChange={(val) =>
                        setAttributes({
                          columnGapResponsive: {
                            ...columnGapObj,
                            [currentDevice]: Math.max(0, parseInt(val) || 0),
                          },
                        })
                      }
                      help={__(
                        "Follows the Desktop/Tablet/Mobile switch above.",
                        "video-gallery-block",
                      )}
                    />

                    <NumberControl
                      className="mt20"
                      label={__("Row Gap:", "video-gallery-block")}
                      labelPosition="left"
                      value={rowGapObj[currentDevice] ?? 10}
                      onChange={(val) =>
                        setAttributes({
                          rowGapResponsive: {
                            ...rowGapObj,
                            [currentDevice]: Math.max(0, parseInt(val) || 0),
                          },
                        })
                      }
                    />

                    <ToggleGroupControl
                      className="mt20"
                      label={__("Row Alignment:", "video-gallery-block")}
                      value={options?.rowAlign || "center"}
                      onChange={(val) =>
                        setAttributes({
                          options: updateData(
                            options,
                            val ?? "center",
                            "rowAlign",
                          ),
                        })
                      }
                      isBlock
                      __nextHasNoMarginBottom
                      help={__(
                        "Only visible when the video count doesn't divide evenly into the column count -- where the last, incomplete row sits.",
                        "video-gallery-block",
                      )}>
                      {rowAlignOptions.map((option) => (
                        <ToggleGroupControlOption
                          key={option.value}
                          value={option.value}
                          label={option.label}
                        />
                      ))}
                    </ToggleGroupControl>

                    <ToggleControl
                      className="mt20"
                      label={__(
                        "Popup video width as aspect ratio",
                        "video-gallery-block",
                      )}
                      checked={isPopupWidthAsRatio}
                      onChange={(val) =>
                        setAttributes({ isPopupWidthAsRatio: val })
                      }
                    />

                    <ToggleGroupControl
                      className="mt20"
                      label={__("Sort Order:", "video-gallery-block")}
                      value={options?.sortOrder || "manual"}
                      onChange={(val) =>
                        setAttributes({
                          options: updateData(
                            options,
                            val ?? "manual",
                            "sortOrder",
                          ),
                        })
                      }
                      isBlock
                      __nextHasNoMarginBottom
                      help={__(
                        "Manual keeps the order videos were added in. Videos added before this option existed count as the oldest.",
                        "video-gallery-block",
                      )}>
                      {sortOrderOptions.map((option) => (
                        <ToggleGroupControlOption
                          key={option.value}
                          value={option.value}
                          label={option.label}
                        />
                      ))}
                    </ToggleGroupControl>

                    <NumberControl
                      className="mt20"
                      label={__("Videos Per Page:", "video-gallery-block")}
                      labelPosition="left"
                      value={perPage || 0}
                      min={0}
                      onChange={(val) =>
                        setAttributes({ perPage: Math.max(0, parseInt(val) || 0) })
                      }
                      help={__(
                        "0 shows every video, otherwise this many show first with a Load More button for the rest.",
                        "video-gallery-block",
                      )}
                    />

                    {perPage > 0 && (
                      <TextControl
                        className="mt20"
                        label={__("Load More Button Text:", "video-gallery-block")}
                        labelPosition="left"
                        value={loadMoreLabel}
                        onChange={(val) => setAttributes({ loadMoreLabel: val })}
                      />
                    )}
                  </PanelBody>

                  <PanelBody
                    className="bPlPanelBody"
                    title={__("Filter", "video-gallery-block")}
                    initialOpen={false}>
                    <ToggleControl
                      label={__("Show Filter Bar", "video-gallery-block")}
                      checked={false !== filter?.show}
                      onChange={(val) =>
                        setAttributes({ filter: { ...filter, show: val } })
                      }
                      help={__(
                        "The filter bar only appears when the gallery has at least one album.",
                        "video-gallery-block",
                      )}
                    />

                    {false !== filter?.show && (
                      <PanelRow className="mt20">
                        <TextControl
                          label={__("Common Filter", "video-gallery-block")}
                          labelPosition="left"
                          value={filter?.commonLabel}
                          onChange={(val) =>
                            setAttributes({
                              filter: { ...filter, commonLabel: val },
                            })
                          }
                          help={__(
                            'Label for the button that shows every video, for example "All Videos".',
                            "video-gallery-block",
                          )}
                        />
                      </PanelRow>
                    )}
                  </PanelBody>

                  <PanelBody
                    className="bPlPanelBody"
                    title={__("Options", "video-gallery-block")}
                    initialOpen={false}>
                    {/*
                      WordPress's own segmented control rather than
                      BButtonGroup -- same reasons as Thumbnail Shape below:
                      BButtonGroup doesn't wrap when the label and four
                      options don't fit the inspector's width, and clicking
                      the already-selected option resets it to the default
                      instead of leaving it selected.
                    */}
                    <ToggleGroupControl
                      label={__("Poster Fit:", "video-gallery-block")}
                      value={options?.objectFit || "cover"}
                      onChange={(value) =>
                        setAttributes({
                          options: updateData(
                            options,
                            value ?? "cover",
                            "objectFit",
                          ),
                        })
                      }
                      isBlock
                      __nextHasNoMarginBottom>
                      {videoSizeOptions.map((option) => (
                        <ToggleGroupControlOption
                          key={option.value}
                          value={option.value}
                          label={option.label}
                        />
                      ))}
                    </ToggleGroupControl>

                    <ToggleControl
                      className="mt20"
                      label={__(
                        "Show Caption on Thumbnail",
                        "video-gallery-block",
                      )}
                      checked={options?.showCaptionOnThumbnail}
                      onChange={(val) =>
                        setAttributes({
                          options: updateData(
                            options,
                            val,
                            "showCaptionOnThumbnail",
                          ),
                        })
                      }
                    />

                    <ToggleControl
                      className="mt20"
                      label={__("Video SEO markup", "video-gallery-block")}
                      checked={false !== options?.videoSchema}
                      onChange={(val) =>
                        setAttributes({
                          options: updateData(options, val, "videoSchema"),
                        })
                      }
                      help={__(
                        "Adds video schema markup for search results. Turn off if your SEO plugin already does it.",
                        "video-gallery-block",
                      )}
                    />

                    <ToggleGroupControl
                      className="mt20 vgbShortsFilterToggle"
                      label={__("YouTube Shorts:", "video-gallery-block")}
                      value={options?.shortsFilter || "all"}
                      onChange={(val) =>
                        setAttributes({
                          options: updateData(
                            options,
                            val ?? "all",
                            "shortsFilter",
                          ),
                        })
                      }
                      isBlock
                      __nextHasNoMarginBottom
                      help={__(
                        "Detected by the link itself, not by watching each video, so this works without an API key.",
                        "video-gallery-block",
                      )}>
                      {shortsFilterOptions.map((option) => (
                        <ToggleGroupControlOption
                          key={option.value}
                          value={option.value}
                          label={option.label}
                        />
                      ))}
                    </ToggleGroupControl>

                    <ToggleControl
                      className="mt20"
                      label={__("Show Play Icon on Thumbnail", "video-gallery-block")}
                      checked={false !== options?.showPlayIcon}
                      onChange={(val) =>
                        setAttributes({
                          options: updateData(options, val, "showPlayIcon"),
                        })
                      }
                      help={__(
                        "A small play icon over each thumbnail, so it reads as a video before anyone hovers or clicks it.",
                        "video-gallery-block",
                      )}
                    />

                    <ToggleControl
                      className="mt20"
                      label={__(
                        "Require Consent Before Playing",
                        "video-gallery-block",
                      )}
                      checked={!!options?.consentGate}
                      onChange={(val) =>
                        setAttributes({
                          options: updateData(options, val, "consentGate"),
                        })
                      }
                      help={__(
                        "Shows who the video is hosted by and asks before loading their player, so YouTube or Vimeo sets no cookies until a visitor agrees.",
                        "video-gallery-block",
                      )}
                    />

                    <ToggleControl
                      className="mt20"
                      label={__(
                        "Send Video Play Events to Google Analytics",
                        "video-gallery-block",
                      )}
                      checked={!!options?.gaTracking}
                      onChange={(val) =>
                        setAttributes({
                          options: updateData(options, val, "gaTracking"),
                        })
                      }
                      help={__(
                        "Pushes a video_start event (title, provider, URL) to window.dataLayer when a visitor opens a video -- works with GA4 or Google Tag Manager already on the site, nothing extra to set up.",
                        "video-gallery-block",
                      )}
                    />
                  </PanelBody>
                </>
              )}

              {"style" === tab.name && (
                <>
                  <PanelBody
                    className="bPlPanelBody"
                    title={__("Gallery", "video-gallery-block")}>
                    <Background
                      label={__("Background:", "video-gallery-block")}
                      value={background}
                      onChange={(val) => setAttributes({ background: val })}
                      defaults={{ color: "#fff" }}
                    />

                    <SpaceControl
                      className="mt20"
                      label={__("Padding:", "video-gallery-block")}
                      value={padding}
                      onChange={(val) => setAttributes({ padding: val })}
                      defaults={{ vertical: "10px", horizontal: "10px" }}
                    />

                    <BorderControl
                      className="mt20"
                      label={__("Border:", "video-gallery-block")}
                      value={border}
                      onChange={(val) => setAttributes({ border: val })}
                      defaults={{ radius: "5px" }}
                    />

                    <ShadowControl
                      className="mt20"
                      label={__("Shadow:", "video-gallery-block")}
                      value={shadow}
                      onChange={(val) => setAttributes({ shadow: val })}
                      defaults={[
                        {
                          hOffset: "0px",
                          vOffset: "25px",
                          blur: "30px",
                          spreed: "-20px",
                          color: "#0003",
                        },
                      ]}
                    />
                  </PanelBody>

                  <PanelBody
                    className="bPlPanelBody"
                    title={__("Filter", "video-gallery-block")}
                    initialOpen={false}>
                    <Typography
                      label={__("Button Typography:", "video-gallery-block")}
                      value={filterBtnTypo}
                      onChange={(val) => setAttributes({ filterBtnTypo: val })}
                      defaults={{
                        fontSize: { desktop: 14, tablet: 14, mobile: 14 },
                      }}
                    />

                    <ColorsControl
                      label={__("Button Colors", "video-gallery-block")}
                      value={filterBtnColors}
                      onChange={(val) =>
                        setAttributes({ filterBtnColors: val })
                      }
                      defaults={{ color: "#fff", bg: "#146ef5" }}
                    />

                    <ColorsControl
                      label={__(
                        "Button Hover/Active Colors",
                        "video-gallery-block",
                      )}
                      value={filterBtnHoverColors}
                      onChange={(val) =>
                        setAttributes({ filterBtnHoverColors: val })
                      }
                      defaults={{ color: "#fff", bg: "#ff7a00" }}
                    />
                  </PanelBody>

                  <PanelBody
                    className="bPlPanelBody"
                    title={__("Item", "video-gallery-block")}
                    initialOpen={false}>
                    {/*
                      WordPress's own segmented control rather than
                      BButtonGroup, for two reasons.

                      It puts its label above the options and gives each an
                      equal share of the width. BButtonGroup lays label and
                      buttons out on one line and never wraps, so five options
                      did not fit the 246px inspector: the label was squeezed
                      to 61px and wrapped to two lines, the buttons still
                      overflowed it by 6px, and the selected one rendered as a
                      circle sitting on top of the label text.

                      And clicking the option that is already selected leaves
                      it selected. BButtonGroup treats a second click as
                      "deselect" and falls back to its defaultValue, so
                      clicking 16:9 twice silently reset the gallery to a fixed
                      height.
                    */}
                    <ToggleGroupControl
                      label={__("Thumbnail Shape:", "video-gallery-block")}
                      value={aspectRatio || ""}
                      onChange={(val) =>
                        setAttributes({ aspectRatio: val ?? "" })
                      }
                      isBlock
                      __nextHasNoMarginBottom
                      help={__(
                        "Tiles keep this shape on every screen. Choose Fixed to set a height in pixels instead.",
                        "video-gallery-block",
                      )}>
                      {aspectRatioOptions.map((option) => (
                        <ToggleGroupControlOption
                          key={option.value}
                          value={option.value}
                          label={option.label}
                        />
                      ))}
                    </ToggleGroupControl>

                    {/*
                      Only one of the two sizes a tile: a ratio makes the
                      height meaningless, so the height control goes away
                      rather than sitting there doing nothing. Galleries built
                      before this option existed keep their fixed height,
                      because "" is the default.
                    */}
                    {!aspectRatio && (
                      <UnitControl
                        className="mt20"
                        label={__("Height:", "video-gallery-block")}
                        labelPosition="left"
                        value={itemHeight}
                        onChange={(val) => setAttributes({ itemHeight: val })}
                        units={[pxUnit(), perUnit(), emUnit()]}
                      />
                    )}

                    <BorderControl
                      className="mt20"
                      label={__("Item Border:", "video-gallery-block")}
                      labelPosition="left"
                      value={itemBorder}
                      onChange={(val) => setAttributes({ itemBorder: val })}
                    />

                    <ShadowControl
                      className="mt20"
                      label={__("Item Shadow:", "video-gallery-block")}
                      labelPosition="left"
                      value={itemShadow}
                      onChange={(val) => setAttributes({ itemShadow: val })}
                    />

                    <Typography
                      label={__("Caption Typography:", "video-gallery-block")}
                      labelPosition="left"
                      className="mt20"
                      value={styles?.caption?.typography}
                      onChange={(val) =>
                        setAttributes({
                          styles: updateData(
                            styles,
                            val,
                            "caption",
                            "typography",
                          ),
                        })
                      }
                      defaults={{
                        fontSize: { desktop: 14, tablet: 14, mobile: 14 },
                      }}
                    />

                    <ColorsControl
                      label={__("Caption Colors:", "video-gallery-block")}
                      value={styles?.caption?.colors}
                      className="mt20"
                      labelPosition="left"
                      onChange={(val) =>
                        setAttributes({
                          styles: updateData(styles, val, "caption", "colors"),
                        })
                      }
                      defaults={{
                        color: "#fff",
                        bg: "rgba(0, 0, 0, 0.55)",
                      }}
                    />

                    <SpaceControl
                      label={__("Caption Padding:", "video-gallery-block")}
                      labelPosition="left"
                      className="mt20"
                      value={styles?.caption?.padding}
                      onChange={(val) =>
                        setAttributes({
                          styles: updateData(styles, val, "caption", "padding"),
                        })
                      }
                      defaults={{
                        vertical: "10px",
                        horizontal: "10px",
                      }}
                    />

                    {false !== options?.showPlayIcon && (
                      <>
                        <ColorsControl
                          label={__(
                            "Play Icon Colors:",
                            "video-gallery-block",
                          )}
                          value={playIconColors}
                          className="mt20"
                          labelPosition="left"
                          onChange={(val) =>
                            setAttributes({ playIconColors: val })
                          }
                          defaults={{
                            color: "#fff",
                            bg: "rgba(0, 0, 0, 0.55)",
                          }}
                        />

                        <NumberControl
                          className="mt20"
                          label={__("Play Icon Size:", "video-gallery-block")}
                          labelPosition="left"
                          value={playIconSize ?? 54}
                          onChange={(val) =>
                            setAttributes({
                              playIconSize: parseInt(val) || 54,
                            })
                          }
                          min={30}
                          max={100}
                        />

                        <RangeControl
                          className="mt20"
                          label={__(
                            "Play Icon Hover Zoom:",
                            "video-gallery-block",
                          )}
                          value={playIconHoverScale ?? 1.08}
                          onChange={(val) =>
                            setAttributes({
                              playIconHoverScale: val ?? 1.08,
                            })
                          }
                          min={1}
                          max={1.5}
                          step={0.01}
                          help={__(
                            "How much the icon grows when a visitor hovers the tile. 1 turns the effect off.",
                            "video-gallery-block",
                          )}
                        />
                      </>
                    )}
                  </PanelBody>

                  <PanelBody
                    className="bPlPanelBody"
                    title={__("LightBox Caption", "video-gallery-block")}
                    initialOpen={false}>
                    <Typography
                      label={__("Caption Typography:", "video-gallery-block")}
                      labelPosition="left"
                      value={styles?.lightBoxCaption?.typography}
                      onChange={(val) =>
                        setAttributes({
                          styles: updateData(
                            styles,
                            val,
                            "lightBoxCaption",
                            "typography",
                          ),
                        })
                      }
                      defaults={{
                        fontSize: { desktop: 14, tablet: 14, mobile: 14 },
                      }}
                    />

                    <ColorsControl
                      label={__("Caption Colors:", "video-gallery-block")}
                      value={styles?.lightBoxCaption?.colors}
                      className="mt20"
                      labelPosition="left"
                      onChange={(val) =>
                        setAttributes({
                          styles: updateData(
                            styles,
                            val,
                            "lightBoxCaption",
                            "colors",
                          ),
                        })
                      }
                      defaults={{
                        color: "#fff",
                        bg: "#00000000",
                      }}
                    />

                    <SpaceControl
                      label={__("Caption Padding:", "video-gallery-block")}
                      labelPosition="left"
                      className="mt20"
                      value={styles?.lightBoxCaption?.padding}
                      onChange={(val) =>
                        setAttributes({
                          styles: updateData(
                            styles,
                            val,
                            "lightBoxCaption",
                            "padding",
                          ),
                        })
                      }
                      defaults={{
                        vertical: "10px",
                        horizontal: "10px",
                      }}
                    />
                  </PanelBody>
                </>
              )}
            </>
          )}
        </TabPanel>

        <AdvertiseCard planLink={pricingUrl} />
      </InspectorControls>

      <BlockControls>
        <ToolbarGroup className="bPlToolbar">
          <ToolbarButton
            label={__("Add New Video", "video-gallery-block")}
            onClick={addVideo}>
            <Dashicon icon="plus" />
          </ToolbarButton>
        </ToolbarGroup>

        <div style={{ display: "flex", alignItems: "center" }}>
          <LivePreview isPro={false} />
        </div>
      </BlockControls>
    </>
  );
};
export default compose([
  withSelect((select) => {
    const editor = select("core/editor");
    const editPost = select("core/edit-post");
    const editSite = select("core/edit-site");

    const deviceType =
      editor?.getDeviceType?.() ||
      editor?.__experimentalGetPreviewDeviceType?.() ||
      editPost?.__experimentalGetPreviewDeviceType?.() ||
      editSite?.__experimentalGetPreviewDeviceType?.() ||
      "Desktop";

    return {
      device: (deviceType || "desktop").toLowerCase(),
    };
  }),
  withDispatch((dispatch) => {
    const editor = dispatch("core/editor");
    const editPost = dispatch("core/edit-post");
    const editSite = dispatch("core/edit-site");

    return {
      setDevice(device) {
        const setType =
          editor?.setDeviceType ||
          editor?.__experimentalSetPreviewDeviceType ||
          editPost?.__experimentalSetPreviewDeviceType ||
          editSite?.__experimentalSetPreviewDeviceType;

        if (setType) {
          setType(device);
        }
      },
    };
  }),
])(Settings);
