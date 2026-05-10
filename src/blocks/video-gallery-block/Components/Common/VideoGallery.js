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
  const [activeFilter, setActiveFilter] = useState("*");
  const galleryRef = useRef(null);
  const isotopeRef = useRef(null);

  const {
    columns = { desktop: 3, tablet: 2, mobile: 1 },
    columnGap,
    rowGap,
  } = attributes;

  const colSettings =
    typeof columns === "number"
      ? { desktop: columns, tablet: Math.max(1, columns - 1), mobile: 1 }
      : { ...{ desktop: 3, tablet: 2, mobile: 1 }, ...columns };

  // Calculate and Update Width
  useEffect(() => {
    const updateWidth = () => {
      if (galleryRef.current) {
        const containerWidth = galleryRef.current.clientWidth;
        if (containerWidth > 0) {
          const cols = colSettings.desktop || 3;
          const gap = columnGap || 0;
          // Calculate item width accounting for gaps
          const totalGap = gap * (cols - 1);
          const calculatedWidth = (containerWidth - totalGap) / cols;
          setItemWidth(Math.floor(calculatedWidth));
        }
      }
    };

    const observer = new ResizeObserver(updateWidth);
    if (galleryRef.current) {
      observer.observe(galleryRef.current);
    }

    updateWidth();
    const timer = setTimeout(updateWidth, 500);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [columns, columnGap, id]);

  // Isotope Initialization
  useEffect(() => {
    // Disable Isotope in the editor to prevent layout issues (Gutenberg iframes, etc.)
    // Standard CSS Grid/Flex handles the layout perfectly in the editor.
    if (!galleryRef.current || setActiveIndex) return;

    const $ = window.jQuery;
    if (!$ || !$.fn.isotope) return;

    const isoOptions = {
      itemSelector: ".galleryItem",
      layoutMode: "fitRows",
      stagger: 30,
      transitionDuration: "0.5s",
      percentPosition: true,
      fitRows: {
        gutter: 0, // We handle gutter via margins/width
      },
    };

    const $gallery = $(galleryRef.current);
    isotopeRef.current = $gallery.isotope(isoOptions);

    const handleLayout = () => {
      if (isotopeRef.current) {
        isotopeRef.current.isotope("layout");
      }
    };

    const timer = setTimeout(handleLayout, 500);
    window.addEventListener("resize", handleLayout);

    return () => {
      if (isotopeRef.current) {
        isotopeRef.current.isotope("destroy");
      }
      window.removeEventListener("resize", handleLayout);
      clearTimeout(timer);
    };
  }, [videos, columnGap, itemWidth, id]);

  // Fancybox Initialization for Frontend
  useEffect(() => {
    if (galleryRef.current) {
      Fancybox.bind(galleryRef.current, "[data-fancybox]", {
        mainClass: `vgbFancyBox ${id}-fancyBox`,
        container: galleryRef.current,
        Toolbar: {
          display: {
            left: ["counter"],
            middle: [],
            right: ["share", "zoom", "slideshow", "fullscreen", "close"],
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
            const videoEls = slide
              .getContentEl()
              .querySelectorAll(`video, .fancybox__html5video`);

            if (typeof Plyr !== "undefined" && videoEls.length > 0) {
              videoEls.forEach((el) => {
                if (!el.plyr) {
                  new Plyr(el, {
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

  // Apply lightbox caption styles directly via inline styles in the editor
  // This bypasses CSS specificity issues where Fancybox's own styles override the <style> tag
  useEffect(() => {
    if (!setActiveIndex || !galleryRef.current) return; // Editor only

    const { styles } = attributes;
    const captionStyles = styles?.lightBoxCaption;
    if (!captionStyles) return;

    const applyStylesToCaption = (el) => {
      // Apply typography
      const typo = captionStyles.typography || {};
      if (typo.fontFamily && typo.fontFamily !== "Default") {
        el.style.setProperty("font-family", `'${typo.fontFamily}', ${typo.fontCategory || "sans-serif"}`, "important");
      }
      if (typo.fontSize) {
        const size = typo.fontSize?.desktop || typo.fontSize;
        if (size) {
          const sizeVal = typeof size === "number" ? `${size}px` : size;
          el.style.setProperty("font-size", sizeVal, "important");
        }
      }
      if (typo.fontWeight) el.style.setProperty("font-weight", typo.fontWeight, "important");
      if (typo.fontStyle) el.style.setProperty("font-style", typo.fontStyle, "important");
      if (typo.textTransform) el.style.setProperty("text-transform", typo.textTransform, "important");
      if (typo.textDecoration) el.style.setProperty("text-decoration", typo.textDecoration, "important");
      if (typo.lineHeight) el.style.setProperty("line-height", typo.lineHeight, "important");
      if (typo.letterSpace) el.style.setProperty("letter-spacing", typo.letterSpace, "important");

      // Apply colors
      const colors = captionStyles.colors || {};
      if (colors.color) el.style.setProperty("color", colors.color, "important");
      if (colors.bg || colors.gradient) {
        const bgVal = colors.bgType === "gradient" ? colors.gradient : colors.bg;
        if (bgVal) el.style.setProperty("background", bgVal, "important");
      }

      // Apply padding
      const padding = captionStyles.padding;
      if (padding) {
        const { side = 2, vertical = "0px", horizontal = "0px", top = "0px", right = "0px", bottom = "0px", left = "0px" } = padding;
        const paddingVal = side === 2 ? `${vertical} ${horizontal}` : `${top} ${right} ${bottom} ${left}`;
        el.style.setProperty("padding", paddingVal, "important");
      }
    };

    // Apply to any currently visible captions
    const applyCurrent = () => {
      const doc1 = document;
      const doc2 = galleryRef.current?.ownerDocument;
      
      const elements = new Set();
      if (doc1) doc1.querySelectorAll(".f-caption").forEach(el => elements.add(el));
      if (doc2) doc2.querySelectorAll(".f-caption").forEach(el => elements.add(el));
      
      elements.forEach(applyStylesToCaption);
    };
    applyCurrent();

    // Watch for Fancybox dynamically adding caption elements
    const observer = new MutationObserver((mutations) => {
      let shouldApply = false;
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node.nodeType === 1) {
            if (
              node.classList?.contains("f-caption") || 
              node.classList?.contains("fancybox__container") ||
              node.classList?.contains("vgbFancyBox") ||
              node.querySelector?.(".f-caption") ||
              node.querySelector?.(".fancybox__container")
            ) {
              shouldApply = true;
              break;
            }
          }
        }
        if (shouldApply) break;
      }
      
      if (shouldApply) {
        applyCurrent();
      }
    });

    const doc1 = document;
    const doc2 = galleryRef.current?.ownerDocument;
    
    if (doc1?.body) observer.observe(doc1.body, { childList: true, subtree: true });
    if (doc2?.body && doc2 !== doc1) observer.observe(doc2.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [attributes.styles?.lightBoxCaption, setActiveIndex]);

  return (
    <>
      <Style
        attributes={attributes}
        id={id}
        itemWidth={itemWidth}
        isEditor={!!setActiveIndex}
        activeFilter={activeFilter}
      />

      <div className={prefix}>
        <VideoGalleryFilter
          attributes={attributes}
          id={id}
          itemWidth={itemWidth}
          setItemWidth={setItemWidth}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
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
                        container: galleryRef.current,
                        mainClass: `vgbFancyBox ${id}-fancyBox`,
                        Toolbar: {
                          display: {
                            left: ["counter"],
                            middle: [],
                            right: [
                              "share",
                              "zoom",
                              "slideshow",
                              "fullscreen",
                              "close",
                            ],
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
                            const videoEls = slide
                              .getContentEl()
                              .querySelectorAll(`video, .fancybox__html5video`);

                            if (
                              typeof Plyr !== "undefined" &&
                              videoEls.length > 0
                            ) {
                              videoEls.forEach((el) => {
                                if (!el.plyr) {
                                  new Plyr(el, {
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
                              });
                            }
                          },
                        },
                      },
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
