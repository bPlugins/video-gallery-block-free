import { __ } from "@wordpress/i18n";
import { Placeholder, Spinner } from "@wordpress/components";

import { FeedLinkForm, FeedStatus } from "./Settings/FeedSource";
import { isVimeoFeedUrl } from "../../utils/youtubeFeed";

const FeedIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
    <path
      fill="currentColor"
      d="M4 5h11a2 2 0 0 1 2 2v2.4l4-2.4v10l-4-2.4V17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm0 2v10h11V7H4Zm3 2.2 5 2.8-5 2.8V9.2Z"
    />
  </svg>
);

/**
 * What the canvas shows while a channel feed is not ready to show videos yet.
 *
 * Every state says what happens next, in the canvas itself -- where the person
 * is looking -- instead of an empty gallery that leaves them to discover the
 * settings sidebar on their own.
 */
const FeedPlaceholder = ({ attributes, setAttributes, keyState, feedState }) => {
  const feed = attributes.feed || {};
  const isVimeo = isVimeoFeedUrl(feed.url);

  const setUrl = (url) =>
    setAttributes({ feed: { count: 12, refresh: 6, ...feed, enabled: true, url } });

  const connectText = keyState.canManage
    ? __(
        "YouTube links need a one-time setup: connect YouTube in the block settings on the right, under Video Source. It takes about 2 minutes.",
        "video-gallery-block",
      )
    : __(
        "YouTube links need a site administrator to connect YouTube once (block settings → Video Source).",
        "video-gallery-block",
      );

  let instructions;
  let body = null;

  if (keyState.loading) {
    body = <Spinner />;
  } else if (!feed.url) {
    instructions = __(
      "Paste a YouTube or Vimeo channel or playlist link. New uploads will appear here by themselves.",
      "video-gallery-block",
    );
    body = (
      <>
        <FeedLinkForm url="" onSubmit={setUrl} />
        {!keyState.connected && (
          <p className="vgbFeedFootnote">
            {__("Vimeo links work right away.", "video-gallery-block")}{" "}
            {connectText}
          </p>
        )}
      </>
    );
  } else if (!keyState.connected && !isVimeo) {
    instructions = connectText;
    body = <FeedLinkForm url={feed.url} onSubmit={setUrl} />;
  } else {
    instructions = __(
      "Check the link, or paste a different one.",
      "video-gallery-block",
    );
    body = (
      <>
        <FeedStatus feedState={feedState} count={feed.count} onUseLink={setUrl} />
        {"loading" !== feedState.status && (
          <FeedLinkForm url={feed.url} onSubmit={setUrl} />
        )}
      </>
    );
  }

  return (
    <Placeholder
      className="vgbFeedPlaceholder"
      icon={<FeedIcon />}
      label={__("Channel or playlist gallery", "video-gallery-block")}
      instructions={instructions}>
      {body}
    </Placeholder>
  );
};

export default FeedPlaceholder;
