/**
 * Editor helpers for adding and organizing the gallery's own videos
 * ("My videos"): from the Media Library, from files dropped on the canvas,
 * from a channel feed, and moving a video to another place in the list.
 *
 * Every new video gets the same shape a video added by hand gets (see
 * `newItem` in Settings.js and BulkImport.js), so nothing downstream -- the
 * editor preview, render.php, the page script -- can tell them apart.
 */

/** Media Library's stand-in icon for a file with no picture of its own. */
const isDefaultIcon = (src) => !src || /\/wp-includes\/images\/media\//.test(src);

/**
 * A Media Library video (a `wp.media` attachment, or the object
 * mediaUpload() hands back) as a gallery video.
 *
 * @param {Object} attachment The attachment.
 * @param {number} dateAdded  Milliseconds; see BulkImport.js.
 * @return {Object|null} The new video, or null for anything that is not one.
 */
export const attachmentToItem = (attachment, dateAdded) => {
  const url = attachment?.url || attachment?.source_url || "";
  const mime = attachment?.mime || attachment?.mime_type || "";

  if (!url || (mime && !mime.startsWith("video/"))) {
    return null;
  }

  const title =
    "string" === typeof attachment.title
      ? attachment.title
      : attachment.title?.raw || attachment.title?.rendered || "";
  // Only a picture WordPress really has for the video (its featured image),
  // never the generic film icon it shows when there is none.
  const imageSrc = attachment.image?.src || attachment.poster;

  return {
    video: url,
    poster: isDefaultIcon(imageSrc) ? "" : imageSrc,
    caption: title,
    albs: [],
    dateAdded,
  };
};

/**
 * A channel feed's video as a video of the gallery's own: what the feed shows
 * for it today. Counts and the live badge are left behind -- they would only
 * go stale in a list that no longer updates itself.
 *
 * @param {Object} item      A feed video.
 * @param {number} dateAdded Fallback stamp for a video without a date.
 * @return {Object} The new video.
 */
export const feedItemToItem = (item, dateAdded) => {
  const copy = {
    video: item?.video || "",
    poster: item?.poster || "",
    caption: item?.caption || "",
    albs: [],
    dateAdded: Number(item?.dateAdded) > 0 ? Number(item.dateAdded) : dateAdded,
  };

  if (item?.uploadDate) {
    copy.uploadDate = item.uploadDate;
  }
  if (item?.duration) {
    copy.duration = item.duration;
  }

  return copy;
};

/**
 * New videos after the ones already there, leaving out any whose link is
 * already in the gallery (or twice in the new ones).
 *
 * @param {Array} videos The gallery's videos.
 * @param {Array} items  Videos to add.
 * @return {{videos: Array, added: number, duplicates: number}} The result.
 */
export const appendUnique = (videos, items) => {
  const list = Array.isArray(videos) ? videos : [];
  const seen = new Set(list.map((item) => (item?.video || "").trim()).filter(Boolean));
  const added = [];
  let duplicates = 0;

  items.forEach((item) => {
    const url = (item?.video || "").trim();

    if (!url) {
      return;
    }
    if (seen.has(url)) {
      duplicates += 1;
      return;
    }
    seen.add(url);
    added.push(item);
  });

  return { videos: [...list, ...added], added: added.length, duplicates };
};

/**
 * The list with one video moved, and where the video being edited is now.
 *
 * @param {Array}  videos The gallery's videos.
 * @param {number} from   Index of the video to move.
 * @param {number} to     Index it moves to.
 * @param {number} active Index of the video being edited.
 * @return {{videos: Array, active: number}|null} Null when nothing moves.
 */
export const moveItem = (videos, from, to, active) => {
  const list = Array.isArray(videos) ? videos : [];

  if (from === to || !list[from] || to < 0 || to >= list.length) {
    return null;
  }

  const next = [...list];
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);

  let nextActive = active;
  if (active === from) {
    nextActive = to;
  } else if (from < active && to >= active) {
    nextActive = active - 1;
  } else if (from > active && to <= active) {
    nextActive = active + 1;
  }

  return { videos: next, active: nextActive };
};

/** Whether a dropped or picked file is a video. */
export const isVideoFile = (file) => /^video\//.test(file?.type || "");
