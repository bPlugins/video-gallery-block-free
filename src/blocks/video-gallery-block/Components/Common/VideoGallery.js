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
  facebookEmbedUrl,
  getVimeoId,
  getYoutubeId,
  getYoutubeThumbnails,
  isFacebookVideo,
  isYoutubeShort,
  plyrOptions,
  videoProviderId,
} from "../../utils/functions";
import { prefix } from "../../utils/data";
import { sanitizeHTML } from "../../../../../../bpl-tools/utils/common";

/**
 * Turn the <video> in a lightbox slide into a Plyr player.
 *
 * `slide.el` is the slide's root DOM element -- confirmed by Fancybox's own
 * source, which finds a slide's video the same way (`slide.el.querySelector
 * ("video")`). The earlier code called a `getContentEl()` method that does
 * not exist on a CarouselSlide at all (the `?.()` optional call silently
 * no-op'd on `undefined`), and before that, `contentEl` turned out to be the
 * bare `<video>`/`<iframe>` element itself, not a container -- querying
 * *its own* descendants for "video" could never match the element itself.
 */
const initPlyr = (slide) => {
  const videoEls = slide?.el?.querySelectorAll(
    "video, .fancybox__html5video",
  );

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
 * Pushes a GA4-shaped `video_start` event to `window.dataLayer` for the slide
 * that just became active in the lightbox.
 *
 * Fired from Fancybox's `Carousel.contentReady` event rather than only when
 * a gallery item is first clicked, so browsing to the next video with the
 * lightbox's own Next/Prev controls -- not just the initial open -- counts
 * as a play too. `dataLayer.push` is a no-op when nothing is reading it (no
 * GTM/GA4 on the site), so this is safe to call unconditionally once the
 * option is on.
 */
const pushVideoEvent = (slide) => {
  if (typeof window === "undefined") return;

  /*
   * `slide.src` is not always the real video URL by the time this reads it:
   * Fancybox rewrites a YouTube or Vimeo URL into its own player-embed URL
   * (full of its own query params), and a Facebook video's `src` is its
   * embed iframe URL (see `facebookEmbedUrl()`) -- both make for an
   * unreadable `video_url` in Analytics, and fail `videoProviderId()`'s
   * plain URL check. `videoUrl` (set on the item by `showLightbox()`) is the
   * real one; `triggerEl`'s `data-video-url` is the same thing for a slide
   * Fancybox opened on its own via `[data-fancybox]` DOM binding, which
   * never passes through `showLightbox()` at all.
   */
  const url =
    slide?.videoUrl || slide?.triggerEl?.dataset?.videoUrl || slide?.src || "";

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "video_start",
    video_title: slide?.caption || "",
    video_provider: videoProviderId(url),
    video_url: url,
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
const fancyboxOptions = (id, { trackVideoEvents = false } = {}) => ({
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
  on: {
    /*
     * Not `done` -- that was never a real Fancybox v5 event, so the handler
     * silently never ran and Plyr was never actually initialized on a video
     * slide (default HTML5 controls masked this; nothing looked broken).
     * `Carousel.contentReady` is: "content is loaded on one of the slides" --
     * the correct point to both hand a freshly-loaded <video> to Plyr and
     * count a video as started.
     */
    /*
     * Three arguments, not two: the Fancybox API instance, then the
     * Carousel instance the event is prefixed from, then the event's own
     * argument -- here, the CarouselSlide. Easy to miss since most examples
     * only show a two-argument `(fancybox, slide)` handler for Fancybox's
     * own un-prefixed events (`close`, `ready`, ...), which carry no
     * Carousel instance in front.
     */
    "Carousel.contentReady": (fancybox, carousel, slide) => {
      initPlyr(slide);
      if (trackVideoEvents) {
        pushVideoEvent(slide);
      }
    },
  },
});

/** Who a video's consent notice should say it is hosted by. */
const providerName = (video) => {
  if (getYoutubeId(video)) {
    return __("YouTube", "video-gallery-block");
  }

  if (getVimeoId(video)) {
    return __("Vimeo", "video-gallery-block");
  }

  if (isFacebookVideo(video)) {
    return __("Facebook", "video-gallery-block");
  }

  return __("its provider", "video-gallery-block");
};

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
     * YouTube, Vimeo or Facebook page URL to a <video> element cannot work: it
     * fails on CORS and leaves nothing but errors in the console. Those tiles
     * get the empty-tile background from the stylesheet instead.
     */
    if (getYoutubeId(video) || getVimeoId(video) || isFacebookVideo(video)) {
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
  const { videos, albums, options, filter, perPage, loadMoreLabel } = attributes;
  const [activeAlbum, setActiveAlbum] = useState("*");
  const [visibleCount, setVisibleCount] = useState(perPage > 0 ? perPage : Infinity);
  const galleryRef = useRef(null);

  const isEditor = !!setActiveIndex;

  /*
   * Consent gate: off by default (existing galleries keep embedding straight
   * away, exactly as before), and once a visitor accepts it stays accepted --
   * for every gallery already on the page too, via the event below, and for
   * their next visit, via localStorage. Read once at mount rather than on
   * every render, since localStorage is synchronous I/O.
   */
  const consentGateEnabled = !!options?.consentGate;

  // Real plays only -- an editor previewing the gallery while writing a page
  // should not show up in the site's own Analytics as a visitor watching it.
  const gaTrackingEnabled = !!options?.gaTracking && !isEditor;
  const [consentGranted, setConsentGranted] = useState(() => {
    try {
      return "1" === window.localStorage.getItem("vidgalblkVideoConsent");
    } catch (error) {
      return false;
    }
  });
  const [pendingIndex, setPendingIndex] = useState(null);

  useEffect(() => {
    if (!consentGateEnabled || consentGranted) {
      return;
    }

    const onConsentGranted = () => setConsentGranted(true);
    window.addEventListener("vidgalblkConsentGranted", onConsentGranted);

    return () =>
      window.removeEventListener("vidgalblkConsentGranted", onConsentGranted);
  }, [consentGateEnabled, consentGranted]);

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
    let list = (Array.isArray(videos) ? videos : [])
      .map((item, index) => ({ item, index }))
      // An entry with neither a video nor a poster has nothing to show and
      // nowhere to go. The editor keeps it -- that is a row someone is still
      // filling in -- but a visitor should not be given a dead tile, and
      // render.php leaves it out of the server markup for the same reason.
      .filter(({ item }) => item && (isEditor || item.video || item.poster));

    /*
     * Shorts, included, excluded, or kept as the only videos: an editorial
     * choice the gallery owner makes once, applied here so the editor's
     * preview matches what render.php already did for the front end -- the
     * front end's own `videos` attribute has already been filtered to this by
     * the time it reaches this component, so this is a no-op there and only
     * does real work in the editor's live preview.
     */
    const shortsFilter = options?.shortsFilter;
    if ("hide" === shortsFilter || "only" === shortsFilter) {
      const wantShorts = "only" === shortsFilter;
      list = list.filter(
        ({ item }) => isYoutubeShort(item.video) === wantShorts,
      );
    }

    /*
     * Same reasoning as the Shorts filter just above: reordered here only so
     * the editor's live preview matches what render.php already did for the
     * front end, whose `videos` attribute arrives pre-sorted. A video from
     * before this option existed has no `dateAdded` and sorts as the oldest
     * possible entry, same as the PHP side.
     */
    const sortOrder = options?.sortOrder;
    if ("newest" === sortOrder || "oldest" === sortOrder) {
      list = [...list].sort((a, b) => {
        const aDate = a.item?.dateAdded || 0;
        const bDate = b.item?.dateAdded || 0;
        return "newest" === sortOrder ? bDate - aDate : aDate - bDate;
      });
    }

    if ("*" === activeAlbum) {
      return list;
    }

    return list.filter(({ item }) =>
      (Array.isArray(item?.albs) ? item.albs : []).includes(activeAlbum),
    );
  }, [videos, activeAlbum, isEditor, options?.shortsFilter, options?.sortOrder]);

  // An album that has been renamed or deleted must not leave the gallery stuck
  // on a filter that now matches nothing.
  useEffect(() => {
    if ("*" !== activeAlbum && !(albums || []).includes(activeAlbum)) {
      setActiveAlbum("*");
    }
  }, [albums, activeAlbum]);

  /*
   * Switching albums re-starts pagination at the first page. Without this, a
   * visitor who had clicked "Load More" down to 30 revealed videos, then
   * filtered to an album with only 4, would find every one of those 4 already
   * revealed and no "Load More" button -- correct, but confusing the first
   * time it happens -- and switching to a third album would carry that same
   * arbitrary count into a set of videos it was never chosen for.
   */
  useEffect(() => {
    setVisibleCount(perPage > 0 ? perPage : Infinity);
  }, [activeAlbum, perPage]);

  const revealedVideos =
    perPage > 0 ? visibleVideos.slice(0, visibleCount) : visibleVideos;
  const hasMore = revealedVideos.length < visibleVideos.length;

  // Lightbox, front end only -- in the editor it is opened imperatively below
  // so that clicking a thumbnail also selects that video for editing.
  useEffect(() => {
    if (isEditor || !galleryRef.current) return;

    const container = galleryRef.current;
    Fancybox.bind(
      container,
      "[data-fancybox]",
      fancyboxOptions(id, { trackVideoEvents: gaTrackingEnabled }),
    );

    return () => {
      /*
       * `unbind`, not `destroy`. `Fancybox.destroy()` is static and tears down
       * every instance on the page, so a second gallery unmounting used to
       * break the first one -- and any other plugin using Fancybox with it.
       */
      Fancybox.unbind(container);
      Fancybox.close();
    };
  }, [id, isEditor, gaTrackingEnabled]);

  /*
   * Opens the lightbox at a given video's original index, in the editor and
   * on the front end alike. The editor shows every video regardless of
   * filters (that is a row someone may still be editing), so it groups from
   * the raw `videos` array; the front end groups from `revealedVideos` so the
   * lightbox contains exactly the tiles a visitor can see and cycle through,
   * matching what Fancybox's own DOM auto-binding would have grouped.
   */
  const showLightbox = (index) => {
    if (isEditor) {
      setActiveIndex(index);
    }

    const group = isEditor
      ? videos.map((item, i) => ({ item, index: i }))
      : revealedVideos;
    const startIndex = Math.max(
      0,
      group.findIndex(({ index: i }) => i === index),
    );

    Fancybox.show(
      group.map(({ item }) => {
        const rawSrc = item.video || item.poster;
        const facebook = isFacebookVideo(rawSrc);

        return {
          // Facebook's embed needs its own iframe URL as `src` (see
          // `facebookEmbedUrl()`), but `videoUrl` keeps the real, clean URL
          // around for GA4 tracking below -- an embed URL full of query
          // params makes for an unreadable `video_url` in Analytics reports,
          // and would also fail the plain `isFacebookVideo()` check there.
          src: facebook ? facebookEmbedUrl(rawSrc) : rawSrc,
          type: facebook ? "iframe" : undefined,
          videoUrl: rawSrc,
          thumb: item.poster || getYoutubeThumbnails(item.video)[0] || "",
          caption: sanitizeHTML(item.caption || ""),
        };
      }),
      {
        startIndex,
        ...fancyboxOptions(id, { trackVideoEvents: gaTrackingEnabled }),
      },
    );
  };

  const acceptConsent = () => {
    try {
      window.localStorage.setItem("vidgalblkVideoConsent", "1");
    } catch (error) {
      // Private browsing or storage disabled: consent still applies for the
      // rest of this page view via state, just isn't remembered afterward.
    }

    setConsentGranted(true);
    window.dispatchEvent(new Event("vidgalblkConsentGranted"));

    const index = pendingIndex;
    setPendingIndex(null);

    if (null !== index) {
      showLightbox(index);
    }
  };

  const pendingVideo = null !== pendingIndex ? videos[pendingIndex] : null;

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
          {revealedVideos.map(({ item, index }) => {
            const { video, poster, caption = "", albs } = item;
            const label = captionText(caption);
            const gated = consentGateEnabled && !consentGranted;

            return (
              <a
                key={index}
                className={`galleryItem ${albumClasses(albums, albs)} ${
                  isEditor && index === activeIndex ? "bPlNowEditing" : ""
                }`}
                {...(gated ? {} : { "data-fancybox": true })}
                {...(!gated && isFacebookVideo(video)
                  ? { "data-src": facebookEmbedUrl(video), "data-type": "iframe" }
                  : {})}
                {...(gated
                  ? {}
                  : {
                      /*
                       * The real video URL, for GA4 tracking: Fancybox
                       * rewrites YouTube/Vimeo URLs into its own player
                       * embed URL (full of its own query params) by the time
                       * `slide.src` is read at `Carousel.contentReady`, and
                       * the Facebook case above needs its embed iframe URL
                       * as `data-src` instead of the real one. This is the
                       * one place `pushVideoEvent()` can still get the
                       * original, clean URL from for a video opened via
                       * native `[data-fancybox]` binding rather than
                       * `showLightbox()`.
                       */
                      "data-video-url": video || poster,
                    })}
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
                  if (gated) {
                    e.preventDefault();
                    e.stopPropagation();
                    setPendingIndex(index);
                    return;
                  }

                  if (!isEditor) return;
                  e.preventDefault();
                  e.stopPropagation();
                  showLightbox(index);
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

                {false !== options?.showPlayIcon && (
                  <span className="playIcon" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                )}
              </a>
            );
          })}
        </div>

        {hasMore && (
          <button
            type="button"
            className="vidgalblkLoadMore"
            onClick={() =>
              setVisibleCount((count) =>
                Math.min(count + perPage, visibleVideos.length),
              )
            }>
            {loadMoreLabel || __("Load More", "video-gallery-block")}
          </button>
        )}
      </div>

      {pendingVideo && (
        <div className="vidgalblkConsentGate" role="dialog" aria-modal="true">
          <div className="vidgalblkConsentGateBox">
            <p>
              {sprintf(
                /* translators: %s: video provider name, e.g. YouTube. */
                __(
                  "This video is hosted by %s. Playing it loads their player and shares data with them, in line with their privacy policy.",
                  "video-gallery-block",
                ),
                providerName(pendingVideo.video),
              )}
            </p>
            <div className="vidgalblkConsentGateActions">
              <button
                type="button"
                className="vidgalblkConsentGateAccept"
                onClick={acceptConsent}>
                {__("Play Video", "video-gallery-block")}
              </button>
              <button
                type="button"
                className="vidgalblkConsentGateCancel"
                onClick={() => setPendingIndex(null)}>
                {__("Cancel", "video-gallery-block")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoGallery;
