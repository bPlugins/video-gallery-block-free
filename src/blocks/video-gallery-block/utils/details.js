/**
 * "Show channel name": a feed video's channel, shown under its title. The
 * same as vidgalblk_item_channel() in includes/helpers.php, so the editor
 * shows what the page will. Off unless turned on.
 *
 * The channel opens its page in a new tab on the site; in the editor it is
 * plain text. It is a link-like span, not a link: it sits inside the tile's
 * own link, and links cannot nest.
 */
export const itemDetails = (item, options, isEditor) => {
  if (!item || !options?.showChannel) return null;

  const channel = String(item.channel || "").trim();
  if (!channel) return null;

  const url = /^https:\/\//.test(item.channelUrl || "") ? item.channelUrl : "";
  const open = (event) => {
    event.preventDefault();
    event.stopPropagation();
    window.open(url, "_blank", "noopener");
  };

  return url && !isEditor ? (
    <span
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
    <span className="vgbItemChannel">{channel}</span>
  );
};
