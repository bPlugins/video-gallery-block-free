/**
 * Tell when a visitor really plays, and how far through, a video inside the
 * lightbox.
 *
 * Opening the lightbox only shows the player; it is not a play. Each provider
 * reports playback differently, so this listens the way each one allows:
 *
 *  - Self-hosted file: the <video> element's own `play`, `timeupdate` and
 *    `ended` events.
 *  - YouTube: the iframe API's messages (`onStateChange`, and the
 *    `infoDelivery` stream that carries the current time and duration).
 *  - Vimeo: the player's `play`, `timeupdate` and `ended` messages.
 *  - Facebook: its embed gives the page no events at all, so a Facebook video
 *    can only be counted as opened, never as played.
 *
 * `watchPlay()` is safe to call again and again for the same slide (the
 * lightbox fires several events as a slide loads); it wires each slide once.
 * `onPlay` and `onComplete` fire at most once per slide, and `onProgress` once
 * for each of the 25, 50 and 75 percent marks.
 */

const MARKS = [25, 50, 75];

const hostOf = (origin) => {
  try {
    return new URL(origin).hostname;
  } catch (err) {
    void err;
    return "";
  }
};

const isYoutubeHost = (host) => /(^|\.)youtube(-nocookie)?\.com$/.test(host);
const isVimeoHost = (host) => /(^|\.)vimeo\.com$/.test(host);

/** iframe element -> tracker for every provider iframe being watched. */
const watchedFrames = new WeakMap();

/** Remembers what has been reported so each moment is reported once. */
const makeTracker = ({ onPlay, onProgress, onComplete }) => {
  const sent = new Set();
  const once = (key, fn) => {
    if (sent.has(key)) return;
    sent.add(key);
    fn?.();
  };

  return {
    play: () => once("play", onPlay),
    complete: () => once("complete", onComplete),
    /** `percent` is 0-100. Reports every mark the video has now passed. */
    progress: (percent) => {
      if (!(percent > 0)) return;
      MARKS.forEach((mark) => {
        if (percent >= mark) once(`p${mark}`, () => onProgress?.(mark));
      });
    },
  };
};

const post = (frame, message) => {
  try {
    frame.contentWindow?.postMessage(JSON.stringify(message), "*");
  } catch (err) {
    void err;
  }
};

/** Ask a YouTube or Vimeo iframe to start sending its player events. */
const subscribe = (frame) => {
  const host = hostOf(frame.src);

  if (isYoutubeHost(host)) {
    post(frame, { event: "listening", id: frame.id || "vgb", channel: "widget" });
    post(frame, {
      event: "command",
      func: "addEventListener",
      args: ["onStateChange"],
      id: frame.id || "vgb",
      channel: "widget",
    });
  } else if (isVimeoHost(host)) {
    ["play", "timeupdate", "ended"].forEach((value) =>
      post(frame, { method: "addEventListener", value }),
    );
  }
};

const onMessage = (event) => {
  const host = hostOf(event.origin);

  if (!isYoutubeHost(host) && !isVimeoHost(host)) return;

  let data = event.data;
  if (typeof data === "string") {
    try {
      data = JSON.parse(data);
    } catch (err) {
      void err;
      return;
    }
  }
  if (!data || typeof data !== "object") return;

  const frame = Array.from(document.querySelectorAll("iframe")).find(
    (f) => f.contentWindow === event.source,
  );
  const tracker = frame && watchedFrames.get(frame);
  if (!tracker) return;

  if (isYoutubeHost(host)) {
    const info = data.info;
    const state =
      data.event === "onStateChange"
        ? info
        : data.event === "infoDelivery"
          ? info?.playerState
          : undefined;

    if (state === 1) tracker.play();
    if (state === 0) {
      tracker.progress(100);
      tracker.complete();
    }
    if (
      data.event === "infoDelivery" &&
      info?.duration > 0 &&
      info?.currentTime >= 0 &&
      info?.playerState === 1
    ) {
      tracker.progress((info.currentTime / info.duration) * 100);
    }
  } else if (data.event === "play") {
    tracker.play();
  } else if (data.event === "timeupdate") {
    // Vimeo reports `percent` as a 0-1 fraction.
    tracker.progress((data.data?.percent || 0) * 100);
  } else if (data.event === "ended") {
    tracker.progress(100);
    tracker.complete();
  } else if (data.event === "ready") {
    // Vimeo only accepts subscriptions once its player says it is ready.
    subscribe(frame);
  }
};

let listening = false;

/**
 * @param {Object}   slide     The lightbox slide to watch.
 * @param {Function|Object} handlers Either an `onPlay` callback, or
 *   `{ onPlay, onProgress(mark), onComplete }`.
 */
export const watchPlay = (slide, handlers) => {
  const root = slide?.el;
  if (!root || typeof window === "undefined") return;

  const tracker = makeTracker(
    typeof handlers === "function" ? { onPlay: handlers } : handlers || {},
  );

  if (!listening) {
    window.addEventListener("message", onMessage);
    listening = true;
  }

  root.querySelectorAll("video").forEach((video) => {
    if (video.vgbPlayWatched) return;
    video.vgbPlayWatched = true;
    video.addEventListener("play", tracker.play);
    video.addEventListener("timeupdate", () => {
      if (video.duration > 0) {
        tracker.progress((video.currentTime / video.duration) * 100);
      }
    });
    video.addEventListener("ended", () => {
      tracker.progress(100);
      tracker.complete();
    });
  });

  root.querySelectorAll("iframe").forEach((frame) => {
    if (!watchedFrames.has(frame)) {
      watchedFrames.set(frame, tracker);
      frame.addEventListener("load", () => subscribe(frame));
    }
    // The frame may already be loaded by the time the slide is ready.
    subscribe(frame);
  });
};
