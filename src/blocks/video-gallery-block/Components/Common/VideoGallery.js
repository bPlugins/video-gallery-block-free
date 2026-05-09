import { useState } from "react";
import VideoThumbnail from "react-video-thumbnail";
import Style from "./Style";
import VideoGalleryFilter from "./VideoGalleryFilter";
import { prefix } from "../../utils/data";
import { getYoutubeThumbnail } from "../../utils/functions";

const VideoGallery = ({ attributes, id, isBackend = false, custom = {} }) => {
  const { videos, options } = attributes;
  const [itemWidth, setItemWidth] = useState("");

  return (
    <>
      <Style attributes={attributes} id={id} itemWidth={itemWidth} />

      <div className={prefix}>
        <VideoGalleryFilter
          attributes={attributes}
          id={id}
          itemWidth={itemWidth}
          setItemWidth={setItemWidth}
        />

        <div id={id} className="videoGallery">
          {videos?.map((item, index) => {
            const { video, poster, albs } = item;

            return isBackend ? (
              <div
                onClick={() => custom.setActiveIndex(index)}
                className={`galleryItem ${albs
                  ?.map((c) => lodash.camelCase(c))
                  .join(" ")} ${
                  index === custom.activeIndex ? "bPlNowEditing" : ""
                }`}>
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
                {options?.showCaptionOnThumbnail && item?.caption && (
                  <div className="galleryItemCaption">{item?.caption}</div>
                )}
              </div>
            ) : (
              <a
                key={index}
                className={`galleryItem ${albs
                  ?.map((c) => lodash.camelCase(c))
                  .join(" ")}`}
                data-fancybox
                href={video || poster}>
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
                {options?.showCaptionOnThumbnail && item?.caption && (
                  <div className="galleryItemCaption">{item?.caption}</div>
                )}
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default VideoGallery;
