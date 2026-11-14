import { __ } from "@wordpress/i18n";
import { TextControl, CheckboxControl } from "@wordpress/components";
import { produce } from "immer";

import {
  InlineMediaUpload,
  Label,
} from "../../../../../../../bpl-tools/Components";
import { getVideoOembed } from "../../../utils/oembed";

// A direct video file on another website, with no thumbnail of its own: the browser
// is not allowed to read a picture out of it, so the gallery tile can come up black.
const PROVIDER_LINK = /^https?:\/\/([a-z0-9-]+\.)*(youtube\.com|youtu\.be|youtube-nocookie\.com|vimeo\.com|facebook\.com|fb\.watch|dailymotion\.com|wistia\.(com|net))\//i;
const isOtherSiteFile = (url) => {
  if (!url || !/^https?:\/\//i.test(url) || PROVIDER_LINK.test(url)) return false;
  try {
    return new URL(url).hostname !== window.location.hostname;
  } catch (e) {
    return false;
  }
};

const ItemSettings = ({
  attributes,
  setAttributes,
  arrKey,
  index,
  setActiveIndex = false,
}) => {
  const items = attributes[arrKey];
  // An index past the end (a list that just got shorter) must not crash the block.
  const { video = "", poster = "", caption = "", albs = [] } = items?.[index] || {};
  const albums = attributes.albums || [];

  const updateVideo = async (property, val) => {
    const newVideos = produce(attributes[arrKey], (draft) => {
      draft[index][property] = val;
    });

    setAttributes({ [arrKey]: newVideos });
    setActiveIndex && setActiveIndex(index);

    if ("video" !== property) {
      return;
    }

    /*
     * Fill in what the provider can tell us, for the fields still empty.
     *
     * The poster matters as much as the title: the grid shows posters, and for
     * Vimeo there is no thumbnail URL that can be worked out from the video URL
     * the way YouTube's can. Without this a Vimeo video came through as an
     * empty tile unless the person uploaded a poster by hand.
     */
    const meta = await getVideoOembed(val);

    if (!meta) {
      return;
    }

    const withMeta = produce(newVideos, (draft) => {
      if (meta.title && !caption) {
        draft[index].caption = meta.title;
      }
      if (meta.thumbnail && !poster) {
        draft[index].poster = meta.thumbnail;
      }
    });

    setAttributes({ [arrKey]: withMeta });
  };

  return (
    <div className="vgbItemFields">
      <InlineMediaUpload
        className="vgbItemField"
        label={__("Video", "video-gallery-block")}
        value={video}
        types={["video"]}
        onChange={(val) => updateVideo("video", val)}
        placeholder={__("Paste a link or upload", "video-gallery-block")}
      />

      <InlineMediaUpload
        className="vgbItemField"
        label={__("Thumbnail", "video-gallery-block")}
        value={poster}
        types={["image"]}
        onChange={(val) => updateVideo("poster", val)}
        placeholder={__("Image link or upload", "video-gallery-block")}
      />
      {!poster && isOtherSiteFile(video) && (
        <p className="vgbItemField vgbItemHint">
          {__(
            "This video is on another website, so a thumbnail cannot be made from it automatically and the tile may look black. Add a thumbnail image above.",
            "video-gallery-block",
          )}
        </p>
      )}

      <TextControl
        className="vgbItemField"
        label={__("Title", "video-gallery-block")}
        value={caption}
        onChange={(val) => updateVideo("caption", val)}
        __nextHasNoMarginBottom
      />

      {!!albums.length && (
        <div className="vgbItemField vgbItemAlbums">
          <Label className="mb5">{__("Albums", "video-gallery-block")}</Label>
          {albums.map((alb, albIndex) => {
            const isInc = albs.includes(alb);

            return (
              <CheckboxControl
                label={alb}
                key={albIndex}
                checked={isInc}
                onChange={(val) => {
                  updateVideo(
                    "albs",
                    val ? [...albs, alb] : albs.filter((id) => id !== alb),
                  );
                }}
                __nextHasNoMarginBottom
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
export default ItemSettings;
