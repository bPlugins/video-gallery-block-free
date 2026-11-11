import { useEffect, useRef, useState } from "@wordpress/element";
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

// A sparkle by the panel title: the one panel that is AI, easy to find among the
// settings. Violet into the panel blue -- the colors people know from other AI
// tools -- so it reads as "AI" at a glance. Inline style, so the sidebar grey
// never paints over it.
const aiIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="vgbAiSparkle" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#7b61ff" />
        <stop offset="1" stopColor="#146ef5" />
      </linearGradient>
    </defs>
    <path style={{ fill: "url(#vgbAiSparkle)" }} d="M10 3l1.8 5.2L17 10l-5.2 1.8L10 17l-1.8-5.2L3 10l5.2-1.8L10 3zm8 10l.9 2.1 2.1.9-2.1.9L18 21l-.9-2.1L15 18l2.1-.9L18 13z" />
  </svg>
);

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
    statusRequest = apiFetch({ path: "/vidgalblk/v1/ai/status" + (force ? "?refresh=1" : "") })
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
  const lastCall = useRef(null); // the last request, to run again after an error
  const [checking, setChecking] = useState(false);

  // The answer can land below the fold of a tall sidebar: bring it into view.
  useEffect(() => {
    if (!result && !job && !error) return;
    const t = setTimeout(() => {
      const el = document.querySelector(".vgbAi .vgbAi__result, .vgbAi .vgbAi__notice");
      if (el && el.scrollIntoView) {
        const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        // A preview must show its Apply button: people took the preview for the change itself.
        const actions = el.querySelector(".vgbAi__actions");
        (actions || el).scrollIntoView({ block: actions ? "end" : "nearest", behavior: reduce ? "auto" : "smooth" });
      }
    }, 60);
    return () => clearTimeout(t);
  }, [result, job, error]);

  // "Test connection": one tiny real request, answered in plain words.
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null); // { ok, text }
  const runTest = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const res = await apiFetch({ path: "/vidgalblk/v1/ai/test", method: "POST" });
      setTestResult({ ok: true, text: res?.message || __("Connected. AI is working.", "video-gallery-block") });
      loadStatus(true).then((value) => setStatus(value));
    } catch (e) {
      setTestResult({
        ok: false,
        text: e?.message || __("We could not reach your AI provider right now.", "video-gallery-block"),
      });
    } finally {
      setTesting(false);
    }
  };
  // With two or more providers ready, an administrator picks which one the plugin uses.
  const [chosenNow, setChosenNow] = useState(null); // shown at once, before the server has answered
  const chooseProvider = async (provider) => {
    setChosenNow(provider);
    setTestResult(null);
    try {
      await apiFetch({ path: "/vidgalblk/v1/ai/provider", method: "POST", data: { provider } });
      const value = await loadStatus(true);
      setStatus(value);
    } catch (e) {
      setTestResult({ ok: false, text: e?.message || __("Could not save the choice.", "video-gallery-block") });
    } finally {
      setChosenNow(null);
    }
  };
  // Every provider WordPress lists; the ones not set up yet are greyed out and say so.
  const providerList =
    status && Array.isArray(status.providers) && status.providers.length
      ? Array.isArray(status.available) && status.available.length
        ? status.available.filter((p) => !p.suggested)
        : status.providers.map((p) => ({ ...p, connected: true }))
      : [];
  /*
   * Which provider the gallery's AI uses, in one line (its logo and name, as in
   * Settings → Connectors). With two or more connected, "Change" picks among
   * them; setting more up is on the AI Setup page.
   */
  const [picking, setPicking] = useState(false);
  const connectedList = providerList.filter((p) => p.connected);
  const chosenId = null !== chosenNow ? chosenNow : status?.provider || "";
  const chosen = connectedList.find((p) => p.id === chosenId);
  const shown = chosen || (1 === connectedList.length ? connectedList[0] : null);
  const logoOf = (id) => (status?.available || []).find((p) => p.id === id)?.logo || "";
  const providerChoice = connectedList.length ? (
    <div className="vgbAi__provider">
      <div className="vgbAi__using">
        <span className="vgbAi__usingLogo" aria-hidden="true">
          {shown && logoOf(shown.id) ? (
            <img src={logoOf(shown.id)} alt="" width="24" height="24" />
          ) : (
            <span>{shown ? shown.name.charAt(0) : "A"}</span>
          )}
        </span>
        <span className="vgbAi__usingText">
          <strong>{shown ? shown.name : __("Automatic", "video-gallery-block")}</strong>
          <span>
            {chosen
              ? __("AI provider", "video-gallery-block")
              : connectedList.length > 1
              ? sprintf(
                  /* translators: %s: provider names, comma-separated. */
                  __("WordPress picks from %s", "video-gallery-block"),
                  connectedList.map((p) => p.name).join(", "),
                )
              : __("Connected", "video-gallery-block")}
          </span>
        </span>
        {connectedList.length > 1 && (
          <Button variant="link" onClick={() => setPicking(!picking)} aria-expanded={picking}>
            {picking ? __("Done", "video-gallery-block") : __("Change", "video-gallery-block")}
          </Button>
        )}
      </div>
      {picking && (
        <select
          className="vgbAi__providerSelect"
          aria-label={__("AI provider", "video-gallery-block")}
          value={chosenId}
          onChange={(e) => chooseProvider(e.target.value)}>
          <option value="">{__("Automatic", "video-gallery-block")}</option>
          {connectedList.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      )}
    </div>
  ) : null;
  // The dashboard's AI Setup page: providers, keys and the rest.
  const aiSettingsLink = (
    <a href="edit.php?post_type=video-gallery-block&page=vgb-help-demo#/ai" target="_blank" rel="noopener noreferrer">
      {__("AI settings", "video-gallery-block")}
    </a>
  );
  const testButton = (primary) => (
    <>
      <Button variant={primary ? "primary" : "link"} onClick={runTest} isBusy={testing} disabled={testing}>
        {testing ? __("Testing…", "video-gallery-block") : __("Test connection", "video-gallery-block")}
      </Button>
      {testResult && (
        <Notice status={testResult.ok ? "success" : "error"} isDismissible={false} className="vgbAi__notice">
          {testResult.text}
        </Notice>
      )}
    </>
  );

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
  if (!status) {
    return null;
  }
  if (["unsupported", "disabled"].includes(status.state)) {
    return (
      <PanelBody
        className="bPlPanelBody vgbPanel vgbAi"
        title={__("Edit with AI", "video-gallery-block")}
        icon={aiIcon}
        initialOpen={false}>
        <p className="vgbAi__text">
          {"unsupported" === status.state
            ? __("Edit with AI needs WordPress 7.0 or newer. Update WordPress to use it.", "video-gallery-block")
            : __("AI is switched off on this site. Ask the site administrator to turn it on.", "video-gallery-block")}
        </p>
      </PanelBody>
    );
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
        text: __("Pick a provider, install its plugin if asked, and paste its API key. Google has a free plan with limits; OpenAI and Anthropic need a paid account.", "video-gallery-block"),
        keys: !connected,
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
        icon={aiIcon}
        initialOpen={false}>
        {unreachable ? (
          <>
            <p className="vgbAi__text">
              {__(
                "Your AI provider is connected, but we could not reach it right now. Check the key under Settings, Connectors, then test the connection.",
                "video-gallery-block",
              )}
            </p>
            <div className="vgbAi__actions">
              <Button variant="primary" href={status.connectors_url} target="_blank" rel="noopener noreferrer">
                {__("Open Connectors", "video-gallery-block")}
              </Button>
              <Button variant="secondary" onClick={runTest} isBusy={testing} disabled={testing}>
                {testing ? __("Testing…", "video-gallery-block") : __("Test connection", "video-gallery-block")}
              </Button>
            </div>
            {testResult && (
              <Notice status={testResult.ok ? "success" : "error"} isDismissible={false} className="vgbAi__notice">
                {testResult.text}
              </Notice>
            )}
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
                    {!step.done && step.keys && (
                      <span className="vgbAi__keys">
                        {__("Get a key:", "video-gallery-block")}{" "}
                        <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer">Google</a>
                        {" · "}
                        <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer">OpenAI</a>
                        {" · "}
                        <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noopener noreferrer">Anthropic</a>
                      </span>
                    )}
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
    lastCall.current = () => call(path, data, onDone);
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
        icon={aiIcon}
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
            <Button variant="secondary" style={{ order: 11 }} onClick={writeTitles} disabled={busy}>
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
            <Button variant="secondary" style={{ order: 21 }} onClick={sortAlbums} disabled={busy}>
              {__("Sort videos into albums", "video-gallery-block")}
            </Button>
          )}
        </div>
      )}

      <div aria-live="polite">
        {error && (
          <Notice status="error" isDismissible={false} className="vgbAi__notice">
            {error}
            {lastCall.current && (
              <>
                {" "}
                <Button variant="link" onClick={() => lastCall.current && lastCall.current()} disabled={busy}>
                  {__("Try again", "video-gallery-block")}
                </Button>
              </>
            )}
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
            <p className="vgbAi__pending">
              {__("Preview: nothing has changed yet. Check the list, then press Apply.", "video-gallery-block")}
            </p>
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

        <div className="vgbAi__test">
          {providerChoice}
          <div className="vgbAi__testLinks">
            {testButton(false)}
            <span aria-hidden="true">·</span>
            {aiSettingsLink}
          </div>
        </div>
      </div>
    </PanelBody>
  );
};

export default AiAssistant;
