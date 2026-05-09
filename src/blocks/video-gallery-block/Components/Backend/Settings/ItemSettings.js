import { __ } from "@wordpress/i18n";
import { PanelRow, TextControl, CheckboxControl } from "@wordpress/components";
import { produce } from "immer";

import {
  InlineMediaUpload,
  Label,
} from "../../../../../../../bpl-tools/Components";
import { getYoutubeTitle, getYoutubeId } from "../../../utils/functions";

const ItemSettings = ({
  attributes,
  setAttributes,
  arrKey,
  index,
  setActiveIndex = false,
}) => {
  const items = attributes[arrKey];
  const { video = "", poster = "", caption = "", albs = [] } = items[index];

  const updateVideo = async (property, val, otherIndex = null) => {
    const newVideos = produce(attributes[arrKey], (draft) => {
      draft[index][property] = val;

      if (null !== otherIndex) {
        draft[index][property][otherIndex] = val;
      } else {
        draft[index][property] = val;
      }
    });

    setAttributes({ [arrKey]: newVideos });
    setActiveIndex && setActiveIndex(index);

    if (property === "video" && getYoutubeId(val)) {
      const title = await getYoutubeTitle(val);

      if (title && !caption) {
        const videosWithTitle = produce(newVideos, (draft) => {
          draft[index]["caption"] = title;
        });
        setAttributes({ [arrKey]: videosWithTitle });
      }
    }
  };

  return (
    <>
      <InlineMediaUpload
        value={video}
        types={["video"]}
        onChange={(val) => updateVideo("video", val)}
        placeholder={__("Video url", "video-player")}
      />

      <InlineMediaUpload
        value={poster}
        types={["image"]}
        onChange={(val) => updateVideo("poster", val)}
        placeholder={__("Poster url", "video-player")}
      />

      <PanelRow className="mt10">
        <Label className="">{__("Caption:", "video-gallery")}</Label>
        <TextControl
          value={caption}
          onChange={(val) => updateVideo("caption", val)}
        />
      </PanelRow>

      <Label>{__("Select Albums:", "video-gallery")}</Label>
      {attributes.albums.map((alb) => {
        const isInc = albs.includes(alb);

        return (
          <CheckboxControl
            label={alb}
            key={alb}
            checked={isInc}
            onChange={(val) => {
              updateVideo(
                "albs",
                val ? [...albs, alb] : albs.filter((id) => id !== alb)
              );
            }}
          />
        );
      })}
    </>
  );
};
export default ItemSettings;
