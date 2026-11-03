import { useEffect, useState } from "@wordpress/element";
import { select } from "@wordpress/data";
import { __, _n, sprintf } from "@wordpress/i18n";
import apiFetch from "@wordpress/api-fetch";
import {
  PanelBody,
  TextareaControl,
  Button,
  Notice,
  Spinner,
} from "@wordpress/components";

/**
 * "Edit with AI": describe the gallery, see exactly what would change, then
 * Apply (and Undo). Also: write titles for videos that have none, and sort the
 * videos into albums. The server decides what the AI may touch and checks every
 * value; this panel only shows the answer and applies it when the user says so.
 * Nothing changes until Apply.
 */

// The only settings sent to the server, so the AI knows what the gallery is now.
const SENT = [
  "columns",
  "columnGap",
  "columnGapResponsive",
  "border",
  "background",
  "playIconColors",
  "playIconSize",
  "filterBtnColors",
  "aspectRatio",
  "perPage",
  "options",
  "filter",
  "feed",
];

const MAX_JOB_VIDEOS = 40;

const isObject = (value) =>
  value && "object" === typeof value && !Array.isArray(value);

const pick = (attributes) => {
  const out = {};
  SENT.forEach((key) => {
    if (undefined === attributes[key]) return;
    // Only the feed's switch and link are needed, not its other settings.
    out[key] =
      "feed" === key && isObject(attributes.feed)
        ? { enabled: !!attributes.feed.enabled, url: attributes.feed.url || "" }
        : attributes[key];
  });
  return out;
};

const unique = (list) => Array.from(new Set(list));

// One shared look at the AI's state for every gallery block on the page. Only
// "ready" is remembered: anything else is asked again, so setting AI up in
// another tab is noticed without reloading the editor.
let statusRequest = null;
export const loadStatus = (force = false) => {
  if (force || !statusRequest) {
    statusRequest = apiFetch({ path: "/vidgalblk/v1/ai/status" })
      .then((value) => {
        if ("ready" !== value.state) statusRequest = null;
        return value;
      })
      .catch(() => {
        statusRequest = null;
        return { state: "unsupported" };
      });
  }
  return statusRequest;
};

const examples = () => [
  __("Dark and modern", "video-gallery-block"),
  __("Tight 4-column grid", "video-gallery-block"),
  __("Big, rounded and spacious", "video-gallery-block"),
  __("Hide Shorts, newest first", "video-gallery-block"),
];

const pageTitle = () => {
  try {
    return select("core/editor").getEditedPostAttribute("title") || "";
  } catch {
    return "";
  }
};

const AiAssistant = ({ attributes, setAttributes }) => {
  const [status, setStatus] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null); // gallery settings answer
  const [job, setJob] = useState(null); // titles / albums answer
  const [error, setError] = useState("");
  const [undo, setUndo] = useState(null);
  const [checking, setChecking] = useState(false);

  const recheck = () => {
    setChecking(true);
    return loadStatus(true).then((value) => {
      setStatus(value);
      setChecking(false);
    });
  };

  useEffect(() => {
    let alive = true;
    loadStatus().then((value) => alive && setStatus(value));
    return () => {
      alive = false;
    };
  }, []);

  // Back from the Connectors tab: look again by itself.
  const state = status?.state;
  useEffect(() => {
    if (!["needs_setup", "unreachable", "needs_approval"].includes(state)) {
      return undefined;
    }
    const onFocus = () => {
      if ("visible" === document.visibilityState) recheck();
    };
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onFocus);
    return () => {
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onFocus);
    };
  }, [state]);

  // WordPress older than 7.0, or AI switched off on the site: show nothing,
  // the plugin works exactly as before.
  if (!status || ["unsupported", "disabled"].includes(status.state)) {
    return null;
  }

  // Not set up yet: a short checklist that shows where the person is, with one
  // button per step, and looks again by itself when they come back.
  if (["needs_setup", "unreachable", "needs_approval"].includes(status.state)) {
    const unreachable = "unreachable" === status.state;
    const connected = "needs_approval" === status.state;
    const hasApproval = connected || !!status.approval_url;
    const steps = [
      {
        key: "connect",
        done: connected,
        title: __("Connect an AI provider", "video-gallery-block"),
        text: __("Choose Google, OpenAI or Anthropic and paste its API key.", "video-gallery-block"),
        button: __("Open Connectors", "video-gallery-block"),
        href: status.connectors_url,
      },
      ...(hasApproval
        ? [
            {
              key: "approve",
              done: false,
              title: __("Allow this plugin to use it", "video-gallery-block"),
              text: __("Approve Video Gallery Block for your provider.", "video-gallery-block"),
              button: __("Open Connector Approvals", "video-gallery-block"),
              href: status.approval_url,
            },
          ]
        : []),
    ];
    const current = steps.findIndex((step) => !step.done);
    return (
      <PanelBody
        className="bPlPanelBody vgbPanel vgbAi"
        title={__("Edit with AI", "video-gallery-block")}
        initialOpen={false}>
        {unreachable ? (
          <>
            <p className="vgbAi__text">
              {__(
                "Your AI provider is connected, but we could not reach it right now. Check the key under Settings, Connectors, then check again.",
                "video-gallery-block",
              )}
            </p>
            <div className="vgbAi__actions">
              <Button variant="primary" href={status.connectors_url} target="_blank" rel="noopener noreferrer">
                {__("Open Connectors", "video-gallery-block")}
              </Button>
              <Button variant="secondary" onClick={recheck} isBusy={checking} disabled={checking}>
                {checking ? __("Checking…", "video-gallery-block") : __("Check again", "video-gallery-block")}
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="vgbAi__text">
              {__(
                "Describe the gallery you want and AI sets it up for you. Turn it on once:",
                "video-gallery-block",
              )}
            </p>
            <ol className="vgbAi__setup">
              {steps.map((step, i) => (
                <li
                  key={step.key}
                  className={
                    "vgbAi__setupItem" +
                    (step.done ? " is-done" : "") +
                    (i === current ? " is-current" : "")
                  }>
                  <span className="vgbAi__setupNum" aria-hidden="true">
                    {step.done ? "✓" : i + 1}
                  </span>
                  <div className="vgbAi__setupBody">
                    <strong>{step.title}</strong>
                    {!step.done && <span>{step.text}</span>}
                    {i === current && (
                      <Button variant="primary" href={step.href} target="_blank" rel="noopener noreferrer">
                        {step.button}
                      </Button>
                    )}
                  </div>
                </li>
              ))}
              <li className="vgbAi__setupItem">
                <span className="vgbAi__setupNum" aria-hidden="true">{steps.length + 1}</span>
                <div className="vgbAi__setupBody">
                  <strong>{__("Come back here", "video-gallery-block")}</strong>
                  <span>{__("Edit with AI turns on by itself.", "video-gallery-block")}</span>
                  <Button variant="secondary" onClick={recheck} isBusy={checking} disabled={checking}>
                    {checking ? __("Checking…", "video-gallery-block") : __("Check again", "video-gallery-block")}
                  </Button>
                </div>
              </li>
            </ol>
          </>
        )}
      </PanelBody>
    );
  }

  const videos = Array.isArray(attributes.videos) ? attributes.videos : [];
  const isFeed = !!attributes.feed?.enabled;

  // Videos you added yourself, not a channel feed (a feed has its own titles).
  const untitled = isFeed
    ? []
    : videos
        .map((item, i) => ({ i, url: item?.video || "", caption: item?.caption || "" }))
        .filter((item) => item.url && !item.caption);
  const titled = isFeed
    ? []
    : videos
        .map((item, i) => ({ i, caption: item?.caption || "" }))
        .filter((item) => item.caption);

  const reset = () => {
    setError("");
    setResult(null);
    setJob(null);
    setUndo(null);
  };

  const call = async (path, data, onDone) => {
    if (busy) return;
    setBusy(true);
    reset();
    try {
      onDone(await apiFetch({ path, method: "POST", data }));
    } catch (e) {
      setError(
        e?.message ||
          __(
            "The AI could not answer right now. Please try again.",
            "video-gallery-block",
          ),
      );
    } finally {
      setBusy(false);
    }
  };

  /* ---- Describe the gallery -------------------------------------------- */

  const generate = () => {
    if (busy || !prompt.trim()) return;
    call(
      "/vidgalblk/v1/ai/gallery",
      { prompt, attributes: pick(attributes) },
      (res) => setResult(res),
    );
  };

  const apply = () => {
    const patch = result?.patch || {};
    const before = {};
    const next = {};
    Object.keys(patch).forEach((key) => {
      before[key] = attributes[key];
      next[key] =
        isObject(patch[key]) && isObject(attributes[key])
          ? { ...attributes[key], ...patch[key] }
          : patch[key];
    });
    setAttributes(next);
    setUndo({ before });
    setResult(null);
    setPrompt("");
  };

  /* ---- Titles for videos without one ----------------------------------- */

  const writeTitles = () => {
    const sent = untitled.slice(0, MAX_JOB_VIDEOS);
    call(
      "/vidgalblk/v1/ai/titles",
      { videos: sent, pageTitle: pageTitle() },
      (res) =>
        setJob({
          kind: "titles",
          res,
          sent: Object.fromEntries(sent.map((item) => [item.i, item.url])),
        }),
    );
  };

  const applyTitles = () => {
    const next = videos.map((item) => item);
    let count = 0;
    (job.res.items || []).forEach(({ i, title }) => {
      // Only if that video is still the same one and still has no title.
      if (next[i] && next[i].video === job.sent[i] && !next[i].caption) {
        next[i] = { ...next[i], caption: title };
        count++;
      }
    });
    if (count) {
      setUndo({ before: { videos } });
      setAttributes({ videos: next });
    }
    setJob(null);
  };

  /* ---- Sort into albums ------------------------------------------------- */

  const sortAlbums = () => {
    const sent = titled.slice(0, MAX_JOB_VIDEOS);
    const albums = Array.isArray(attributes.albums) ? attributes.albums : [];
    call(
      "/vidgalblk/v1/ai/albums",
      { videos: sent, albums: albums.filter((name) => "string" === typeof name && name) },
      (res) =>
        setJob({
          kind: "albums",
          res,
          sent: Object.fromEntries(sent.map((item) => [item.i, item.caption])),
        }),
    );
  };

  const applyAlbums = () => {
    const albums = Array.isArray(attributes.albums) ? attributes.albums : [];
    const nextAlbums = unique([...albums, ...(job.res.albums || [])]);
    const next = videos.map((item) => item);
    (job.res.assignments || []).forEach(({ i, albums: names }) => {
      if (next[i] && next[i].caption === job.sent[i]) {
        next[i] = { ...next[i], albs: unique([...(next[i].albs || []), ...names]) };
      }
    });
    setUndo({ before: { albums: attributes.albums, videos } });
    setAttributes({ albums: nextAlbums, videos: next });
    setJob(null);
  };

  const undoApply = () => {
    if (undo) setAttributes(undo.before);
    setUndo(null);
  };

  const hasChanges = !!result && result.changes && result.changes.length > 0;
  const titleItems = job?.kind === "titles" ? job.res.items || [] : [];
  const albumRows = job?.kind === "albums" ? job.res.summary || [] : [];

  return (
    <PanelBody
      className="bPlPanelBody vgbPanel vgbAi"
      title={__("Edit with AI", "video-gallery-block")}
      initialOpen={true}>
      <div
        onKeyDown={(e) => {
          if ("Enter" === e.key && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            generate();
          }
        }}>
        <TextareaControl
          label={__("What should the gallery look like?", "video-gallery-block")}
          value={prompt}
          onChange={setPrompt}
          rows={3}
          maxLength={600}
          placeholder={__(
            "e.g. 4 columns, dark background, round corners",
            "video-gallery-block",
          )}
          __nextHasNoMarginBottom
        />
      </div>

      <div className="vgbAi__chips">
        {examples().map((text) => (
          <button
            type="button"
            key={text}
            className="vgbAi__chip"
            onClick={() => setPrompt(text)}>
            {text}
          </button>
        ))}
      </div>

      <Button
        variant="primary"
        onClick={generate}
        disabled={busy || !prompt.trim()}
        isBusy={busy}>
        {busy
          ? __("Thinking…", "video-gallery-block")
          : __("Preview changes", "video-gallery-block")}
      </Button>
      {busy && <Spinner />}

      {(untitled.length > 0 || titled.length >= 4) && (
        <div className="vgbAi__more">
          <p className="vgbAi__text">
            {__("Or let AI help with your videos:", "video-gallery-block")}
          </p>
          {untitled.length > 0 && (
            <Button variant="secondary" onClick={writeTitles} disabled={busy}>
              {sprintf(
                /* translators: %d: number of videos without a title */
                _n(
                  "Write a title for %d video without one",
                  "Write titles for %d videos without one",
                  untitled.length,
                  "video-gallery-block",
                ),
                untitled.length,
              )}
            </Button>
          )}
          {titled.length >= 4 && (
            <Button variant="secondary" onClick={sortAlbums} disabled={busy}>
              {__("Sort videos into albums", "video-gallery-block")}
            </Button>
          )}
        </div>
      )}

      <div aria-live="polite">
        {error && (
          <Notice status="error" isDismissible={false} className="vgbAi__notice">
            {error}
          </Notice>
        )}

        {result && !hasChanges && (
          <Notice status="info" isDismissible={false} className="vgbAi__notice">
            {result.message ||
              __(
                "Nothing needed to change. Try describing it a little differently.",
                "video-gallery-block",
              )}
          </Notice>
        )}

        {hasChanges && (
          <div className="vgbAi__result">
            {result.message && <p className="vgbAi__text">{result.message}</p>}
            <ul className="vgbAi__list">
              {result.changes.map((change) => (
                <li key={change.key}>
                  <span>{change.label}</span>
                  <span className="vgbAi__value">
                    {change.from} → <strong>{change.to}</strong>
                  </span>
                </li>
              ))}
            </ul>
            <div className="vgbAi__actions">
              <Button variant="primary" onClick={apply}>
                {sprintf(
                  /* translators: %d: number of settings that will change */
                  __("Apply %d changes", "video-gallery-block"),
                  result.changes.length,
                )}
              </Button>
              <Button variant="tertiary" onClick={() => setResult(null)}>
                {__("Discard", "video-gallery-block")}
              </Button>
            </div>
          </div>
        )}

        {job?.kind === "titles" && titleItems.length === 0 && (
          <Notice status="info" isDismissible={false} className="vgbAi__notice">
            {__(
              "The file names did not say enough to write a title. You can type them yourself.",
              "video-gallery-block",
            )}
          </Notice>
        )}

        {titleItems.length > 0 && (
          <div className="vgbAi__result">
            {job.res.message && <p className="vgbAi__text">{job.res.message}</p>}
            <ul className="vgbAi__list">
              {titleItems.map((item) => (
                <li key={item.i}>
                  <span className="vgbAi__file">{item.file}</span>
                  <span className="vgbAi__value">
                    <strong>{item.title}</strong>
                  </span>
                </li>
              ))}
            </ul>
            <div className="vgbAi__actions">
              <Button variant="primary" onClick={applyTitles}>
                {sprintf(
                  /* translators: %d: number of titles to add */
                  _n(
                    "Add %d title",
                    "Add %d titles",
                    titleItems.length,
                    "video-gallery-block",
                  ),
                  titleItems.length,
                )}
              </Button>
              <Button variant="tertiary" onClick={() => setJob(null)}>
                {__("Discard", "video-gallery-block")}
              </Button>
            </div>
          </div>
        )}

        {job?.kind === "albums" && albumRows.length === 0 && (
          <Notice status="info" isDismissible={false} className="vgbAi__notice">
            {__(
              "The titles did not suggest clear groups. Try again after adding more videos.",
              "video-gallery-block",
            )}
          </Notice>
        )}

        {albumRows.length > 0 && (
          <div className="vgbAi__result">
            {job.res.message && <p className="vgbAi__text">{job.res.message}</p>}
            <ul className="vgbAi__list">
              {albumRows.map((row) => (
                <li key={row.album}>
                  <span>
                    {row.album}
                    {row.isNew && (
                      <em className="vgbAi__new">{__("new", "video-gallery-block")}</em>
                    )}
                  </span>
                  <span className="vgbAi__value">
                    {sprintf(
                      /* translators: %d: number of videos */
                      _n("%d video", "%d videos", row.count, "video-gallery-block"),
                      row.count,
                    )}
                  </span>
                </li>
              ))}
            </ul>
            <div className="vgbAi__actions">
              <Button variant="primary" onClick={applyAlbums}>
                {__("Apply albums", "video-gallery-block")}
              </Button>
              <Button variant="tertiary" onClick={() => setJob(null)}>
                {__("Discard", "video-gallery-block")}
              </Button>
            </div>
          </div>
        )}

        {undo && (
          <Notice status="success" isDismissible={false} className="vgbAi__notice">
            {__("Applied.", "video-gallery-block")}{" "}
            <Button variant="link" onClick={undoApply}>
              {__("Undo", "video-gallery-block")}
            </Button>
          </Notice>
        )}
      </div>
    </PanelBody>
  );
};

export default AiAssistant;
