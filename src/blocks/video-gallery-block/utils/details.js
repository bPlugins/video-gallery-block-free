import { __, _n, sprintf } from "@wordpress/i18n";

/** When the video was uploaded (its `uploadDate`), in Unix seconds, or 0. */
export const uploadTimestamp = (item) => {
  const parsed = item?.uploadDate ? Date.parse(item.uploadDate) : NaN;
  return isNaN(parsed) ? 0 : Math.floor(parsed / 1000);
};

/**
 * "3 days ago": how long ago, in the largest whole unit. The same steps and
 * words as vidgalblk_time_ago() in includes/helpers.php.
 */
export const timeAgo = (seconds, now = Date.now() / 1000) => {
  const diff = Math.max(0, Math.floor(now - seconds));
  const steps = [
    [31536000, (n) => _n("%s year ago", "%s years ago", n, "video-gallery-block")],
    [2592000, (n) => _n("%s month ago", "%s months ago", n, "video-gallery-block")],
    [604800, (n) => _n("%s week ago", "%s weeks ago", n, "video-gallery-block")],
    [86400, (n) => _n("%s day ago", "%s days ago", n, "video-gallery-block")],
    [3600, (n) => _n("%s hour ago", "%s hours ago", n, "video-gallery-block")],
    [60, (n) => _n("%s minute ago", "%s minutes ago", n, "video-gallery-block")],
  ];
  for (const [size, words] of steps) {
    if (diff >= size) {
      const count = Math.floor(diff / size);
      return sprintf(words(count), count);
    }
  }
  return __("Just now", "video-gallery-block");
};

/**
 * "Show channel name" and "Show upload time": a video's channel and how long
 * ago it was uploaded, shown under its title and joined by " · ". The same
 * as vidgalblk_item_details() in includes/helpers.php, so the editor shows
 * what the page will. Both off unless turned on.
 *
 * The channel opens its page in a new tab on the site; in the editor it is
 * plain text. It is a link-like span, not a link: it sits inside the tile's
 * own link, and links cannot nest.
 */
export const itemDetails = (item, options, isEditor) => {
  if (!item || !(options?.showChannel || options?.showUploadTime)) return null;

  const parts = [];
  const channel = options?.showChannel ? String(item.channel || "").trim() : "";

  if (channel) {
    const url = /^https:\/\//.test(item.channelUrl || "") ? item.channelUrl : "";
    const open = (event) => {
      event.preventDefault();
      event.stopPropagation();
      window.open(url, "_blank", "noopener");
    };

    parts.push(
      url && !isEditor ? (
        <span
          key="channel"
          className="vgbItemChannel"
          role="link"
          tabIndex={0}
          data-href={url}
          // Capture: the lightbox listens on the gallery, below the React root.
          onClickCapture={open}
          onKeyDown={(event) => {
            if ("Enter" === event.key) open(event);
          }}>
          {channel}
        </span>
      ) : (
        <span key="channel" className="vgbItemChannel">
          {channel}
        </span>
      ),
    );
  }

  const uploaded = options?.showUploadTime ? uploadTimestamp(item) : 0;
  if (uploaded) {
    parts.push(
      <time key="time" className="vgbItemTime" dateTime={new Date(uploaded * 1000).toISOString()}>
        {timeAgo(uploaded)}
      </time>,
    );
  }

  if (!parts.length) return null;

  return parts.flatMap((part, i) => (i ? [" · ", part] : [part]));
};
