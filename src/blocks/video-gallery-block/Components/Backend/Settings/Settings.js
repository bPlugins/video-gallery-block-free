import { __ } from "@wordpress/i18n";
import { withSelect } from "@wordpress/data";
import { BlockControls, InspectorControls } from "@wordpress/block-editor";
import {
  TabPanel,
  PanelBody,
  PanelRow,
  TextControl,
  RangeControl,
  __experimentalUnitControl as UnitControl,
  __experimentalNumberControl as NumberControl,
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
  BBlocksAds,
  Device,
  ColorsControl,
  HelpPanel,
  Typography,
  ShadowControl,
  ItemsPanel,
  BButtonGroup,
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
import { FrontShortCode } from "../../../../../../../bpl-tools/ProControls";

import { generalStyleTabs, videoSizeOptions } from "../../../utils/options";
import ItemSettings from "./ItemSettings";
import { updateData } from "../../../../../../../bpl-tools/utils/functions";
import LivePreview from "./LivePreview";

const Settings = ({
  attributes,
  setAttributes,
  activeIndex,
  setActiveIndex,
  device,
  clientId,
  currentPostId,
  currentPostType,
}) => {
  const {
    albums,
    videos,
    columns,
    columnGap,
    rowGap,
    isPopupWidthAsRatio,
    filter = { show: true, commonLabel: "All Videos" },
    background,
    padding,
    border,
    shadow,
    filterBtnTypo,
    filterBtnColors,
    filterBtnHoverColors,
    itemHeight,
    options,
    styles,
  } = attributes;

  const newItem = {
    video: "",
    albs: [],
  };

  const addVideo = () => {
    setAttributes({ videos: [...videos, newItem] });
    setActiveIndex(videos.length);
  };

  const itemsProps = {
    attributes,
    setAttributes,
    arrKey: "videos",
    activeIndex,
    setActiveIndex,
  };

  const isPremium = Boolean(vgbpipecheck ?? false);
  const isGalleryPostType = ["video-gallery-block", "free", "pro"].includes(currentPostType);

  return (
    <>
      <InspectorControls>
        <div className="bPlInspectorInfo">
          <BBlocksAds />
        </div>

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
                    title={__("Add or Remove Albums", "video-gallery")}>
                    {albums.map((album, index) => (
                      <PanelRow key={index}>
                        <Label className="">
                          {__(`Al ${index + 1}:`, "video-gallery")}
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
                          text={__("Remove this album", "video-gallery")}
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
                        label={__("Add New Album", "video-gallery")}
                        onClick={() =>
                          setAttributes({ albums: [...albums, ""] })
                        }>
                        <Dashicon icon="plus" />
                        {__("Add New Album", "video-gallery")}
                      </Button>
                    </div>
                  </PanelBody>

                  <PanelBody
                    className="bPlPanelBody"
                    title={__("Videos", "video-gallery")}>
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
                    title={__("Layout Settings", "video-gallery")}
                    initialOpen={false}>
                    <PanelRow>
                      <Label className="mb5">
                        {__("Columns:", "video-gallery")}
                      </Label>
                      <Device />
                    </PanelRow>
                    <RangeControl
                      value={columns[device]}
                      onChange={(val) => {
                        setAttributes({
                          columns: { ...columns, [device]: val },
                        });
                      }}
                      min={1}
                      max={6}
                      step={1}
                      beforeIcon="grid-view"
                    />

                    <NumberControl
                      className="mt20"
                      label={__("Column Gap:", "video-gallery")}
                      labelPosition="left"
                      value={columnGap}
                      onChange={(val) =>
                        setAttributes({ columnGap: parseInt(val) })
                      }
                    />

                    <NumberControl
                      className="mt20"
                      label={__("Row Gap:", "video-gallery")}
                      labelPosition="left"
                      value={rowGap}
                      onChange={(val) =>
                        setAttributes({ rowGap: parseInt(val) })
                      }
                    />

                    <ToggleControl
                      className="mt20"
                      label={__(
                        "Popup video width as aspect ratio",
                        "bplugins",
                      )}
                      checked={isPopupWidthAsRatio}
                      onChange={(val) =>
                        setAttributes({ isPopupWidthAsRatio: val })
                      }
                    />
                  </PanelBody>

                  <PanelBody
                    className="bPlPanelBody"
                    title={__("Filter", "video-gallery")}
                    initialOpen={false}>
                    <PanelRow>
                      <Label className="">
                        {__("Common Label", "video-gallery")}
                      </Label>
                      <TextControl
                        value={filter?.commonLabel}
                        onChange={(val) =>
                          setAttributes({
                            filter: { ...filter, commonLabel: val },
                          })
                        }
                      />
                    </PanelRow>

                    <span>
                      {__(
                        "If you want to show the common label, leave it blank.",
                        "video-gallery",
                      )}
                    </span>
                  </PanelBody>

                  <PanelBody
                    className="bPlPanelBody"
                    title={__("Options", "video-gallery")}
                    initialOpen={false}>
                    <BButtonGroup
                      label={__("Video Fit:", "video-gallery")}
                      options={videoSizeOptions}
                      value={options?.objectFit}
                      onChange={(value) =>
                        setAttributes({
                          options: updateData(options, value, "objectFit"),
                        })
                      }
                    />

                    <ToggleControl
                      className="mt20"
                      label={__("Show Caption on Thumbnail", "video-gallery")}
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
                  </PanelBody>
                </>
              )}

              {"style" === tab.name && (
                <>
                  <PanelBody
                    className="bPlPanelBody"
                    title={__("Gallery", "video-gallery")}>
                    <Background
                      label={__("Background:", "video-gallery")}
                      value={background}
                      onChange={(val) => setAttributes({ background: val })}
                      defaults={{ color: "#fff" }}
                    />

                    <SpaceControl
                      className="mt20"
                      label={__("Padding:", "video-gallery")}
                      value={padding}
                      onChange={(val) => setAttributes({ padding: val })}
                      defaults={{ vertical: "10px", horizontal: "10px" }}
                    />

                    <BorderControl
                      className="mt20"
                      label={__("Border:", "video-gallery")}
                      value={border}
                      onChange={(val) => setAttributes({ border: val })}
                      defaults={{ radius: "5px" }}
                    />

                    <ShadowControl
                      className="mt20"
                      label={__("Shadow:", "video-gallery")}
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
                    title={__("Filter", "video-gallery")}
                    initialOpen={false}>
                    <Typography
                      label={__("Button Typography:", "video-gallery")}
                      value={filterBtnTypo}
                      onChange={(val) => setAttributes({ filterBtnTypo: val })}
                      defaults={{
                        fontSize: { desktop: 14, tablet: 14, mobile: 14 },
                      }}
                    />

                    <ColorsControl
                      label={__("Button Colors")}
                      value={filterBtnColors}
                      onChange={(val) =>
                        setAttributes({ filterBtnColors: val })
                      }
                      defaults={{ color: "#fff", bg: "#146ef5" }}
                    />

                    <ColorsControl
                      label={__("Button Hover/Active Colors")}
                      value={filterBtnHoverColors}
                      onChange={(val) =>
                        setAttributes({ filterBtnHoverColors: val })
                      }
                      defaults={{ color: "#fff", bg: "#ff7a00" }}
                    />
                  </PanelBody>

                  <PanelBody
                    className="bPlPanelBody"
                    title={__("Item", "video-gallery")}
                    initialOpen={false}>
                    <UnitControl
                      label={__("Height:", "video-gallery")}
                      labelPosition="left"
                      value={itemHeight}
                      onChange={(val) => setAttributes({ itemHeight: val })}
                      units={[pxUnit(), perUnit(), emUnit()]}
                    />

                    <Typography
                      label={__("Caption Typography:", "video-gallery")}
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
                      label={__("Caption Colors:", "video-gallery")}
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
                      label={__("Caption Padding:", "video-gallery")}
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
                  </PanelBody>

                  <PanelBody
                    className="bPlPanelBody"
                    title={__("LightBox Caption", "video-gallery")}
                    initialOpen={false}>
                    <Typography
                      label={__("Caption Typography:", "video-gallery")}
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
                      label={__("Caption Colors:", "video-gallery")}
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
                      label={__("Caption Padding:", "video-gallery")}
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
      </InspectorControls>

      <BlockControls>
        <ToolbarGroup className="bPlToolbar">
          <ToolbarButton
            label={__("Add New Video", "video-gallery")}
            onClick={addVideo}>
            <Dashicon icon="plus" />
          </ToolbarButton>
        </ToolbarGroup>

        <div style={{ display: "flex", alignItems: "center" }}>
          <LivePreview isPremium={isPremium} />
        </div>
      </BlockControls>
    </>
  );
};
export default withSelect((select) => {
  const { getDeviceType } = select("core/editor");

  return {
    device: getDeviceType()?.toLowerCase(),
  };
})(Settings);
