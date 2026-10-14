import { useEffect, useState } from "react";
import { __, _n, sprintf } from "@wordpress/i18n";
import {
  Button,
  ExternalLink,
  Notice,
  RangeControl,
  SelectControl,
  Spinner,
  TextControl,
} from "@wordpress/components";

import { GOOGLE_LINKS, isVimeoFeedUrl, timeAgo } from "../../../utils/youtubeFeed";

/**
 * The channel feed's settings: paste a link, connect YouTube once (YouTube
 * links only -- Vimeo needs no key), choose how many.
 *
 * Laid out as numbered steps because that is the order someone has to do them
 * in the first time, and each step says what it is waiting for. Once a step is
 * done it collapses to one line, so a returning editor sees a short summary
 * rather than the setup instructions again.
 */

const Step = ({ number, title, done, children }) => (
  <div className={`vgbFeedStep ${done ? "isDone" : ""}`}>
    <div className="vgbFeedStep__head">
      <span className="vgbFeedStep__num" aria-hidden="true">
        {done ? "✓" : number}
      </span>
      <span className="vgbFeedStep__title">{title}</span>
    </div>
    <div className="vgbFeedStep__body">{children}</div>
  </div>
);

/** Paste-a-link field with its button; shared by the sidebar and the canvas. */
export const FeedLinkForm = ({ url, onSubmit, disabled, autoFocus }) => {
  const [value, setValue] = useState(url || "");

  // Follow the saved link when it changes elsewhere (canvas ↔ sidebar).
  useEffect(() => setValue(url || ""), [url]);

  const submit = () => {
    const next = value.trim();
    if (next) onSubmit(next);
  };

  return (
    <div className="vgbFeedLinkForm">
      <TextControl
        label={__("YouTube or Vimeo link", "video-gallery-block")}
        hideLabelFromVision={false}
        value={value}
        placeholder="youtube.com/@name  or  vimeo.com/name"
        onChange={setValue}
        onKeyDown={(e) => {
          if ("Enter" === e.key) {
            e.preventDefault();
            submit();
          }
        }}
        disabled={disabled}
        autoFocus={autoFocus}
        autoComplete="off"
        help={
          <>
            {__(
              "YouTube: a channel (youtube.com/@name) or a playlist. Vimeo: a profile (vimeo.com/name), a channel, or a showcase, which is Vimeo's playlist (vimeo.com/showcase/123).",
              "video-gallery-block",
            )}
            {url && (
              <>
                {" "}
                <strong>
                  {__(
                    "A gallery shows one link. To show a different one, paste it here and click Update link.",
                    "video-gallery-block",
                  )}
                </strong>
              </>
            )}
          </>
        }
        __nextHasNoMarginBottom
      />
      <Button
        variant="primary"
        className="vgbImportBtn mt10"
        disabled={disabled || !value.trim() || value.trim() === url}
        onClick={submit}>
        {url
          ? __("Update link", "video-gallery-block")
          : __("Show videos", "video-gallery-block")}
      </Button>
    </div>
  );
};

/** What the feed gave, or why it gave nothing. */
export const FeedStatus = ({ feedState, count: limit, onUseLink }) => {
  const { status, data, error, suggestion } = feedState;

  if ("loading" === status && !data) {
    return (
      <div className="vgbFeedStatus isLoading">
        <Spinner />
        {__("Loading videos…", "video-gallery-block")}
      </div>
    );
  }

  if ("error" === status) {
    return (
      <Notice status="error" isDismissible={false} className="vgbFeedNotice">
        {error}
        {suggestion?.url && onUseLink && (
          <div className="mt10">
            <Button variant="primary" onClick={() => onUseLink(suggestion.url)}>
              {suggestion.name
                ? sprintf(
                    /* translators: %s: channel or creator name. */
                    __("Show all videos from %s", "video-gallery-block"),
                    suggestion.name,
                  )
                : __("Show all videos from this creator", "video-gallery-block")}
            </Button>
          </div>
        )}
      </Notice>
    );
  }

  if (!data) return null;

  // What the gallery shows: the newest `limit` of what YouTube returned.
  const total = data.videos?.length || 0;
  const count = limit ? Math.min(limit, total) : total;
  const isVimeo = "vimeo" === data.provider;
  let kind;
  if (isVimeo) {
    kind =
      "playlist" === data.kind
        ? __("Vimeo showcase", "video-gallery-block")
        : __("Vimeo", "video-gallery-block");
  } else {
    kind =
      "playlist" === data.kind
        ? __("YouTube playlist", "video-gallery-block")
        : __("YouTube channel", "video-gallery-block");
  }

  return (
    <>
      <div className="vgbFeedStatus isReady">
        <strong className="vgbFeedStatus__title">
          {data.title || (isVimeo ? "Vimeo" : "YouTube")}
        </strong>
        <span className="vgbFeedStatus__meta">
          {[
            kind,
            sprintf(
              /* translators: %d: number of videos. */
              _n("%d video", "%d videos", count, "video-gallery-block"),
              count,
            ),
            sprintf(
              /* translators: %s: e.g. "5 min ago". */
              __("updated %s", "video-gallery-block"),
              timeAgo(data.fetchedAt),
            ),
          ].join(" · ")}
        </span>
        {"loading" === status && <Spinner />}
      </div>

      {data.stale && data.error && (
        <Notice status="warning" isDismissible={false} className="vgbFeedNotice">
          {__(
            "Showing the last videos we got. Could not update just now:",
            "video-gallery-block",
          )}{" "}
          {data.error}
        </Notice>
      )}

      {0 === count && (
        <Notice status="info" isDismissible={false} className="vgbFeedNotice">
          {isVimeo
            ? __(
                "No public videos found here. Only public videos can be shown -- private and unlisted ones are left out.",
                "video-gallery-block",
              )
            : __(
                "No public videos found here. If you hid or kept only Shorts under Options → YouTube Shorts, try All Videos.",
                "video-gallery-block",
              )}
        </Notice>
      )}
    </>
  );
};

/** Step 1 when no key is saved yet: what to do, in the order to do it. */
const ConnectForm = ({ keyState, onConnected }) => {
  const [key, setKey] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const save = async () => {
    setBusy(true);
    setError("");
    try {
      await keyState.save(key.trim());
      setKey("");
      onConnected && onConnected();
    } catch (e) {
      setError(e.message);
    }
    setBusy(false);
  };

  return (
    <div className="vgbFeedConnect">
      <p className="vgbFeedHint">
        {__(
          "A free key from Google lets your site read your channel. One-time setup, about 2 minutes.",
          "video-gallery-block",
        )}
      </p>

      <ol className="vgbFeedHowTo">
        <li>
          {__("Sign in to Google Cloud and create a project (any name).", "video-gallery-block")}{" "}
          <ExternalLink href={GOOGLE_LINKS.credentials}>
            {__("Open Google Cloud", "video-gallery-block")}
          </ExternalLink>
        </li>
        <li>
          {__("Turn on “YouTube Data API v3”: click Enable.", "video-gallery-block")}{" "}
          <ExternalLink href={GOOGLE_LINKS.enableApi}>
            {__("Open the API page", "video-gallery-block")}
          </ExternalLink>
        </li>
        <li>
          {__(
            "Go to Credentials → Create credentials → API key, and copy the key.",
            "video-gallery-block",
          )}
        </li>
        <li>{__("Paste it here and click Save.", "video-gallery-block")}</li>
      </ol>

      <TextControl
        label={__("YouTube API key", "video-gallery-block")}
        value={key}
        placeholder="AIza…"
        onChange={setKey}
        onKeyDown={(e) => {
          if ("Enter" === e.key && key.trim() && !busy) {
            e.preventDefault();
            save();
          }
        }}
        autoComplete="off"
        disabled={busy}
        __nextHasNoMarginBottom
      />

      <Button
        variant="primary"
        className="vgbImportBtn mt10"
        disabled={busy || !key.trim()}
        onClick={save}>
        {busy ? (
          <>
            <Spinner />
            {__("Checking key…", "video-gallery-block")}
          </>
        ) : (
          __("Save key", "video-gallery-block")
        )}
      </Button>

      {error && (
        <Notice status="error" isDismissible={false} className="vgbFeedNotice">
          {error}
        </Notice>
      )}

      <p className="vgbFeedFootnote">
        {__(
          "The key stays on your server and is used for every gallery on this site. Visitors never see it.",
          "video-gallery-block",
        )}
      </p>
    </div>
  );
};

const refreshOptions = [
  { value: 1, label: __("Every hour", "video-gallery-block") },
  { value: 6, label: __("Every 6 hours", "video-gallery-block") },
  { value: 12, label: __("Every 12 hours", "video-gallery-block") },
  { value: 24, label: __("Once a day", "video-gallery-block") },
];

const FeedSource = ({ attributes, setAttributes, keyState, feedState }) => {
  const feed = { count: 12, refresh: 6, url: "", ...(attributes.feed || {}) };
  const [changingKey, setChangingKey] = useState(false);

  const updateFeed = (patch) =>
    setAttributes({ feed: { ...feed, enabled: true, ...patch } });

  const connected = !!keyState.connected;
  const isVimeo = isVimeoFeedUrl(feed.url);
  const canLoad = connected || isVimeo;
  const hasVideos = "ready" === feedState.status || !!feedState.data;
  // Until a link is pasted, the YouTube setup stays one short line: it may not
  // be needed at all.
  const showConnectForm = changingKey || (!connected && !!feed.url);

  return (
    <div className="vgbFeedSource">
      <Step
        number={1}
        title={__("Choose a channel or playlist", "video-gallery-block")}
        done={hasVideos && !!feed.url && canLoad}>
        <FeedLinkForm url={feed.url} onSubmit={(url) => updateFeed({ url })} />
        {feed.url && canLoad && (
          <FeedStatus
            feedState={feedState}
            count={feed.count}
            onUseLink={(url) => updateFeed({ url })}
          />
        )}
        {feed.url && !canLoad && !keyState.loading && (
          <p className="vgbFeedFootnote">
            {__("This is a YouTube link: connect YouTube in step 2 to show its videos.", "video-gallery-block")}
          </p>
        )}
      </Step>

      {!isVimeo && (
        <Step
          number={2}
          title={__("Connect YouTube", "video-gallery-block")}
          done={connected && !changingKey}>
          {keyState.loading ? (
            <Spinner />
          ) : connected && !changingKey ? (
            <div className="vgbFeedConnected">
              <span>
                {__("Connected", "video-gallery-block")}
                {keyState.masked && (
                  <code className="vgbFeedKey">{keyState.masked}</code>
                )}
              </span>
              {keyState.canManage && !keyState.fromConfig && (
                <Button variant="link" onClick={() => setChangingKey(true)}>
                  {__("Change key", "video-gallery-block")}
                </Button>
              )}
            </div>
          ) : !keyState.canManage ? (
            <Notice status="info" isDismissible={false} className="vgbFeedNotice">
              {__(
                "Only needed for YouTube links. Ask a site administrator to connect YouTube once; after that, anyone who edits pages can add YouTube channel galleries.",
                "video-gallery-block",
              )}
            </Notice>
          ) : showConnectForm ? (
            <>
              <ConnectForm
                keyState={keyState}
                onConnected={() => {
                  setChangingKey(false);
                  feedState.reload();
                }}
              />
              {changingKey && (
                <Button variant="link" className="mt10" onClick={() => setChangingKey(false)}>
                  {__("Cancel", "video-gallery-block")}
                </Button>
              )}
            </>
          ) : (
            <>
              <p className="vgbFeedHint">
                {__(
                  "Only needed for YouTube links. Vimeo links work without it.",
                  "video-gallery-block",
                )}
              </p>
              <Button variant="secondary" onClick={() => setChangingKey(true)}>
                {__("Connect YouTube", "video-gallery-block")}
              </Button>
            </>
          )}
        </Step>
      )}

      <Step number={isVimeo ? 2 : 3} title={__("Display", "video-gallery-block")}>
        <RangeControl
          label={__("Number of videos", "video-gallery-block")}
          value={feed.count}
          min={1}
          max={50}
          onChange={(count) => updateFeed({ count: count || 12 })}
          help={__("The newest videos are shown first. Up to 50.", "video-gallery-block")}
          __nextHasNoMarginBottom
        />

        <SelectControl
          className="mt20"
          label={__("Check for new videos", "video-gallery-block")}
          value={feed.refresh}
          options={refreshOptions}
          onChange={(refresh) => updateFeed({ refresh: parseInt(refresh, 10) || 6 })}
          help={__(
            "New uploads appear on your site within this time, with no work from you.",
            "video-gallery-block",
          )}
          __nextHasNoMarginBottom
        />

        {feed.url && canLoad && (
          <Button
            variant="secondary"
            className="mt15"
            icon="update"
            isBusy={"loading" === feedState.status}
            disabled={"loading" === feedState.status}
            onClick={() => feedState.reload()}>
            {__("Check now", "video-gallery-block")}
          </Button>
        )}

        {!isVimeo && false !== feedState.data?.shortsApplied && (
          <p className="vgbFeedFootnote">
            {__(
              "To hide Shorts or show only Shorts, use Options → YouTube Shorts (works for YouTube channel links).",
              "video-gallery-block",
            )}
          </p>
        )}
      </Step>
    </div>
  );
};

export default FeedSource;
