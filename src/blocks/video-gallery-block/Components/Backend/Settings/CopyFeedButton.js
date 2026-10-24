import { Button } from "@wordpress/components";
import { useDispatch } from "@wordpress/data";
import { store as noticesStore } from "@wordpress/notices";
import { __, sprintf, _n } from "@wordpress/i18n";

import { appendUnique, feedItemToItem } from "../../../utils/editorItems";

/**
 * Feed mode: turn the videos the feed shows right now into the gallery's own
 * ("My videos"), after any already there, and switch to them -- for someone
 * who wants to pick, reorder or caption a channel's videos by hand. One
 * snackbar, with Undo, puts everything back as it was.
 *
 * @param {Object}   props
 * @param {Object}   props.attributes    Block attributes.
 * @param {Function} props.setAttributes Block's setAttributes.
 * @param {Array}    props.feedVideos    The feed videos the canvas shows.
 */
const CopyFeedButton = ({ attributes, setAttributes, feedVideos }) => {
  const { createSuccessNotice } = useDispatch(noticesStore);

  if (!Array.isArray(feedVideos) || !feedVideos.length) {
    return null;
  }

  const copy = () => {
    const before = { videos: attributes.videos, feed: attributes.feed };
    const copiedAt = Date.now();
    const result = appendUnique(
      attributes.videos,
      feedVideos.map((item, index) => feedItemToItem(item, copiedAt + index)),
    );

    setAttributes({
      videos: result.videos,
      feed: { ...(attributes.feed || {}), enabled: false },
    });

    createSuccessNotice(
      [
        sprintf(
          /* translators: %d: number of videos. */
          _n(
            "%d video copied to My videos.",
            "%d videos copied to My videos.",
            result.added,
            "video-gallery-block",
          ),
          result.added,
        ),
        result.duplicates
          ? sprintf(
              /* translators: %d: number of videos. */
              _n(
                "%d was already there.",
                "%d were already there.",
                result.duplicates,
                "video-gallery-block",
              ),
              result.duplicates,
            )
          : "",
      ]
        .filter(Boolean)
        .join(" "),
      {
        type: "snackbar",
        actions: [
          {
            label: __("Undo", "video-gallery-block"),
            onClick: () => setAttributes(before),
          },
        ],
      },
    );
  };

  return (
    <div className="vgbCopyFeed">
      <Button variant="secondary" icon="download" onClick={copy}>
        {__("Copy these videos to My videos", "video-gallery-block")}
      </Button>
      <p className="vgbCopyFeed__help">
        {__(
          "Copied videos are yours to reorder and edit, but won’t update by themselves.",
          "video-gallery-block",
        )}
      </p>
    </div>
  );
};

export default CopyFeedButton;
