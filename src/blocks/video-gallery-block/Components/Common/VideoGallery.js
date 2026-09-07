import { useState, useEffect, useMemo, useRef } from "react";
import { __, sprintf } from "@wordpress/i18n";
import { Fancybox } from "@fancyapps/ui";
import VideoThumbnail from "react-video-thumbnail";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

import Style from "./Style";
import VideoGalleryFilter from "./VideoGalleryFilter";
import {
  albumClasses,
  captionText,
  getVimeoId,
  getYoutubeId,
  getYoutubeThumbnails,
  plyrOptions,
} from "../../utils/functions";
import { prefix } from "../../utils/data";
import { sanitizeHTML } from "../../../../../../bpl-tools/utils/common";

/**
 * Turn the <video> in a lightbox slide into a Plyr player.
 */
const initPlyr = (slide) => {
  const videoEls = slide
    ?.getContentEl?.()
    ?.querySelectorAll("video, .fancybox__html5video");

  if (typeof Plyr === "undefined" || !videoEls?.length) {
    return;
  }

  videoEls.forEach((el) => {
    if (!el.plyr) {
      new Plyr(el, plyrOptions);
    }
  });
};

/**
 * Shared lightbox configuration.
 *
 * No `container`: the lightbox belongs to <body>, so it covers the screen. It
 * used to be mounted inside the gallery itself, which put it underneath any
 * themed ancestor with `overflow: hidden`, a `transform`, or a stacking
 * context of its own -- and then it was clipped rather than covering anything.
 */
const fancyboxOptions = (id) => ({
  mainClass: `vidgalblkFancyBox ${id}-fancyBox`,
  Toolbar: {
    display: {
      left: ["counter"],
      middle: [],
      right: ["share", "zoom", "slideshow", "fullscreen", "close"],
    },
  },
  Carousel: { infinite: false },
  Thumbs: { autoStart: true },
  contentClick: "toggleZoom",
  on: { done: (fancybox, slide) => initPlyr(slide) },
});

/**
 * A thumbnail that steps down through the sources it could have.
 *
 * A poster the user set wins; then anything the server resolved (this is how a
 * Vimeo thumbnail arrives); then YouTube's own thumbnails, best first. Stepping
 * down on `error` is what stops a missing `maxresdefault.jpg` -- YouTube does
 * not have one for every video -- from showing as a broken image.
 */
const Thumbnail = ({ video, poster, thumb, caption }) => {
  const candidates = useMemo(
    () =>
      [...new Set([poster, thumb, ...getYoutubeThumbnails(video)].filter(Boolean))],
    [poster, thumb, video],
  );

  const [index, setIndex] = useState(0);

  useEffect(() => setIndex(0), [candidates]);

  if (!candidates.length) {
    /*
     * Nothing to point at, so fall back to grabbing a frame out of the video
     * itself -- but only for a file the browser could actually read. Handing a
     * YouTube or Vimeo page URL to a <video> element cannot work: it fails on
     * CORS and leaves nothing but errors in the console. Those tiles get the
     * empty-tile background from the stylesheet instead.
     */
    if (getYoutubeId(video) || getVimeoId(video)) {
      return null;
    }

    return <VideoThumbnail width={600} videoUrl={video} snapshotAtTime={2} />;
  }

  if (index >= candidates.length) {
    return null;
  }

  return (
    <figure className="galleryFigure">
      <img
        src={candidates[index]}
        alt={captionText(caption)}
        loading="lazy"
        decoding="async"
        onError={() => setIndex((current) => current + 1)}
      />
    </figure>
  );
};

const VideoGallery = ({
  attributes,
  id,
  thumbs,
  activeIndex,
  setActiveIndex,
}) => {
  const { videos, albums, options, filter } = attributes;
  const [activeAlbum, setActiveAlbum] = useState("*");
  const galleryRef = useRef(null);

  const isEditor = !!setActiveIndex;

  /*
   * Which videos are on screen.
   *
   * Filtering happens here rather than by hiding items with CSS, which is what
   * Isotope used to do. Two things fall out of that: the lightbox now cycles
   * only the videos the visitor can actually see, and filtering no longer needs
   * jQuery and Isotope to be present and working -- it used to fail silently
   * when they were not, which is a common outcome on sites that defer or
   * dequeue jQuery.
   *
   * The original index is carried along because the editor needs it to know
   * which item is being edited.
   */
  const visibleVideos = useMemo(() => {
    const list = (Array.isArray(videos) ? videos : [])
      .map((item, index) => ({ item, index }))
      // An entry with neither a video nor a poster has nothing to show and
      // nowhere to go. The editor keeps it -- that is a row someone is still
      // filling in -- but a visitor should not be given a dead tile, and
      // render.php leaves it out of the server markup for the same reason.
      .filter(({ item }) => item && (isEditor || item.video || item.poster));

    if ("*" === activeAlbum) {
      return list;
    }

    return list.filter(({ item }) =>
      (Array.isArray(item?.albs) ? item.albs : []).includes(activeAlbum),
    );
  }, [videos, activeAlbum, isEditor]);

  // An album that has been renamed or deleted must not leave the gallery stuck
  // on a filter that now matches nothing.
  useEffect(() => {
    if ("*" !== activeAlbum && !(albums || []).includes(activeAlbum)) {
      setActiveAlbum("*");
    }
  }, [albums, activeAlbum]);

  // Lightbox, front end only -- in the editor it is opened imperatively below
  // so that clicking a thumbnail also selects that video for editing.
  useEffect(() => {
    if (isEditor || !galleryRef.current) return;

    const container = galleryRef.current;
    Fancybox.bind(container, "[data-fancybox]", fancyboxOptions(id));

    return () => {
      /*
       * `unbind`, not `destroy`. `Fancybox.destroy()` is static and tears down
       * every instance on the page, so a second gallery unmounting used to
       * break the first one -- and any other plugin using Fancybox with it.
       */
      Fancybox.unbind(container);
      Fancybox.close();
    };
  }, [id, isEditor]);

  const openEditorLightbox = (index) => {
    setActiveIndex(index);

    Fancybox.show(
      videos.map((video) => ({
        src: video.video || video.poster,
        thumb: video.poster || getYoutubeThumbnails(video.video)[0] || "",
        caption: sanitizeHTML(video.caption || ""),
      })),
      {
        startIndex: index,
        ...fancyboxOptions(id),
      },
    );
  };

  const showFilter =
    false !== filter?.show && !!albums?.length && !!filter?.commonLabel;

  return (
    <>
      <Style
        attributes={attributes}
        id={id}
        isEditor={isEditor}
        galleryRef={galleryRef}
      />

      <div className={prefix}>
        {showFilter && (
          <VideoGalleryFilter
            attributes={attributes}
            id={id}
            activeAlbum={activeAlbum}
            setActiveAlbum={setActiveAlbum}
          />
        )}

        <div id={`${id}-gallery`} className="videoGallery" ref={galleryRef}>
          {visibleVideos.map(({ item, index }) => {
            const { video, poster, caption = "", albs } = item;
            const label = captionText(caption);

            return (
              <a
                key={index}
                className={`galleryItem ${albumClasses(albums, albs)} ${
                  isEditor && index === activeIndex ? "bPlNowEditing" : ""
                }`}
                data-fancybox
                href={video || poster}
                aria-label={
                  label ||
                  sprintf(
                    /* translators: %d: video number within the gallery. */
                    __("Play video %d", "video-gallery-block"),
                    index + 1,
                  )
                }
                onClick={(e) => {
                  if (!isEditor) return;
                  e.preventDefault();
                  e.stopPropagation();
                  openEditorLightbox(index);
                }}
                data-caption={sanitizeHTML(caption)}>
                <Thumbnail
                  video={video}
                  poster={poster}
                  thumb={thumbs?.[index]}
                  caption={caption}
                />

                {options?.showCaptionOnThumbnail && caption && (
                  <div
                    className="galleryItemCaption"
                    /*
                     * The caption is run through sanitizeHTML, which returns
                     * markup -- so it has to be set as markup. Rendering the
                     * returned string as a React child, which is what happened
                     * before, escaped it, and a caption with any formatting in
                     * it showed the visitor literal <b> tags.
                     */
                    dangerouslySetInnerHTML={{ __html: sanitizeHTML(caption) }}
                  />
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
