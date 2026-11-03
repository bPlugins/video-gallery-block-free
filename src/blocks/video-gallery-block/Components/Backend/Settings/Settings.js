import { __, sprintf } from "@wordpress/i18n";
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

import AiAssistant from "../AiAssistant";
import {
  generalStyleTabs,
  aspectRatioOptions,
  rowAlignOptions,
} from "../../../utils/options";
import ItemSettings from "./ItemSettings";
import BulkImport from "./BulkImport";
import CopyFeedButton from "./CopyFeedButton";
import FeedSource from "./FeedSource";
import { isVimeoFeedUrl } from "../../../utils/youtubeFeed";
import { getYoutubeId } from "../../../utils/functions";
import { updateData } from "../../../../../../../bpl-tools/utils/functions";
import { AdvertiseCard } from "../../../../../../../bpl-tools/ProControls";
import { pricingUrl } from "../../../utils/data";
import LivePreview from "./LivePreview";

/* Short words, so the three fit one row under "YouTube Shorts". */
const shortsChoices = [
  { value: "all", label: __("All", "video-gallery-block") },
  { value: "hide", label: __("Hide", "video-gallery-block") },
  { value: "only", label: __("Only", "video-gallery-block") },
];

const objectFitOptions = [
  { value: "cover", label: __("Cover", "video-gallery-block") },
  { value: "contain", label: __("Contain", "video-gallery-block") },
  { value: "fill", label: __("Fill", "video-gallery-block") },
  { value: "none", label: __("None", "video-gallery-block") },
];

/** "Thumbnail fit", one line per option. */
const objectFitHelp = (fit) => {
  if ("contain" === fit) {
    return __("Shows the whole picture, with bars where the shapes differ.", "video-gallery-block");
  }

  if ("fill" === fit) {
    return __("Stretches the picture to fill the thumbnail.", "video-gallery-block");
  }

  if ("none" === fit) {
    return __("Shows the picture at its own size, centred.", "video-gallery-block");
  }

  return __("Fills the thumbnail; the edges may be cropped.", "video-gallery-block");
};

/** A thin rule with a small caption, between the groups of a long panel. */
const Section = ({ children }) => (
  <div className="vgbSection" role="presentation">
    <span>{children}</span>
  </div>
);

/** "px" after a number field. */
const pxSuffix = <span className="vgbUnit">px</span>;

const Settings = ({
  attributes,
  setAttributes,
  activeIndex,
  setActiveIndex,
  device,
  setDevice,
  keyState,
  feedState,
  feedVideos,
  onMove,
  canMove,
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
    feed,
  } = attributes;

  // Videos come from a YouTube channel/playlist instead of the list below.
  const isFeed = !!feed?.enabled;
  const isVimeoFeed = isFeed && isVimeoFeedUrl(feed?.url);
  /*
   * With a feed link in place, FeedSource shows "YouTube Shorts", "Videos per
   * page" and "Load more button text" in its own step, so they are left out
   * here; a hand-made gallery has them under Display.
   */
  const feedOwnsPaging = isFeed && !!feed?.url;
  // Videos play inside their tiles; the lightbox-only settings do nothing then.
  const playInline = "inline" === options?.playMode;

  // What the thumbnails show -- decides which Style panels have anything to do.
  const showTitle = !!options?.showCaptionOnThumbnail;
  const showPlayIcon = false !== options?.showPlayIcon;
  const showFilterBar =
    !isFeed && false !== filter?.show && !!albums?.length && !!filter?.commonLabel;

  /*
   * Platform-only options are shown only where they do something. The Shorts
   * filter works on a YouTube channel feed (YouTube's own lists) and on a hand
   * list holding YouTube videos; a Vimeo feed or a YouTube playlist ignores
   * it. A value other than "All" keeps it visible regardless, so a filter
   * left on is never hidden from the person it is affecting.
   */
  const shortsFilter = options?.shortsFilter || "all";
  let shortsApplies;
  if (isFeed) {
    shortsApplies = feedState?.data
      ? !!feedState.data.shortsApplied
      : !isVimeoFeed && !/[?&]list=/.test(feed?.url || "");
  } else {
    shortsApplies = (videos || []).some((item) => !!getYoutubeId(item?.video));
  }
  const showShortsFilter = shortsApplies || (!isFeed && "all" !== shortsFilter);

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

  // "Manual" is the order the videos come in: the list's, or the feed's.
  const sortOptions = [
    {
      value: "manual",
      label: isFeed ? __("Feed order", "video-gallery-block") : __("Manual", "video-gallery-block"),
    },
    { value: "newest", label: __("Newest", "video-gallery-block") },
    { value: "oldest", label: __("Oldest", "video-gallery-block") },
  ];
  const sortOrder = options?.sortOrder || "manual";
  let sortHelp;
  if ("manual" === sortOrder) {
    sortHelp = isFeed
      ? __("The order YouTube or Vimeo lists the videos in.", "video-gallery-block")
      : __("The order of your video list.", "video-gallery-block");
  } else {
    sortHelp = isFeed
      ? __("By the day each video was published.", "video-gallery-block")
      : __(
          "By the day each video was added; older ones without a date count as the oldest.",
          "video-gallery-block",
        );
  }

  const setOption = (key, value) =>
    setAttributes({ options: updateData(options, value, key) });

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

  /** Label on the left, Desktop/Tablet/Mobile switch on the right. */
  const deviceRow = (text) => (
    <PanelRow className="vgbLabelRow">
      <Label className="">{text}</Label>
      <Device device={currentDevice} setDevice={setDevice} />
    </PanelRow>
  );

  return (
    <>
      <InspectorControls>
        <TabPanel
          className="bPlTabPanel vgbInspector"
          activeClass="activeTab"
          tabs={generalStyleTabs}>
          {(tab) => (
            <>
              {"general" === tab.name && (
                <>
                  <HelpPanel
                    slug="video-gallery-block"
                    /* docsLink="https://bblockswp.com/docs/video-gallery-block" */
                  />

                  <AiAssistant
                    attributes={attributes}
                    setAttributes={setAttributes}
                  />

                  <PanelBody
                    className="bPlPanelBody vgbSourcePanel"
                    title={__("Video source", "video-gallery-block")}>
                    <div className="vgbToggleGroupWrap">
                      <ToggleGroupControl
                        label={__("Where do the videos come from?", "video-gallery-block")}
                        value={isFeed ? "feed" : "manual"}
                        onChange={(val) =>
                          setAttributes({
                            feed: { count: 12, refresh: 6, url: "", ...(feed || {}), enabled: "feed" === val },
                          })
                        }
                        isBlock
                        __nextHasNoMarginBottom
                        help={
                          isFeed
                            ? __(
                                "The newest videos from a YouTube or Vimeo channel or playlist, updated by itself.",
                                "video-gallery-block",
                              )
                            : __(
                                "Add videos one by one, or paste many links under Import videos.",
                                "video-gallery-block",
                              )
                        }>
                        <ToggleGroupControlOption
                          value="manual"
                          label={__("My videos", "video-gallery-block")}
                        />
                        <ToggleGroupControlOption
                          value="feed"
                          label={__("YouTube / Vimeo", "video-gallery-block")}
                        />
                      </ToggleGroupControl>
                    </div>

                    {isFeed && (
                      <>
                        <FeedSource
                          attributes={attributes}
                          setAttributes={setAttributes}
                          keyState={keyState}
                          feedState={feedState}
                        />
                        <CopyFeedButton
                          attributes={attributes}
                          setAttributes={setAttributes}
                          feedVideos={feedVideos}
                        />
                        <p className="vgbFeedFootnote">
                          {__(
                            "Your own video list is kept. Switch back to “My videos” any time to get it back.",
                            "video-gallery-block",
                          )}
                        </p>
                      </>
                    )}
                  </PanelBody>

                  {!isFeed && (
                    <>
                      <PanelBody
                        className="bPlPanelBody vgbVideosPanel"
                        title={__("Videos", "video-gallery-block")}>
                        {canMove && (
                          <div className="vgbOrderRow">
                            <span className="vgbOrderRow__hint">
                              {__(
                                "Drag videos on the canvas to reorder them, or move this one:",
                                "video-gallery-block",
                              )}
                            </span>
                            <span className="vgbOrderRow__btns">
                              <Button
                                size="small"
                                variant="secondary"
                                icon="arrow-left-alt2"
                                label={__("Move earlier", "video-gallery-block")}
                                showTooltip
                                disabled={activeIndex <= 0}
                                onClick={() => onMove(activeIndex, activeIndex - 1)}
                              />
                              <Button
                                size="small"
                                variant="secondary"
                                icon="arrow-right-alt2"
                                label={__("Move later", "video-gallery-block")}
                                showTooltip
                                disabled={activeIndex >= videos.length - 1}
                                onClick={() => onMove(activeIndex, activeIndex + 1)}
                              />
                            </span>
                          </div>
                        )}
                        <ItemsPanel
                          {...itemsProps}
                          newItem={newItem}
                          ItemSettings={ItemSettings}
                          itemLabel="Video"
                          design="single"
                        />
                      </PanelBody>

                      <PanelBody
                        className="bPlPanelBody vgbPanel"
                        title={__("Import videos", "video-gallery-block")}
                        initialOpen={false}>
                        <BulkImport
                          attributes={attributes}
                          setAttributes={setAttributes}
                          setActiveIndex={setActiveIndex}
                        />
                      </PanelBody>

                      <PanelBody
                        className="bPlPanelBody vgbPanel vgbAlbumsPanel addRemoveItems"
                        title={__("Albums & filter bar", "video-gallery-block")}
                        initialOpen={false}>
                        {!albums.length && (
                          <p className="vgbHint">
                            {__(
                              "Albums become filter buttons above the gallery.",
                              "video-gallery-block",
                            )}
                          </p>
                        )}

                        {albums.map((album, index) => (
                          <PanelRow key={index} className="vgbAlbumRow">
                            <Label className="vgbAlbumRow__label">
                              {sprintf(
                                /* translators: %d: album number. */
                                __("Album %d", "video-gallery-block"),
                                index + 1,
                              )}
                            </Label>
                            <TextControl
                              value={album}
                              aria-label={sprintf(
                                /* translators: %d: album number. */
                                __("Album %d name", "video-gallery-block"),
                                index + 1,
                              )}
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
                                label={__("Remove this album", "video-gallery-block")}
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

                        <div className="addItem">
                          <Button
                            label={__("Add album", "video-gallery-block")}
                            onClick={() =>
                              setAttributes({ albums: [...albums, ""] })
                            }>
                            <Dashicon icon="plus" />
                            {__("Add album", "video-gallery-block")}
                          </Button>
                        </div>

                        {!!albums.length && (
                          <>
                            <Section>{__("Filter bar", "video-gallery-block")}</Section>

                            <ToggleControl
                              label={__("Show filter bar", "video-gallery-block")}
                              checked={false !== filter?.show}
                              onChange={(val) =>
                                setAttributes({ filter: { ...filter, show: val } })
                              }
                              help={__(
                                "A button for each album above the gallery.",
                                "video-gallery-block",
                              )}
                            />

                            {false !== filter?.show && (
                              <TextControl
                                label={__("“All” button label", "video-gallery-block")}
                                value={filter?.commonLabel}
                                onChange={(val) =>
                                  setAttributes({
                                    filter: { ...filter, commonLabel: val },
                                  })
                                }
                                help={__(
                                  "Leave empty to hide the filter bar.",
                                  "video-gallery-block",
                                )}
                                __nextHasNoMarginBottom
                              />
                            )}
                          </>
                        )}
                      </PanelBody>
                    </>
                  )}

                  <PanelBody
                    className="bPlPanelBody vgbPanel"
                    title={__("Layout", "video-gallery-block")}
                    initialOpen={false}>
                    {deviceRow(__("Columns", "video-gallery-block"))}
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

                    {deviceRow(__("Gaps", "video-gallery-block"))}
                    <div className="vgbTwoCol">
                      <NumberControl
                        label={__("Between columns", "video-gallery-block")}
                        value={columnGapObj[currentDevice] ?? 10}
                        min={0}
                        suffix={pxSuffix}
                        onChange={(val) =>
                          setAttributes({
                            columnGapResponsive: {
                              ...columnGapObj,
                              [currentDevice]: Math.max(0, parseInt(val) || 0),
                            },
                          })
                        }
                      />
                      <NumberControl
                        label={__("Between rows", "video-gallery-block")}
                        value={rowGapObj[currentDevice] ?? 10}
                        min={0}
                        suffix={pxSuffix}
                        onChange={(val) =>
                          setAttributes({
                            rowGapResponsive: {
                              ...rowGapObj,
                              [currentDevice]: Math.max(0, parseInt(val) || 0),
                            },
                          })
                        }
                      />
                    </div>

                    <div className="vgbToggleGroupWrap">
                      <ToggleGroupControl
                        label={__("Row alignment", "video-gallery-block")}
                        value={options?.rowAlign || "center"}
                        onChange={(val) => setOption("rowAlign", val ?? "center")}
                        isBlock
                        __nextHasNoMarginBottom
                        help={__(
                          "Where a last row that isn't full sits.",
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
                    </div>

                    <Section>{__("Thumbnails", "video-gallery-block")}</Section>

                    {/*
                      WordPress's own segmented control rather than
                      BButtonGroup: it gives each option an equal share of the
                      width (five fit the sidebar), and clicking the option
                      already selected leaves it selected instead of resetting
                      it to the default.
                    */}
                    <div className="vgbToggleGroupWrap">
                      <ToggleGroupControl
                        label={__("Thumbnail shape", "video-gallery-block")}
                        value={aspectRatio || ""}
                        onChange={(val) => setAttributes({ aspectRatio: val ?? "" })}
                        isBlock
                        __nextHasNoMarginBottom
                        help={
                          aspectRatio
                            ? __("Every thumbnail keeps this shape on all screens.", "video-gallery-block")
                            : __("Every thumbnail gets the height set below.", "video-gallery-block")
                        }>
                        {aspectRatioOptions.map((option) => (
                          <ToggleGroupControlOption
                            key={option.value}
                            value={option.value}
                            label={option.label}
                          />
                        ))}
                      </ToggleGroupControl>
                    </div>

                    {/*
                      Only one of the two sizes a tile: a ratio makes the
                      height meaningless. Galleries built before the shape
                      existed keep their fixed height, because "" is the
                      default.
                    */}
                    {!aspectRatio && (
                      <UnitControl
                        label={__("Height", "video-gallery-block")}
                        value={itemHeight}
                        onChange={(val) => setAttributes({ itemHeight: val })}
                        units={[pxUnit(), perUnit(), emUnit()]}
                      />
                    )}

                    <div className="vgbToggleGroupWrap">
                      <ToggleGroupControl
                        label={__("Thumbnail fit", "video-gallery-block")}
                        value={options?.objectFit || "cover"}
                        onChange={(value) => setOption("objectFit", value ?? "cover")}
                        isBlock
                        __nextHasNoMarginBottom
                        help={objectFitHelp(options?.objectFit || "cover")}>
                        {objectFitOptions.map((option) => (
                          <ToggleGroupControlOption
                            key={option.value}
                            value={option.value}
                            label={option.label}
                          />
                        ))}
                      </ToggleGroupControl>
                    </div>

                    <Section>{__("Order", "video-gallery-block")}</Section>

                    <div className="vgbToggleGroupWrap">
                      <ToggleGroupControl
                        label={__("Sort order", "video-gallery-block")}
                        value={sortOrder}
                        onChange={(val) => setOption("sortOrder", val ?? "manual")}
                        isBlock
                        __nextHasNoMarginBottom
                        help={sortHelp}>
                        {sortOptions.map((option) => (
                          <ToggleGroupControlOption
                            key={option.value}
                            value={option.value}
                            label={option.label}
                          />
                        ))}
                      </ToggleGroupControl>
                    </div>
                  </PanelBody>

                  <PanelBody
                    className="bPlPanelBody vgbPanel"
                    title={__("Display", "video-gallery-block")}
                    initialOpen={false}>
                    <ToggleControl
                      label={__("Show title", "video-gallery-block")}
                      checked={showTitle}
                      onChange={(val) => setOption("showCaptionOnThumbnail", val)}
                      help={__(
                        "The video's title over the bottom of each thumbnail.",
                        "video-gallery-block",
                      )}
                    />

                    <ToggleControl
                      label={__("Show channel name", "video-gallery-block")}
                      checked={!!options?.showChannel}
                      onChange={(val) => setOption("showChannel", val)}
                      help={__("From YouTube / Vimeo feeds.", "video-gallery-block")}
                    />

                    <ToggleControl
                      label={__("Show play icon", "video-gallery-block")}
                      checked={showPlayIcon}
                      onChange={(val) => setOption("showPlayIcon", val)}
                      help={__(
                        "A play icon over each thumbnail, so it reads as a video.",
                        "video-gallery-block",
                      )}
                    />

                    {!feedOwnsPaging && (
                      <>
                        <Section>{__("Videos shown", "video-gallery-block")}</Section>

                        {showShortsFilter && (
                          <div className="vgbToggleGroupWrap">
                            <ToggleGroupControl
                              label={__("YouTube Shorts", "video-gallery-block")}
                              value={shortsFilter}
                              onChange={(val) => setOption("shortsFilter", val ?? "all")}
                              isBlock
                              __nextHasNoMarginBottom
                              help={
                                isFeed
                                  ? __(
                                      "Uses YouTube's own videos-only or Shorts-only list for this channel.",
                                      "video-gallery-block",
                                    )
                                  : shortsApplies
                                  ? __(
                                      "Applies to the YouTube videos in this gallery.",
                                      "video-gallery-block",
                                    )
                                  : __(
                                      "No YouTube videos are left in this gallery; set this back to All.",
                                      "video-gallery-block",
                                    )
                              }>
                              {shortsChoices.map((option) => (
                                <ToggleGroupControlOption
                                  key={option.value}
                                  value={option.value}
                                  label={option.label}
                                />
                              ))}
                            </ToggleGroupControl>
                          </div>
                        )}

                        <NumberControl
                          className="vgbInlineNumber"
                          label={__("Show first", "video-gallery-block")}
                          labelPosition="side"
                          value={perPage || 0}
                          min={0}
                          onChange={(val) =>
                            setAttributes({ perPage: Math.max(0, parseInt(val) || 0) })
                          }
                          help={__(
                            "0 shows every video; otherwise the rest wait behind a Load more button.",
                            "video-gallery-block",
                          )}
                        />

                        {perPage > 0 && (
                          <TextControl
                            label={__("Load more button text", "video-gallery-block")}
                            value={loadMoreLabel}
                            onChange={(val) => setAttributes({ loadMoreLabel: val })}
                            __nextHasNoMarginBottom
                          />
                        )}
                      </>
                    )}
                  </PanelBody>

                  <PanelBody
                    className="bPlPanelBody vgbPanel"
                    title={__("Playback", "video-gallery-block")}
                    initialOpen={false}>
                    <div className="vgbToggleGroupWrap">
                      <ToggleGroupControl
                        label={__("When a video is clicked", "video-gallery-block")}
                        value={playInline ? "inline" : "lightbox"}
                        onChange={(val) => setOption("playMode", val || "lightbox")}
                        isBlock
                        __nextHasNoMarginBottom
                        help={
                          playInline
                            ? aspectRatio
                              ? __(
                                  "Plays inside its own tile, one video at a time.",
                                  "video-gallery-block",
                                )
                              : __(
                                  "Plays inside its own tile. Tip: a 16:9 Thumbnail shape (Layout) makes it fill the tile.",
                                  "video-gallery-block",
                                )
                            : __(
                                "Opens in a lightbox, with the other videos below it.",
                                "video-gallery-block",
                              )
                        }>
                        <ToggleGroupControlOption
                          value="lightbox"
                          label={__("Lightbox", "video-gallery-block")}
                        />
                        <ToggleGroupControlOption
                          value="inline"
                          label={__("Play in place", "video-gallery-block")}
                        />
                      </ToggleGroupControl>
                    </div>

                    {!playInline && (
                      <ToggleControl
                        label={__("Popup width as aspect ratio", "video-gallery-block")}
                        checked={isPopupWidthAsRatio}
                        onChange={(val) => setAttributes({ isPopupWidthAsRatio: val })}
                      />
                    )}
                  </PanelBody>

                  <PanelBody
                    className="bPlPanelBody vgbPanel"
                    title={__("Privacy & SEO", "video-gallery-block")}
                    initialOpen={false}>
                    <ToggleControl
                      label={__("Ask before loading YouTube / Vimeo (GDPR)", "video-gallery-block")}
                      checked={!!options?.consentGate}
                      onChange={(val) => setOption("consentGate", val)}
                      help={__(
                        "Shows a privacy notice and loads the video only after the visitor agrees. The choice is remembered for the whole site.",
                        "video-gallery-block",
                      )}
                    />

                    <ToggleControl
                      label={__("Send play events to Google Analytics", "video-gallery-block")}
                      checked={!!options?.gaTracking}
                      onChange={(val) => setOption("gaTracking", val)}
                      help={__(
                        "Sends play, progress and finish events to GA4 or Google Tag Manager.",
                        "video-gallery-block",
                      )}
                    />

                    <ToggleControl
                      label={__("Video SEO markup", "video-gallery-block")}
                      checked={false !== options?.videoSchema}
                      onChange={(val) => setOption("videoSchema", val)}
                      help={__(
                        "Video schema for search results; turn it off if your SEO plugin adds it.",
                        "video-gallery-block",
                      )}
                    />
                  </PanelBody>
                </>
              )}

              {"style" === tab.name && (
                <>
                  <PanelBody
                    className="bPlPanelBody vgbPanel"
                    title={__("Gallery", "video-gallery-block")}>
                    <Background
                      label={__("Background", "video-gallery-block")}
                      value={background}
                      onChange={(val) => setAttributes({ background: val })}
                      defaults={{ color: "#fff" }}
                    />

                    <SpaceControl
                      label={__("Padding", "video-gallery-block")}
                      value={padding}
                      onChange={(val) => setAttributes({ padding: val })}
                      defaults={{ vertical: "10px", horizontal: "10px" }}
                    />

                    <BorderControl
                      label={__("Border", "video-gallery-block")}
                      value={border}
                      onChange={(val) => setAttributes({ border: val })}
                      defaults={{ radius: "5px" }}
                    />

                    <ShadowControl
                      label={__("Shadow", "video-gallery-block")}
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
                    className="bPlPanelBody vgbPanel"
                    title={__("Thumbnail", "video-gallery-block")}
                    initialOpen={false}>
                    <BorderControl
                      label={__("Border", "video-gallery-block")}
                      labelPosition="left"
                      value={itemBorder}
                      onChange={(val) => setAttributes({ itemBorder: val })}
                    />

                    <ShadowControl
                      label={__("Shadow", "video-gallery-block")}
                      labelPosition="left"
                      value={itemShadow}
                      onChange={(val) => setAttributes({ itemShadow: val })}
                    />
                  </PanelBody>

                  {/* Only when the thumbnails show a title. */}
                  {showTitle && (
                    <PanelBody
                      className="bPlPanelBody vgbPanel"
                      title={__("Title & text", "video-gallery-block")}
                      initialOpen={false}>
                      <Typography
                        label={__("Typography", "video-gallery-block")}
                        labelPosition="left"
                        value={styles?.caption?.typography}
                        onChange={(val) =>
                          setAttributes({
                            styles: updateData(styles, val, "caption", "typography"),
                          })
                        }
                        defaults={{
                          fontSize: { desktop: 14, tablet: 14, mobile: 14 },
                        }}
                      />

                      <ColorsControl
                        label={__("Colors", "video-gallery-block")}
                        value={styles?.caption?.colors}
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
                        label={__("Padding", "video-gallery-block")}
                        labelPosition="left"
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
                    </PanelBody>
                  )}

                  {showPlayIcon && (
                    <PanelBody
                      className="bPlPanelBody vgbPanel"
                      title={__("Play icon", "video-gallery-block")}
                      initialOpen={false}>
                      <ColorsControl
                        label={__("Colors", "video-gallery-block")}
                        value={playIconColors}
                        labelPosition="left"
                        onChange={(val) => setAttributes({ playIconColors: val })}
                        defaults={{
                          color: "#fff",
                          bg: "rgba(0, 0, 0, 0.55)",
                        }}
                      />

                      <NumberControl
                        className="vgbInlineNumber"
                        label={__("Size", "video-gallery-block")}
                        labelPosition="side"
                        value={playIconSize ?? 54}
                        suffix={pxSuffix}
                        onChange={(val) =>
                          setAttributes({
                            playIconSize: parseInt(val) || 54,
                          })
                        }
                        min={30}
                        max={100}
                      />

                      <RangeControl
                        label={__("Hover zoom", "video-gallery-block")}
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
                          "How much the icon grows on hover; 1 turns it off.",
                          "video-gallery-block",
                        )}
                      />
                    </PanelBody>
                  )}

                  {showFilterBar && (
                    <PanelBody
                      className="bPlPanelBody vgbPanel"
                      title={__("Album filter bar", "video-gallery-block")}
                      initialOpen={false}>
                      <Typography
                        label={__("Button typography", "video-gallery-block")}
                        value={filterBtnTypo}
                        onChange={(val) => setAttributes({ filterBtnTypo: val })}
                        defaults={{
                          fontSize: { desktop: 14, tablet: 14, mobile: 14 },
                        }}
                      />

                      <ColorsControl
                        label={__("Button colors", "video-gallery-block")}
                        value={filterBtnColors}
                        onChange={(val) => setAttributes({ filterBtnColors: val })}
                        defaults={{ color: "#fff", bg: "#146ef5" }}
                      />

                      <ColorsControl
                        label={__("Hover & active colors", "video-gallery-block")}
                        value={filterBtnHoverColors}
                        onChange={(val) => setAttributes({ filterBtnHoverColors: val })}
                        defaults={{ color: "#fff", bg: "#ff7a00" }}
                      />
                    </PanelBody>
                  )}

                  {!playInline && (
                    <PanelBody
                      className="bPlPanelBody vgbPanel"
                      title={__("Lightbox caption", "video-gallery-block")}
                      initialOpen={false}>
                      <Typography
                        label={__("Typography", "video-gallery-block")}
                        labelPosition="left"
                        value={styles?.lightBoxCaption?.typography}
                        onChange={(val) =>
                          setAttributes({
                            styles: updateData(styles, val, "lightBoxCaption", "typography"),
                          })
                        }
                        defaults={{
                          fontSize: { desktop: 14, tablet: 14, mobile: 14 },
                        }}
                      />

                      <ColorsControl
                        label={__("Colors", "video-gallery-block")}
                        value={styles?.lightBoxCaption?.colors}
                        labelPosition="left"
                        onChange={(val) =>
                          setAttributes({
                            styles: updateData(styles, val, "lightBoxCaption", "colors"),
                          })
                        }
                        defaults={{
                          color: "#fff",
                          bg: "#00000000",
                        }}
                      />

                      <SpaceControl
                        label={__("Padding", "video-gallery-block")}
                        labelPosition="left"
                        value={styles?.lightBoxCaption?.padding}
                        onChange={(val) =>
                          setAttributes({
                            styles: updateData(styles, val, "lightBoxCaption", "padding"),
                          })
                        }
                        defaults={{
                          vertical: "10px",
                          horizontal: "10px",
                        }}
                      />
                    </PanelBody>
                  )}
                </>
              )}
            </>
          )}
        </TabPanel>

        <AdvertiseCard planLink={pricingUrl} />
      </InspectorControls>

      <BlockControls>
        {/* A feed brings its own videos; there is no list to add to. */}
        {!isFeed && (
          <ToolbarGroup className="bPlToolbar">
            <ToolbarButton
              label={__("Add new video", "video-gallery-block")}
              onClick={addVideo}>
              <Dashicon icon="plus" />
            </ToolbarButton>
          </ToolbarGroup>
        )}

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
