import { useState, useRef, useEffect } from "react";
import { withSelect } from "@wordpress/data";
import VideoThumbnail from "react-video-thumbnail";
import { useBlockProps } from "@wordpress/block-editor";

import Settings from "./Settings/Settings";
import Style from "../Common/Style";
import VideoGalleryFilter from "../Common/VideoGalleryFilter";
import { prefix } from "../../utils/data";
import { getYoutubeThumbnail } from "../../utils/functions";
import { FrontShortCode } from "../../../../../../bpl-tools/ProControls";

const Edit = (props) => {
  const {
    attributes,
    setAttributes,
    clientId,
    currentPostId,
    currentPostType,
  } = props;

  const [activeIndex, setActiveIndex] = useState(0);
  const [itemWidth, setItemWidth] = useState("");
  const id = `${prefix}-${clientId}`;
  const { isSetup, videos, options } = attributes;
  const blockProps = useBlockProps({
    id: id,
  });
  const isGalleryPostType = ["video-gallery-block", "free", "pro"].includes(
    currentPostType,
  );

  return (
    <>
      <Settings
        attributes={attributes}
        setAttributes={setAttributes}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        clientId={clientId}
        currentPostId={currentPostId}
        currentPostType={currentPostType}
      />

      <div {...blockProps} id={id}>
        {isGalleryPostType && (
          <FrontShortCode
            postType={currentPostType}
            shortCode={`[video_gallery id=${currentPostId}]`}
          />
        )}
        {/* <div {...useBlockProps()} id={id}> */}
        <Style attributes={attributes} id={id} itemWidth={itemWidth} />

        <div className={prefix}>
          <VideoGalleryFilter
            attributes={attributes}
            id={id}
            itemWidth={itemWidth}
            setItemWidth={setItemWidth}
          />

          <div id={`${id}-gallery`} className="videoGallery">
            {videos?.map((item, index) => {
              const { video, poster, albs } = item;
              return (
                <div
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`galleryItem ${albs
                    ?.map((c) => lodash.camelCase(c))
                    .join(" ")} ${
                    index === activeIndex ? "bPlNowEditing" : ""
                  }`}
                  id={`galleryItem-${index}`}>
                  {poster || getYoutubeThumbnail(video) ? (
                    <figure className="galleryFigure">
                      <img src={poster || getYoutubeThumbnail(video)} />
                    </figure>
                  ) : (
                    <VideoThumbnail
                      width={600}
                      videoUrl={video}
                      snapshotAtTime={2}
                    />
                  )}
                  {options?.showCaptionOnThumbnail && item.caption && (
                    <div className="galleryItemCaption">{item.caption}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
export default withSelect((select) => {
  const { getCurrentPostId, getCurrentPostType } = select("core/editor");
  return {
    currentPostId:
      getCurrentPostId() || select("core").getEditedPostAttribute("id"),
    currentPostType:
      getCurrentPostType() || select("core").getEditedPostAttribute("type"),
  };
})(Edit);
