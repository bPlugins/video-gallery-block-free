import { createRoot } from "react-dom/client";
import "./style.scss";
import VideoGallery from "./Components/Common/VideoGallery";

const readJSON = (value, fallback) => {
  if (!value) return fallback;

  try {
    return JSON.parse(value);
  } catch (error) {
    return fallback;
  }
};

const mountGalleries = () => {
  const galleryEls = document.querySelectorAll(".wp-block-vgb-video-gallery");

  galleryEls.forEach((galleryEl) => {
    /*
     * Each gallery is mounted on its own.
     *
     * This used to parse the attributes straight into `JSON.parse` inside the
     * loop with nothing around it, so one gallery whose data attribute was
     * missing or had been rewritten by something else -- an HTML minifier, a
     * translation layer -- threw and stopped the loop, taking every other
     * gallery on the page down with it.
     */
    const attributes = readJSON(galleryEl.dataset.attributes, null);

    if (!attributes) {
      return;
    }

    // Thumbnails the server resolved for us, index-aligned with `videos`. This
    // is how a Vimeo poster gets here without the browser having to ask Vimeo.
    const thumbs = readJSON(galleryEl.dataset.thumbs, []);

    try {
      createRoot(galleryEl).render(
        <VideoGallery
          attributes={attributes}
          thumbs={thumbs}
          id={galleryEl.id}
        />,
      );

      galleryEl.removeAttribute("data-attributes");
      galleryEl.removeAttribute("data-thumbs");
    } catch (error) {
      // Leave the server-rendered markup in place: a gallery that cannot be
      // enhanced is still a gallery of links to the videos.
      // eslint-disable-next-line no-console
      console.error("Video Gallery Block: could not mount gallery.", error);
    }
  });
};

/*
 * `DOMContentLoaded` may already have fired by the time this runs.
 *
 * That is not an edge case: performance plugins that delay or lazy-load
 * JavaScript (WP Rocket's "Delay JavaScript execution", LiteSpeed, Perfmatters)
 * execute this script well after the event, and the previous version only
 * listened for it -- so on those sites the gallery never rendered at all and
 * the visitor saw an empty space.
 */
if ("loading" === document.readyState) {
  document.addEventListener("DOMContentLoaded", mountGalleries);
} else {
  mountGalleries();
}
