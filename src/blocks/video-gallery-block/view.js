import { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { Fancybox } from "@fancyapps/ui";
import VideoThumbnail from "react-video-thumbnail";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

import "./style.scss";
import Style from "./Components/Common/Style";
import VideoGalleryFilter from "./Components/Common/VideoGalleryFilter";
import { controlsHandler, getYoutubeThumbnail } from "./utils/functions";
import { prefix } from "./utils/data";
import { sanitizeHTML } from "../../../../bpl-tools/utils/common";

document.addEventListener("DOMContentLoaded", () => {
  const galleryEls = document.querySelectorAll(".wp-block-vgb-video-gallery");
  galleryEls.forEach((galleryEl) => {
    const attributes = JSON.parse(galleryEl.dataset.attributes);

    createRoot(galleryEl).render(
      <RenderVideoGallery attributes={attributes} id={galleryEl.id} />
    );

    galleryEl?.removeAttribute("data-attributes");
  });
});

const RenderVideoGallery = ({ attributes, id }) => {
  const { videos, options } = attributes;

  const [itemWidth, setItemWidth] = useState("");
  const galleryRef = useRef(null);


  useEffect(() => {
    Fancybox.bind(galleryRef.current, "[data-fancybox]", {
      mainClass: `vgbFancyBox ${id}-fancyBox`,
      Toolbar: {
        display: {
          left: [],
          middle: [],
          right: ["slideshow", "close"],
        },
      },
      Carousel: {
        infinite: false,
      },
      Thumbs: false,
      contentClick: "toggleZoom", // 'toggleZoom' | 'toggleCover' | 'toggleMax' | 'zoomToFit' | 'zoomToMax' | 'iterateZoom' | false | 'close' | 'next' | 'prev'
      on: {
        done: () => {
          const videoEls = document.querySelectorAll(
            `.${id}-fancyBox .fancybox__html5video`
          );

          Plyr.setup(videoEls, {
            controls: controlsHandler({
              "play-large": true,
              restart: false,
              rewind: true,
              play: true,
              "fast-forward": true,
              progress: true,
              "current-time": true,
              duration: false,
              mute: true,
              volume: true,
              pip: false,
              airplay: false,
              settings: true,
              download: false,
              fullscreen: true,
            }),
            clickToPlay: false,
            loop: { active: false },
            muted: false,
            autoplay: false,
            resetOnEnd: false,
            hideControls: true,
          });
        },
      },
    });
  }, []);

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

        <div id={`${id}-gallery`} className="videoGallery" ref={galleryRef}>
          {videos?.map((item, index) => {
            const { video, poster, caption = "", albs } = item;

            return (
              <a
                key={index}
                className={`galleryItem ${albs
                  ?.map((c) => lodash.camelCase(c))
                  .join(" ")}`}
                data-fancybox
                href={video || poster}
                data-caption={sanitizeHTML(caption)}>
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
                {options?.showCaptionOnThumbnail && caption && (
                  <div className="galleryItemCaption">
                    {sanitizeHTML(caption)}
                  </div>
                )}
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
};
