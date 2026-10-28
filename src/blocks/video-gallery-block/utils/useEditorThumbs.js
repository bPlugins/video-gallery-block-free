import { useEffect, useRef, useState } from "react";

import { getVimeoId } from "./functions";
import { getVideoOembed } from "./oembed";

/**
 * Editor only: thumbnails for Vimeo videos saved without a poster.
 *
 * On the page the server finds these (vgb_gallery_thumbnails() hands them to
 * the script as `data-thumbs`), but the editor has no such list, so a gallery
 * made before posters were filled in on add showed grey Vimeo tiles here while
 * the page showed pictures. They are looked up through WordPress's oEmbed
 * proxy, once per link, and only shown -- nothing is written to the block.
 *
 * @param {Array}   videos  The block's `videos` attribute.
 * @param {boolean} enabled False for a feed, whose videos bring their own.
 * @return {Array|undefined} Thumbnails index-aligned with `videos`.
 */
const useEditorThumbs = (videos, enabled = true) => {
  const [found, setFound] = useState({});
  const mounted = useRef(true);
  useEffect(() => () => {
    mounted.current = false;
  }, []);
  const list = enabled && Array.isArray(videos) ? videos : [];
  const wanted = list
    .filter((item) => item && !item.poster && getVimeoId(item.video))
    .map((item) => item.video);
  const missing = wanted.filter((url) => !(url in found));
  const missingKey = missing.join("\n");

  useEffect(() => {
    if (!missing.length) return;

    // Mark them as asked for straight away, so a re-render asks nothing twice.
    setFound((prev) => ({ ...prev, ...Object.fromEntries(missing.map((url) => [url, ""])) }));
    missing.forEach((url) => {
      getVideoOembed(url).then((meta) => {
        if (mounted.current && meta?.thumbnail) {
          setFound((prev) => ({ ...prev, [url]: meta.thumbnail }));
        }
      });
    });
  }, [missingKey]);

  if (!wanted.length) return undefined;
  return list.map((item) => (item && !item.poster && found[item.video]) || "");
};

export default useEditorThumbs;
