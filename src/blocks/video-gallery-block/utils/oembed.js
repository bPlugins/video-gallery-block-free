import apiFetch from "@wordpress/api-fetch";
import { addQueryArgs } from "@wordpress/url";

import { getYoutubeId, getVimeoId } from "./functions";

/**
 * Look a video URL up through WordPress's own oEmbed proxy.
 *
 * This used to go straight to noembed.com from the editor, which meant every
 * pasted URL was sent to a third party the site owner never agreed to, and it
 * only ever returned a title. The core proxy (`/oembed/1.0/proxy`) speaks to
 * the real provider, is cached by WordPress, needs no third party, and returns
 * a thumbnail as well -- which is what makes Vimeo thumbnails possible at all.
 *
 * @param {string} url Video URL.
 * @return {Promise<{title: string, thumbnail: string}|false>} Metadata, or
 *         false if the URL is not an embeddable video or the lookup failed.
 */
export const getVideoOembed = async (url) => {
  if (!url || (!getYoutubeId(url) && !getVimeoId(url))) {
    return false;
  }

  try {
    const data = await apiFetch({
      path: addQueryArgs("/oembed/1.0/proxy", { url }),
    });

    return {
      title: data?.title || "",
      thumbnail: data?.thumbnail_url || "",
    };
  } catch (error) {
    // A provider being down, or the URL not being embeddable after all, is not
    // worth interrupting the person editing. They can still set both by hand.
    return false;
  }
};
