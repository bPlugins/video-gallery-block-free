import { useEffect, useRef, useState } from "react";
import { __, _n, sprintf } from "@wordpress/i18n";
import { useInstanceId } from "@wordpress/compose";
import {
  Button,
  ExternalLink,
  Notice,
  RangeControl,
  Spinner,
  TextControl,
  __experimentalNumberControl as NumberControl,
  __experimentalToggleGroupControl as ToggleGroupControl,
  __experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from "@wordpress/components";
import { updateData } from "../../../../../../../bpl-tools/utils/functions";

import { GOOGLE_LINKS, isVimeoFeedUrl, timeAgo } from "../../../utils/youtubeFeed";
import { shortsFilterOptions } from "../../../utils/options";
import "./feedSteps.scss";

/**
 * The channel feed's settings: paste a link, connect YouTube once (YouTube
 * links only -- Vimeo needs no key), choose how many.
 *
 * Laid out as numbered steps because that is the order someone has to do them
 * in the first time, and each step says what it is waiting for. Once a step is
 * done it collapses to one line, so a returning editor sees a short summary
 * rather than the setup instructions again.
 */

const Chevron = () => (
  <svg
    className="vgbFeedStep__chevron"
    viewBox="0 0 24 24"
    width="20"
    height="20"
    aria-hidden="true"
    focusable="false">
    <path fill="currentColor" d="M17.5 11.6 12 16l-5.5-4.4.9-1.2L12 14l4.6-3.6 1 1.2z" />
  </svg>
);

/*
 * A step turns green with a tick once it is done, and then folds to its title
 * and a one-line `summary`; clicking the title opens it again. A step that
 * gets finished while it is open -- the one being worked on -- stays open.
 * `pending`: still finding out whether it is done (a saved link loading), so
 * nothing is decided yet.
 */
const Step = ({ number, title, done = false, summary = "", pending = false, children }) => {
  const id = useInstanceId(Step, "vgbFeedStep");
  const collapsible = !!summary && done;
  // null: follow `done`; true / false: what the person chose.
  const [open, setOpen] = useState(null);
  // Whether it could fold, as last seen once known.
  const seen = useRef(null);

  useEffect(() => {
    if (pending) return;
    if (!collapsible) {
      setOpen(null);
    } else if (false === seen.current) {
      // Finished just now, while being worked on: keep it open.
      setOpen((now) => (null === now ? true : now));
    }
    seen.current = collapsible;
  }, [collapsible, pending]);

  let isOpen = true;
  if (collapsible) {
    isOpen = null !== open ? open : false === seen.current;
  }

  const tick = done && !pending;

  const head = (
    <>
      <span className="vgbFeedStep__num" aria-hidden="true">
        {tick ? "✓" : number}
      </span>
      <span className="vgbFeedStep__title">{title}</span>
    </>
  );

  return (
    <div
      className={`vgbFeedStep ${tick ? "isDone" : ""} ${collapsible ? "isCollapsible" : ""} ${
        isOpen ? "isOpen" : "isCollapsed"
      }`}>
      {collapsible ? (
        <button
          type="button"
          className="vgbFeedStep__head vgbFeedStep__toggle"
          aria-expanded={isOpen}
          aria-controls={`${id}-body`}
          onClick={() => setOpen(!isOpen)}>
          {head}
          <Chevron />
          {!isOpen && (
            <span className="vgbFeedStep__summary" title={summary}>
              {summary}
            </span>
          )}
        </button>
      ) : (
        <div className="vgbFeedStep__head">{head}</div>
      )}
      <div className="vgbFeedStep__body" id={`${id}-body`} hidden={!isOpen}>
        {children}
      </div>
    </div>
  );
};

/** Paste-a-link field with its button; shared by the sidebar and the canvas. */
export const FeedLinkForm = ({ url, onSubmit, disabled, autoFocus }) => {
  const [value, setValue] = useState(url || "");

  // Follow the saved link when it changes elsewhere (canvas ↔ sidebar).
  useEffect(() => setValue(url || ""), [url]);

  const submit = () => {
    const next = value.trim();
    if (next) onSubmit(next);
  };

  const unchanged = !!url && value.trim() === url;

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
              "A channel or playlist link from YouTube, or a profile, channel or showcase from Vimeo.",
              "video-gallery-block",
            )}
            <span className="vgbFeedHelpTip">
              {__(
                "Favorites: put them in a public playlist and paste its link.",
                "video-gallery-block",
              )}
            </span>
          </>
        }
        __nextHasNoMarginBottom
      />
      <Button
        variant="primary"
        className="vgbImportBtn mt10"
        disabled={disabled || !value.trim() || unchanged}
        onClick={submit}>
        {url
          ? __("Update link", "video-gallery-block")
          : __("Show videos", "video-gallery-block")}
      </Button>
      {unchanged && !disabled && (
        <p className="vgbFeedFootnote vgbFeedUnchanged">
          {__("Paste a different link to update.", "video-gallery-block")}
        </p>
      )}
    </div>
  );
};

/** What kind of list a feed gave, e.g. "YouTube channel" or "Vimeo showcase". */
const feedKindLabel = (data) => {
  if ("vimeo" === data.provider) {
    return "playlist" === data.kind
      ? __("Vimeo showcase", "video-gallery-block")
      : __("Vimeo", "video-gallery-block");
  }
  return "playlist" === data.kind
    ? __("YouTube playlist", "video-gallery-block")
    : __("YouTube channel", "video-gallery-block");
};

/** How many videos the gallery shows of what the feed gave: the newest `limit`. */
const shownCount = (data, limit) => {
  const total = data?.videos?.length || 0;
  return limit ? Math.min(limit, total) : total;
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

  const count = shownCount(data, limit);
  const isVimeo = "vimeo" === data.provider;

  return (
    <>
      <div className="vgbFeedStatus isReady">
        <strong className="vgbFeedStatus__title">
          {data.title || (isVimeo ? "Vimeo" : "YouTube")}
        </strong>
        <span className="vgbFeedStatus__meta">
          {[
            feedKindLabel(data),
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
                "No public videos found here. If you hid Shorts or kept only Shorts, try All Videos.",
                "video-gallery-block",
              )}
        </Notice>
      )}
    </>
  );
};

/** Step 2 when no key is saved yet: what to do, in the order to do it. */
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

/** "Check for new videos": the button's short label, and the summary's words. */
const refreshOptions = () => [
  {
    value: 1,
    label: __("1 h", "video-gallery-block"),
    full: __("Every hour", "video-gallery-block"),
  },
  {
    value: 6,
    label: __("6 h", "video-gallery-block"),
    full: __("Every 6 hours", "video-gallery-block"),
  },
  {
    value: 12,
    label: __("12 h", "video-gallery-block"),
    full: __("Every 12 hours", "video-gallery-block"),
  },
  {
    value: 24,
    label: __("Daily", "video-gallery-block"),
    full: __("Once a day", "video-gallery-block"),
  },
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

  /*
   * Step 1's state. A saved link still loading counts as done for now, so a
   * returning editor sees the folded summary straight away instead of the
   * whole step opening and then closing. Anything the person should look at
   * -- a failed link, old videos, nothing found -- keeps it open.
   */
  const { data } = feedState;
  const sourceSettled =
    !keyState.loading && (!canLoad || !!data || "error" === feedState.status);
  const sourcePending = !!feed.url && !sourceSettled;
  const shown = shownCount(data, feed.count);
  const sourceTrouble = !!data && (!!(data.stale && data.error) || 0 === shown);
  const sourceDone =
    !!feed.url && (sourcePending || (canLoad && hasVideos && !sourceTrouble));
  const sourceSummary =
    sourcePending || !data
      ? __("Loading videos…", "video-gallery-block")
      : [
          data.title || ("vimeo" === data.provider ? "Vimeo" : "YouTube"),
          feedKindLabel(data),
          sprintf(
            /* translators: %d: number of videos. */
            _n("%d video", "%d videos", shown, "video-gallery-block"),
            shown,
          ),
        ].join(" · ");

  // The gallery's own paging and Shorts settings, shown here while the feed is on.
  const shortsFilter = attributes.options?.shortsFilter || "all";
  const shortsApplies = data
    ? !!data.shortsApplied
    : !isVimeo && !/[?&]list=/.test(feed.url || "");
  const showShorts = !!feed.url && (shortsApplies || "all" !== shortsFilter);
  const perPage = attributes.perPage || 0;

  const refreshChoice = refreshOptions().find(
    (option) => option.value === parseFloat(feed.refresh),
  );
  const displaySummary = [
    sprintf(
      /* translators: %d: number of videos. */
      _n("%d video", "%d videos", feed.count, "video-gallery-block"),
      feed.count,
    ),
    refreshChoice ? refreshChoice.full.toLowerCase() : "",
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="vgbFeedSource">
      <Step
        number={1}
        title={__("Choose a channel or playlist", "video-gallery-block")}
        done={sourceDone}
        pending={sourcePending}
        summary={sourceSummary}>
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
            {__(
              "This is a YouTube link: connect YouTube in step 2 to show its videos.",
              "video-gallery-block",
            )}
          </p>
        )}
      </Step>

      {!isVimeo && (
        <Step
          number={2}
          title={__("Connect YouTube", "video-gallery-block")}
          done={(keyState.loading || connected) && !changingKey}
          pending={!!keyState.loading}
          summary={
            keyState.loading
              ? __("Checking…", "video-gallery-block")
              : [__("Connected", "video-gallery-block"), keyState.masked]
                  .filter(Boolean)
                  .join(" · ")
          }>
          {keyState.loading ? (
            <Spinner />
          ) : connected && !changingKey ? (
            <div className="vgbFeedConnected isStacked">
              <span>
                {__("Connected", "video-gallery-block")}
                {keyState.masked && <code className="vgbFeedKey">{keyState.masked}</code>}
              </span>
              {keyState.canManage && !keyState.fromConfig && (
                <Button
                  variant="link"
                  size="small"
                  className="vgbFeedChangeKey"
                  onClick={() => setChangingKey(true)}>
                  {__("Change key", "video-gallery-block")}
                </Button>
              )}
            </div>
          ) : !keyState.canManage ? (
            <Notice status="info" isDismissible={false} className="vgbFeedNotice">
              {__(
                "Only needed for YouTube links. Ask a site administrator to connect YouTube once.",
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

      <Step
        number={isVimeo ? 2 : 3}
        title={__("How many & how often", "video-gallery-block")}
        // Its settings work as they are: done once there is something to show.
        done={!!feed.url && (sourcePending || canLoad)}
        pending={sourcePending}
        summary={displaySummary}>
        <RangeControl
          label={__("Number of videos", "video-gallery-block")}
          value={feed.count}
          min={1}
          max={50}
          onChange={(count) => updateFeed({ count: count || 12 })}
          help={__("The newest videos first. Up to 50.", "video-gallery-block")}
          __nextHasNoMarginBottom
        />

        {showShorts && (
          // The same choice as Options → YouTube Shorts in "My videos" mode.
          <div className="mt20 vgbToggleGroupWrap">
            <ToggleGroupControl
              label={__("YouTube Shorts", "video-gallery-block")}
              value={shortsFilter}
              onChange={(val) =>
                setAttributes({
                  options: updateData(attributes.options, val ?? "all", "shortsFilter"),
                })
              }
              isBlock
              __nextHasNoMarginBottom
              help={
                shortsApplies
                  ? __(
                      "Uses YouTube's own videos-only or Shorts-only list.",
                      "video-gallery-block",
                    )
                  : __("Works with YouTube channel links only.", "video-gallery-block")
              }>
              {shortsFilterOptions.map((option) => (
                <ToggleGroupControlOption
                  key={option.value}
                  value={option.value}
                  label={option.label}
                />
              ))}
            </ToggleGroupControl>
          </div>
        )}

        <NumberControl
          className="mt20 vgbFeedShowFirst"
          label={__("Show first", "video-gallery-block")}
          value={perPage}
          min={0}
          onChange={(val) => setAttributes({ perPage: Math.max(0, parseInt(val) || 0) })}
          help={__(
            "Then a Load More button shows the rest. 0 shows all.",
            "video-gallery-block",
          )}
          __nextHasNoMarginBottom
        />

        {perPage > 0 && (
          <TextControl
            className="mt20"
            label={__("Load More button text", "video-gallery-block")}
            value={attributes.loadMoreLabel || ""}
            onChange={(val) => setAttributes({ loadMoreLabel: val })}
            __nextHasNoMarginBottom
          />
        )}

        <div className="mt20 vgbToggleGroupWrap vgbFeedRefresh">
          <ToggleGroupControl
            label={__("Check for new videos", "video-gallery-block")}
            value={String(feed.refresh)}
            onChange={(refresh) => updateFeed({ refresh: parseInt(refresh, 10) || 6 })}
            isBlock
            __nextHasNoMarginBottom
            help={__("New uploads appear on your site within this time.", "video-gallery-block")}>
            {refreshOptions().map((option) => (
              <ToggleGroupControlOption
                key={option.value}
                value={String(option.value)}
                label={option.label}
                aria-label={option.full}
                showTooltip
              />
            ))}
          </ToggleGroupControl>
        </div>

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
      </Step>
    </div>
  );
};

export default FeedSource;
