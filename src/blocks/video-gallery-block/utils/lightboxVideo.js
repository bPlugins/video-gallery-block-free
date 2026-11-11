import { Fancybox } from "@fancyapps/ui";

/**
 * Video playback in the lightbox: the video on screen plays, the others stop.
 *
 * Fancybox 6 is meant to start a YouTube or Vimeo video by messaging its
 * player once that player says it is ready. For YouTube it finds the player
 * with `document.getElementById()`, which cannot see into the shadow root the
 * front-end lightbox lives in (see lightboxHost.js), so it never learned the
 * player was ready and never started it. It also never stops a video when
 * another slide is chosen -- the slide next to the current one stays on the
 * page, so its sound kept going. Both are handled here instead.
 */

const PLAYER_ORIGIN = /^https:\/\/((www\.)?youtube(-nocookie)?\.com|player\.vimeo\.com)$/;

const PLAY_MESSAGE = {
  youtube: '{"event":"command","func":"playVideo","args":""}',
  vimeo: '{"method":"play"}',
};

const YOUTUBE_MUTE = '{"event":"command","func":"mute","args":""}';
// Playing (1) or loading to play (3): it did start, so leave its sound alone.
const YOUTUBE_STARTED = ["1", "3"];
const BLANK = "about:blank";

const currentSlide = (carousel) => carousel?.getPage?.()?.slides?.[0];

/**
 * Whether a video starts on its own: the gallery's "Autoplay videos in the
 * lightbox" option (`Carousel.vgbAutoplay`, on unless switched off), or a slide
 * that was moved to because the one before it ended and should play
 * (`vgbForcePlay`). Read from the carousel: the first slide loads before
 * `Fancybox.getInstance()` knows the lightbox.
 */
const autoplayOn = (carousel, slide) =>
  !!slide?.vgbForcePlay || false !== carousel?.getOptions?.()?.vgbAutoplay;

const frameOf = (slide) =>
  slide?.contentEl instanceof HTMLIFrameElement ? slide.contentEl : null;

const sendPlay = (slide) => {
  const frame = frameOf(slide);
  if (frame && PLAY_MESSAGE[slide.type]) {
    frame.contentWindow?.postMessage(PLAY_MESSAGE[slide.type], "*");
  }
};

/**
 * Stops a slide's video by unloading its player, not pausing it.
 *
 * A paused YouTube player left on the page makes YouTube freeze the next
 * player of a video already watched there: it shows "playing" at 0:00 and
 * never moves (reproduced with plain embeds, no Fancybox) -- the "sometimes
 * the video does not play" visitors saw. Unloading also silences embeds with
 * no pause command at all, such as Facebook's. The player loads again, from
 * the start, when its slide comes back on screen.
 */
const stopSlide = (slide) => {
  if (slide) delete slide.vgbForcePlay;

  if (slide?.poller) {
    // Fancybox keeps trying to start a slide until it is ready, even after
    // you have moved on -- a slow one then started off screen.
    clearTimeout(slide.poller);
    slide.poller = undefined;
  }

  const frame = frameOf(slide);
  if (frame && frame.src && BLANK !== frame.src) {
    frame.dataset.vgbSrc = frame.src;
    delete frame.dataset.ready;
    delete frame.dataset.state;
    frame.src = BLANK;
  }

  slide?.el?.querySelectorAll("video").forEach((video) => video.pause());
};

/**
 * YouTube only says it is ready after the page asks ("listening"). Fancybox
 * asks once, from the iframe's load event and only when its carousel is
 * already set up -- the first slide often loads before that, so nobody asked,
 * no answer came, and the video you opened stayed still. Keep asking until it
 * answers (the message handler below marks it ready and starts it), it leaves
 * the screen, or about ten seconds pass.
 */
const askYoutubeReady = (carousel, slide, frame) => {
  if ("youtube" !== slide?.type || frame.vgbAsking) return;
  frame.vgbAsking = true;

  let tries = 0;
  const ask = () => {
    if (
      "true" === frame.dataset.ready ||
      !frame.isConnected ||
      currentSlide(carousel) !== slide ||
      ++tries > 40
    ) {
      frame.vgbAsking = false;
      return;
    }
    frame.contentWindow?.postMessage(
      JSON.stringify({ event: "listening", id: frame.id }),
      "*",
    );
    window.setTimeout(ask, 250);
  };
  ask();
};

/** Starts the video on screen, once its player is ready for it. */
export const playCurrentSlide = (carousel) => {
  const slide = currentSlide(carousel);
  const autoplay = autoplayOn(carousel, slide);

  // A video file: Fancybox's own autoplay never started it either.
  const video = slide?.el?.querySelector("video");
  if (video) {
    if (video.paused && autoplay) {
      video.play()?.catch((error) => {
        /*
         * Sound not allowed yet: start it silent, its controls turn sound on.
         * Only for that refusal, and only while it is still on screen -- a
         * quick move to the next slide pauses it, which also rejects play()
         * (AbortError), and retrying then started it off screen.
         */
        if ("NotAllowedError" !== error?.name || currentSlide(carousel) !== slide) {
          return;
        }
        video.muted = true;
        video.play()?.catch(() => {});
      });
    }
    return;
  }

  const frame = frameOf(slide);
  if (!frame) return;

  // Unloaded when you left it: load it again; it starts once it is ready.
  if (frame.dataset.vgbSrc) {
    frame.src = frame.dataset.vgbSrc;
    delete frame.dataset.vgbSrc;
    if (autoplay) askYoutubeReady(carousel, slide, frame);
    return;
  }

  if ("true" !== frame.dataset.ready) {
    if (autoplay) askYoutubeReady(carousel, slide, frame);
    return;
  }

  // Autoplay off: the player waits for its own play button.
  if (!autoplay) return;

  sendPlay(slide);

  /*
   * A browser that only lets a video start on its own when it is silent
   * (Safari, phones) refuses that. Vimeo then starts muted by itself; YouTube
   * just stays still, so start it muted -- its own button turns sound on.
   */
  if ("youtube" === slide.type) {
    window.setTimeout(() => {
      if (
        currentSlide(carousel) === slide &&
        frame.isConnected &&
        "true" === frame.dataset.ready &&
        !YOUTUBE_STARTED.includes(frame.dataset.state)
      ) {
        frame.contentWindow?.postMessage(YOUTUBE_MUTE, "*");
        sendPlay(slide);
      }
    }, 2000);
  }
};

/** Stops every video in the lightbox except the one now on screen. */
export const stopOtherSlides = (carousel) => {
  const current = carousel?.getPage?.()?.slides || [];

  (carousel?.getSlides?.() || []).forEach((slide) => {
    if (!current.includes(slide)) {
      stopSlide(slide);
    }
  });
};

/**
 * Messages from a lightbox player: note when it is ready (YouTube says
 * `onReady`, Vimeo `ready`) and whether YouTube is playing, start it when it
 * is the one on screen, and stop it when it is not.
 */
const onPlayerMessage = (event) => {
  if (!PLAYER_ORIGIN.test(event.origin || "") || "string" !== typeof event.data) {
    return;
  }

  let data;
  try {
    data = JSON.parse(event.data);
  } catch (e) {
    return;
  }

  const state =
    data?.info?.playerState ?? ("onStateChange" === data?.event ? data.info : undefined);
  const isReady = "onReady" === data?.event || "ready" === data?.event;
  if (undefined === state && !isReady) return;

  const instance = Fancybox.getInstance?.();
  const container = instance?.getContainer?.();
  if (!container) return;

  const carousel = instance.getCarousel?.();
  const current = currentSlide(carousel);

  container.querySelectorAll("iframe.f-iframe").forEach((frame) => {
    if (frame.contentWindow !== event.source) return;

    if (current?.contentEl !== frame) {
      // Whatever started a video that is no longer on screen, stop it.
      if (isReady || 1 === Number(state)) {
        stopSlide((carousel?.getSlides?.() || []).find((s) => s.contentEl === frame));
      }
      return;
    }

    if (undefined !== state) {
      frame.dataset.state = String(state);
    }
    if (isReady) {
      frame.dataset.ready = "true";
      playCurrentSlide(carousel);
    }
  });
};

if (typeof window !== "undefined") {
  window.addEventListener("message", onPlayerMessage);
}
