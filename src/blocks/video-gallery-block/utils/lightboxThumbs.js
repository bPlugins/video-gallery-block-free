/**
 * A picture for a video file in the lightbox's thumbnail strip.
 *
 * A YouTube or Vimeo video, or one with a poster, always has a picture. A
 * video file without a poster only gets one once the tile's own snapshot
 * (react-video-thumbnail) is done, and Fancybox copies the tile's picture into
 * the strip at the moment the lightbox opens -- so opening it before then left
 * that thumbnail blank. Here a frame is taken from the video itself and put in
 * the strip as soon as it is ready.
 */

const VIDEO_FILE = /\.(mp4|m4v|mov|webm|ogv)(\?|#|$)/i;
const WIDTH = 320;

/** Video URL -> promise of a JPEG data URL ("" when it could not be read). */
const frames = new Map();

/**
 * One frame, two seconds in (or halfway, for a shorter video). A video on
 * another site that does not allow it cannot be drawn on a canvas; that one
 * stays blank, as before.
 */
const videoFrame = (url) => {
  if (!frames.has(url)) {
    frames.set(
      url,
      new Promise((resolve) => {
        const video = document.createElement("video");
        let timer;

        const finish = (src = "") => {
          clearTimeout(timer);
          video.removeAttribute("src");
          video.load();
          resolve(src);
        };

        timer = setTimeout(() => finish(), 15000);

        video.muted = true;
        video.playsInline = true;
        video.preload = "auto";
        video.crossOrigin = "anonymous";
        video.addEventListener("loadedmetadata", () => {
          video.currentTime = Math.min(2, (video.duration || 0) / 2);
        });
        video.addEventListener("seeked", () => {
          try {
            const canvas = document.createElement("canvas");
            canvas.width = WIDTH;
            canvas.height = Math.round(
              (WIDTH * (video.videoHeight || 9)) / (video.videoWidth || 16),
            );
            canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
            finish(canvas.toDataURL("image/jpeg", 0.7));
          } catch (err) {
            void err;
            finish();
          }
        });
        video.addEventListener("error", () => finish());
        video.src = url;
      }),
    );
  }

  return frames.get(url);
};

/**
 * Shown in the strip until the real picture is ready. Fancybox builds the
 * strip only when at least two slides have a picture, and never later, so
 * without this a gallery of video files opened early had no strip at all.
 */
const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Crect width='16' height='9' fill='%23222'/%3E%3C/svg%3E";

const urlOf = (slide) => slide.videoUrl || slide.triggerEl?.dataset?.videoUrl || slide.src || "";

const needsFrame = (slide) =>
  (!slide.thumbSrc || "undefined" === slide.thumbSrc || PLACEHOLDER === slide.thumbSrc) &&
  VIDEO_FILE.test(urlOf(slide));

/** `initSlides`: hold a place in the strip for every video file with no picture. */
export const reserveVideoThumbs = (slides) => {
  (slides || []).forEach((slide) => {
    if (needsFrame(slide)) slide.thumbSrc = PLACEHOLDER;
  });
};

/** `ready`: put a frame of the video in each of those places. */
export const fillVideoThumbs = (fancybox) => {
  const slides = fancybox?.getCarousel?.()?.getSlides?.() || [];

  slides.forEach((slide) => {
    if (!needsFrame(slide)) return;

    videoFrame(urlOf(slide)).then((src) => {
      if (!src) return;

      slide.thumbSrc = src;
      // Fancybox reads this the next time the lightbox opens from the tile.
      if (slide.triggerEl) slide.triggerEl.dataset.thumbSrc = src;

      // Fancybox's thumbnail template gives each image this alt.
      const img = fancybox
        .getContainer?.()
        ?.getRootNode?.()
        ?.querySelector?.(`.f-thumbs img[alt="Thumbnail #${slide.index}"]`);
      if (img) {
        delete img.dataset.lazySrc;
        img.src = src;
      }
    });
  });
};
