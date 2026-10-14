import { useEffect, useRef } from "react";

import {
  facebookEmbedUrl,
  getVimeoId,
  getYoutubeId,
  isFacebookVideo,
} from "../../utils/functions";

const ALLOW = "autoplay; fullscreen; picture-in-picture; encrypted-media";
const VIDEO_FILE = /\.(mp4|m4v|webm|ogv|ogg|mov)(?:[?#]|$)/i;

/**
 * How a video can play inside its own tile, or null when it cannot -- a
 * poster-only item, or a link that is neither a known provider nor a video
 * file. Those keep opening in the lightbox.
 *
 * @param {string} url Video URL.
 * @return {Object|null} `{ kind: "iframe"|"video", src }`.
 */
export const inlineSource = (url) => {
  if (!url || typeof url !== "string") return null;

  const youtubeId = getYoutubeId(url);
  if (youtubeId) {
    return {
      kind: "iframe",
      // `enablejsapi` lets the play tracking hear the player, as in the lightbox.
      src: `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&playsinline=1&enablejsapi=1`,
    };
  }

  const vimeoId = getVimeoId(url);
  if (vimeoId) {
    // An unlisted video only plays with the hash its link carries.
    const hash =
      url.match(/vimeo\.com\/(?:video\/)?\d{6,}\/([0-9a-f]{6,})/i)?.[1] ||
      url.match(/[?&]h=([0-9a-f]+)/i)?.[1];
    return {
      kind: "iframe",
      src: `https://player.vimeo.com/video/${vimeoId}?autoplay=1&dnt=1${hash ? `&h=${hash}` : ""}`,
    };
  }

  if (isFacebookVideo(url)) {
    return { kind: "iframe", src: `${facebookEmbedUrl(url)}&autoplay=true` };
  }

  if (VIDEO_FILE.test(url)) {
    return { kind: "video", src: url };
  }

  return null;
};

const attr = (value) =>
  String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

/**
 * A video playing in place of its thumbnail.
 *
 * On the page the provider's player goes straight into the tile. In the editor
 * it cannot: the canvas document has no usable origin, so YouTube refuses to
 * play there (error 153). There the player is written into a blank frame of
 * its own, which takes the admin page's origin and so gives the provider the
 * referrer it wants -- the same way core's SandBox embeds work. Either way the
 * viewer sees the provider's own player, so the editor matches the page.
 *
 * A video file uses the browser's own player in both places, for the same
 * reason.
 */
const InlinePlayer = ({ source, title, poster, isEditor }) => {
  const frameRef = useRef(null);
  const useHostFrame = isEditor && "iframe" === source.kind;

  useEffect(() => {
    if (!useHostFrame) return;

    let doc = null;
    try {
      doc = frameRef.current?.contentDocument;
    } catch (error) {
      doc = null;
    }
    if (!doc) return;

    doc.open();
    doc.write(
      "<!DOCTYPE html><html><head><meta charset='utf-8'><style>" +
        "html,body{margin:0;width:100%;height:100%;overflow:hidden;background:#000}" +
        "iframe{position:absolute;top:0;left:0;width:100%;height:100%;border:0}" +
        `</style></head><body><iframe src="${attr(source.src)}" title="${attr(title || "Video")}" allow="${ALLOW}" allowfullscreen></iframe></body></html>`,
    );
    doc.close();
  }, [useHostFrame, source.src, title]);

  if ("video" === source.kind) {
    return (
      <video
        className="vgbInlineMedia"
        src={source.src}
        poster={poster || undefined}
        controls
        autoPlay
        playsInline
      />
    );
  }

  if (useHostFrame) {
    return (
      <iframe
        ref={frameRef}
        className="vgbInlineMedia"
        title={title || "Video"}
        allow={ALLOW}
        allowFullScreen
        // allow-same-origin keeps the written document on the admin origin,
        // which is what gives the provider a usable referrer.
        sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
      />
    );
  }

  return (
    <iframe
      className="vgbInlineMedia"
      src={source.src}
      title={title || "Video"}
      allow={ALLOW}
      allowFullScreen
    />
  );
};

export default InlinePlayer;
