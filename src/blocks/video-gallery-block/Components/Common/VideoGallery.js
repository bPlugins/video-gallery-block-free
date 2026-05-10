import { useState, useEffect, useRef } from "react";
import { Fancybox } from "@fancyapps/ui";
import VideoThumbnail from "react-video-thumbnail";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

import Style from "./Style";
import VideoGalleryFilter from "./VideoGalleryFilter";
import { controlsHandler, getYoutubeThumbnail } from "../../utils/functions";
import { prefix } from "../../utils/data";
import { sanitizeHTML } from "../../../../../../bpl-tools/utils/common";

const VideoGallery = ({ attributes, id, activeIndex, setActiveIndex }) => {
  const { videos, options } = attributes;

  const [itemWidth, setItemWidth] = useState("");
  const galleryRef = useRef(null);

  useEffect(() => {
    if (galleryRef.current) {
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
        Thumbs: {
          autoStart: true,
        },
        contentClick: "toggleZoom",
        on: {
          done: () => {
            const videoEls = document.querySelectorAll(
              `.${id}-fancyBox .fancybox__html5video`
            );

            if (typeof Plyr !== "undefined") {
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
            }
          },
        },
      });
    }

    return () => {
      Fancybox.destroy();
    };
  }, [videos, id]);

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
                  .join(" ")} ${
                  setActiveIndex && index === activeIndex ? "bPlNowEditing" : ""
                }`}
                data-fancybox
                href={video || poster}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (setActiveIndex) {
                    setActiveIndex(index);
                    Fancybox.show(
                      videos.map((v) => ({
                        src: v.video || v.poster,
                        thumb: v.poster || getYoutubeThumbnail(v.video),
                        caption: sanitizeHTML(v.caption || ""),
                      })),
                      {
                        startIndex: index,
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
                        Thumbs: {
                          autoStart: true,
                        },
                        contentClick: "toggleZoom",
                        on: {
                          done: (fancybox, slide) => {
                            // Use a more robust selector to find video elements
                            const videoEls = document.querySelectorAll(
                              `.${id}-fancyBox video, .${id}-fancyBox .fancybox__html5video`
                            );

                            if (typeof Plyr !== "undefined" && videoEls.length > 0) {
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
                            }
                          },
                        },
                      }
                    );
                  }
                }}
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

export default VideoGallery;
