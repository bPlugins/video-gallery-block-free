import { useEffect } from "react";
import apiFetch from "@wordpress/api-fetch";
import { dispatch, select } from "@wordpress/data";

// Links already asked about in this editor session, so nothing is asked twice.
const asked = new Set();

/**
 * "Show upload time": the videos in the gallery's own list that have no
 * `uploadDate` yet get it looked up once (YouTube with the site's key, Vimeo,
 * Media Library files) and kept on the video, so the page shows it without
 * asking anyone. Nothing happens while the option is off.
 *
 * @param {string}  clientId The block.
 * @param {Array}   videos   The gallery's own videos.
 * @param {boolean} enabled  Whether upload times are shown.
 */
const useUploadDates = (clientId, videos, enabled) => {
  useEffect(() => {
    if (!enabled || !Array.isArray(videos)) return;
    const urls = Array.from(
      new Set(
        videos
          .filter((item) => item?.video && !item.uploadDate && !asked.has(item.video))
          .map((item) => item.video),
      ),
    ).slice(0, 50);
    if (!urls.length) return;
    urls.forEach((url) => asked.add(url));

    apiFetch({ path: "/vgb/v1/upload-dates", method: "POST", data: { urls } })
      .then((res) => {
        const found = {};
        urls.forEach((url, i) => {
          if (res?.dates?.[i]) found[url] = res.dates[i];
        });
        if (!Object.keys(found).length) return;

        // The list as it is now: it may have changed while we waited.
        const current = select("core/block-editor").getBlockAttributes(clientId)?.videos;
        if (!Array.isArray(current)) return;
        let changed = false;
        const next = current.map((item) => {
          if (item?.video && !item.uploadDate && found[item.video]) {
            changed = true;
            return { ...item, uploadDate: found[item.video] };
          }
          return item;
        });
        if (!changed) return;
        const editor = dispatch("core/block-editor");
        // Part of the change that turned the option on, not an undo step of its own.
        editor.__unstableMarkNextChangeAsNotPersistent?.();
        editor.updateBlockAttributes(clientId, { videos: next });
      })
      .catch(() => {
        // Asked again in a later session.
        urls.forEach((url) => asked.delete(url));
      });
  }, [clientId, videos, enabled]);
};

export default useUploadDates;
