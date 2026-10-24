import { useRef, useState } from "react";
import { useRefEffect } from "@wordpress/compose";
import { useDispatch, useSelect } from "@wordpress/data";
import { store as blockEditorStore } from "@wordpress/block-editor";
import { store as noticesStore } from "@wordpress/notices";
import { __, sprintf, _n } from "@wordpress/i18n";

import {
  appendUnique,
  attachmentToItem,
  isVideoFile,
  moveItem,
} from "../../utils/editorItems";
import { getVideoOembed } from "../../utils/oembed";
import { getYoutubeId, getVimeoId } from "../../utils/functions";

/** What a tile's drag handle carries: the index of the video it moves. */
const ITEM_TYPE = "application/x-vgb-item";

const hasType = (event, type) =>
  Array.from(event.dataTransfer?.types || []).includes(type);

// A link dragged in from another tab (the address bar, a YouTube video's
// title): YouTube and Vimeo pages, or a direct link to a video file.
const isVideoLink = (url) =>
  /^https?:\/\//i.test(url) &&
  (!!getYoutubeId(url) ||
    !!getVimeoId(url) ||
    /\.(mp4|m4v|webm|ogv|mov)(\?|#|$)/i.test(url));

const droppedLinks = (dataTransfer) =>
  (dataTransfer.getData("text/uri-list") || dataTransfer.getData("text/plain") || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#") && isVideoLink(line));

/**
 * Editor only: drag and drop on the gallery in the canvas.
 *
 * - Video files from the computer are uploaded to the Media Library and added
 *   to the end of the gallery, one at a time so the badge can say how far it
 *   has got.
 * - YouTube / Vimeo links (or links to video files) dragged in from another
 *   tab are added the same way the "Import videos" box adds pasted links.
 * - A tile's drag handle (see TileTools) moves that video to where it is
 *   dropped.
 *
 * Native listeners on the block's own element, not React props: the editor
 * has drop zones of its own further up (a file dropped on a block otherwise
 * becomes a new Video block next to it), and only a listener on this element
 * can stop the event before it reaches them.
 *
 * @param {Object}   args
 * @param {boolean}  args.canDrop        Files may be dropped ("My videos" only).
 * @param {boolean}  args.canMove        Tiles may be moved (manual order).
 * @param {Array}    args.videos         The gallery's videos.
 * @param {Function} args.setAttributes  Block's setAttributes.
 * @param {number}   args.activeIndex    The video being edited.
 * @param {Function} args.setActiveIndex Select a video for editing.
 * @return {{ref: Function, dragging: boolean, upload: Object|null}} Ref for the
 * block element, whether files are over it, and upload progress.
 */
const useCanvasVideoDnd = ({
  canDrop,
  canMove,
  videos,
  setAttributes,
  activeIndex,
  setActiveIndex,
}) => {
  const mediaUpload = useSelect(
    (select) => select(blockEditorStore).getSettings().mediaUpload,
    [],
  );
  const { createSuccessNotice, createWarningNotice } = useDispatch(noticesStore);
  const [dragging, setDragging] = useState(false);
  const [upload, setUpload] = useState(null);

  // The listeners are attached once; they read the current values from here.
  const latest = useRef({});
  latest.current = {
    canDrop: canDrop && !!mediaUpload,
    canLink: canDrop,
    canMove,
    videos,
    activeIndex,
    mediaUpload,
    setAttributes,
    setActiveIndex,
    busy: !!upload,
  };

  const uploadOne = (file) =>
    new Promise((resolve) => {
      let settled = false;
      latest.current.mediaUpload({
        filesList: [file],
        allowedTypes: ["video"],
        // Called first with a temporary blob, then with the saved attachment.
        onFileChange: ([attachment]) => {
          if (!settled && attachment?.id) {
            settled = true;
            resolve(attachment);
          }
        },
        onError: () => {
          if (!settled) {
            settled = true;
            resolve(null);
          }
        },
      });
    });

  const addLinks = async (urls) => {
    if (!urls.length) {
      createWarningNotice(
        __("Only YouTube, Vimeo or video file links can be dropped here.", "video-gallery-block"),
        { type: "snackbar" },
      );
      return;
    }

    setUpload({ current: 0, total: urls.length });
    const metas = await Promise.all(
      urls.map((url) =>
        getYoutubeId(url) || getVimeoId(url) ? getVideoOembed(url) : Promise.resolve(false),
      ),
    );
    setUpload(null);

    const now = Date.now();
    const result = appendUnique(
      latest.current.videos,
      urls.map((url, index) => ({
        video: url,
        poster: metas[index]?.thumbnail || "",
        caption: metas[index]?.title || "",
        albs: [],
        dateAdded: now + index,
      })),
    );

    if (result.added) {
      latest.current.videos = result.videos;
      latest.current.setAttributes({ videos: result.videos });
      createSuccessNotice(
        sprintf(
          /* translators: %d: number of videos added. */
          _n("%d video added.", "%d videos added.", result.added, "video-gallery-block"),
          result.added,
        ),
        { type: "snackbar" },
      );
    }
    if (result.duplicates) {
      createWarningNotice(
        sprintf(
          /* translators: %d: number of videos. */
          _n(
            "%d video skipped — already in this gallery.",
            "%d videos skipped — already in this gallery.",
            result.duplicates,
            "video-gallery-block",
          ),
          result.duplicates,
        ),
        { type: "snackbar" },
      );
    }
  };

  const uploadFiles = async (files) => {
    const videoFiles = files.filter(isVideoFile);
    const others = files.length - videoFiles.length;

    if (others) {
      createWarningNotice(
        sprintf(
          /* translators: %d: number of files. */
          _n(
            "%d file is not a video and was left out.",
            "%d files are not videos and were left out.",
            others,
            "video-gallery-block",
          ),
          others,
        ),
        { type: "snackbar" },
      );
    }

    if (!videoFiles.length) {
      return;
    }

    let added = 0;
    let duplicates = 0;
    let failed = 0;

    for (let i = 0; i < videoFiles.length; i += 1) {
      setUpload({ current: i + 1, total: videoFiles.length });
      // One after another: the badge counts them, and a shared host is not
      // asked to take several large files at once.
      // eslint-disable-next-line no-await-in-loop
      const attachment = await uploadOne(videoFiles[i]);
      const item = attachment && attachmentToItem(attachment, Date.now());

      if (!item) {
        failed += 1;
        continue;
      }

      // Added as each one arrives, so a failure later on loses nothing.
      const result = appendUnique(latest.current.videos, [item]);
      if (result.added) {
        latest.current.videos = result.videos;
        latest.current.setAttributes({ videos: result.videos });
        added += 1;
      } else {
        duplicates += 1;
      }
    }

    setUpload(null);

    if (added) {
      createSuccessNotice(
        sprintf(
          /* translators: %d: number of videos added. */
          _n("%d video added.", "%d videos added.", added, "video-gallery-block"),
          added,
        ),
        { type: "snackbar" },
      );
    }
    if (failed || duplicates) {
      createWarningNotice(
        [
          failed
            ? sprintf(
                /* translators: %d: number of files. */
                _n(
                  "%d video could not be uploaded.",
                  "%d videos could not be uploaded.",
                  failed,
                  "video-gallery-block",
                ),
                failed,
              )
            : "",
          duplicates
            ? sprintf(
                /* translators: %d: number of videos. */
                _n(
                  "%d video skipped — already in this gallery.",
                  "%d videos skipped — already in this gallery.",
                  duplicates,
                  "video-gallery-block",
                ),
                duplicates,
              )
            : "",
        ]
          .filter(Boolean)
          .join(" "),
        { type: "snackbar" },
      );
    }
  };

  const ref = useRefEffect((element) => {
    const tileOf = (event) => event.target?.closest?.("[data-item-key]");
    const clearMarks = () =>
      element
        .querySelectorAll(".vgbDropTarget, .vgbIsDragged")
        .forEach((tile) => tile.classList.remove("vgbDropTarget", "vgbIsDragged"));

    const onDragStart = (event) => {
      const handle = event.target?.closest?.(".vgbTileTools__drag");
      const tile = handle && tileOf(event);

      if (!tile || !latest.current.canMove) {
        return;
      }
      event.stopPropagation();
      event.dataTransfer.setData(ITEM_TYPE, tile.getAttribute("data-item-key"));
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setDragImage(tile, 24, 24);
      tile.classList.add("vgbIsDragged");
    };

    const onDragOver = (event) => {
      if (hasType(event, ITEM_TYPE) && latest.current.canMove) {
        event.preventDefault();
        event.stopPropagation();
        event.dataTransfer.dropEffect = "move";
        const tile = tileOf(event);
        element.querySelectorAll(".vgbDropTarget").forEach((other) => {
          if (other !== tile) other.classList.remove("vgbDropTarget");
        });
        tile?.classList.add("vgbDropTarget");
        return;
      }

      if (hasType(event, "Files") && latest.current.canDrop && !latest.current.busy) {
        event.preventDefault();
        event.stopPropagation();
        event.dataTransfer.dropEffect = "copy";
        setDragging(true);
        return;
      }

      if (
        !hasType(event, "Files") &&
        hasType(event, "text/uri-list") &&
        latest.current.canLink &&
        !latest.current.busy
      ) {
        event.preventDefault();
        event.stopPropagation();
        event.dataTransfer.dropEffect = "copy";
        setDragging(true);
      }
    };

    const onDragLeave = (event) => {
      if (!element.contains(event.relatedTarget)) {
        setDragging(false);
        element
          .querySelectorAll(".vgbDropTarget")
          .forEach((tile) => tile.classList.remove("vgbDropTarget"));
      }
    };

    const onDrop = (event) => {
      if (hasType(event, ITEM_TYPE) && latest.current.canMove) {
        event.preventDefault();
        event.stopPropagation();
        const from = Number(event.dataTransfer.getData(ITEM_TYPE));
        const tile = tileOf(event);
        clearMarks();

        if (!tile) {
          return;
        }
        const moved = moveItem(
          latest.current.videos,
          from,
          Number(tile.getAttribute("data-item-key")),
          latest.current.activeIndex,
        );
        if (moved) {
          latest.current.setAttributes({ videos: moved.videos });
          latest.current.setActiveIndex(moved.active);
        }
        return;
      }

      if (hasType(event, "Files") && latest.current.canDrop) {
        event.preventDefault();
        event.stopPropagation();
        setDragging(false);
        if (!latest.current.busy) {
          uploadFiles(Array.from(event.dataTransfer.files || []));
        }
        return;
      }

      if (hasType(event, "text/uri-list") && latest.current.canLink) {
        event.preventDefault();
        event.stopPropagation();
        setDragging(false);
        if (!latest.current.busy) {
          addLinks(droppedLinks(event.dataTransfer));
        }
      }
    };

    // Capture phase: this element is also the block's wrapper, and the block
    // editor's own dragstart listener on it cancels any drag that doesn't start
    // on the wrapper itself (it only lets whole blocks be dragged). Stopping the
    // event here, before the bubble phase, keeps that listener from running.
    element.addEventListener("dragstart", onDragStart, true);
    element.addEventListener("dragenter", onDragOver);
    element.addEventListener("dragover", onDragOver);
    element.addEventListener("dragleave", onDragLeave);
    element.addEventListener("drop", onDrop);
    element.addEventListener("dragend", clearMarks);

    return () => {
      element.removeEventListener("dragstart", onDragStart, true);
      element.removeEventListener("dragenter", onDragOver);
      element.removeEventListener("dragover", onDragOver);
      element.removeEventListener("dragleave", onDragLeave);
      element.removeEventListener("drop", onDrop);
      element.removeEventListener("dragend", clearMarks);
    };
  }, []);

  return { ref, dragging, upload };
};

export default useCanvasVideoDnd;
