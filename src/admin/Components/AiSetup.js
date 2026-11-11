import { useState, useEffect, useCallback } from "react";
import apiFetch from "@wordpress/api-fetch";
import { __, sprintf } from "@wordpress/i18n";

import {
  alertIcon,
  checkCircleIcon,
  keyIcon,
  refreshIcon,
  checkIcon,
} from "../../../../bpl-tools/Admin/utils/icons";

const NS = "/vidgalblk/v1/ai";

const STATE_TEXT = {
  unsupported: __(
    "AI needs WordPress 7.0 or newer. Update WordPress to use it.",
    "video-gallery-block",
  ),
  disabled: __(
    "AI is switched off for this site, so Video Gallery Block cannot use it.",
    "video-gallery-block",
  ),
};

// The AI features' tools that other AI apps (through MCP) can use.
const TOOLS = [
  __("List and read your video galleries", "video-gallery-block"),
  __("Check whether a YouTube or Vimeo feed is healthy", "video-gallery-block"),
];

const copy = (text, done) => {
  try {
    navigator.clipboard.writeText(text).then(done, () => {});
  } catch (e) {
    // Clipboard blocked: the text stays selectable on the page.
  }
};

// One row per AI provider WordPress lists, like Settings → Connectors: its
// logo, what it can do, and where it stands or the next step for it.
// Connected ones first.
const ProviderList = ({ list, adminUrl, connectorsUrl, current = "" }) => {
  const items =
    Array.isArray(list) && list.length
      ? list
      : [["Google", "google"], ["OpenAI", "openai"], ["Anthropic", "anthropic"]].map(([name, key]) => ({
          id: key,
          name,
          slug: "ai-provider-for-" + key,
          installed: false,
          active: false,
          connected: false,
        }));
  const sorted = [...items.filter((p) => p.connected), ...items.filter((p) => !p.connected)];
  return (
    <ul className="vgbAiSetup__providerList">
      {sorted.map((p) => {
        let action = null;
        if (p.connected) {
          action = (
            <>
              <span className="vgbAiProvider__pill">{__("Connected", "video-gallery-block")}</span>
              {current === p.id && (
                <span className="vgbAiProvider__pill is-use">{__("In use", "video-gallery-block")}</span>
              )}
              {connectorsUrl && (
                <a className="vgbAiProvider__edit" href={connectorsUrl}>
                  {__("Edit", "video-gallery-block")}
                </a>
              )}
            </>
          );
        } else if (p.active) {
          action = (
            <a className="button" href={connectorsUrl}>
              {__("Add key", "video-gallery-block")}
            </a>
          );
        } else if (p.installed) {
          action = (
            <a className="button" href={(adminUrl || "") + "plugins.php"}>
              {__("Activate", "video-gallery-block")}
            </a>
          );
        } else if (p.slug) {
          action = (
            <a
              className="button"
              href={(adminUrl || "") + "plugin-install.php?tab=plugin-information&plugin=" + p.slug}>
              {__("Install", "video-gallery-block")}
            </a>
          );
        }
        return (
          <li key={p.id} className={"vgbAiProvider" + (p.connected ? " is-connected" : "")}>
            <span className="vgbAiProvider__logo" aria-hidden="true">
              {p.logo ? <img src={p.logo} alt="" /> : <span>{(p.name || "?").charAt(0)}</span>}
            </span>
            <span className="vgbAiProvider__text">
              <strong>{p.name}</strong>
              {p.description && <span>{p.description}</span>}
            </span>
            <span className="vgbAiProvider__action">{action}</span>
          </li>
        );
      })}
    </ul>
  );
};

// One capability chip: what the connected provider can (✓) or cannot (✗) do.
const Chip = ({ on, label, off }) => (
  <li className={"vgbAiSetup__chip " + (on ? "is-on" : "is-off")} title={on ? undefined : off}>
    <span aria-hidden="true">{on ? "✓" : "✗"}</span> {label}
    <span className="screen-reader-text">
      {on ? __("(available)", "video-gallery-block") : off}
    </span>
  </li>
);

// A card in the look of the dashboard's Settings page.
const Card = ({ badge, badgeClass = "", title, text, children, foot }) => (
  <section className="settingsCard">
    <header className="settingsCardHead">
      {badge && <span className={"vgbAiSetup__badge " + badgeClass}>{badge}</span>}
      <div>
        <h2>{title}</h2>
        {text && <p>{text}</p>}
      </div>
    </header>
    {children && <div className="settingsCardBody">{children}</div>}
    {foot && <footer className="settingsCardFoot">{foot}</footer>}
  </section>
);

const AiSetup = ({ restUrl, adminUrl }) => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [choosing, setChoosing] = useState(false);
  const [saved, setSaved] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setFailed(false);
    try {
      setStatus(await apiFetch({ path: NS + "/status?refresh=1" }));
    } catch (e) {
      setFailed(true);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const chooseProvider = async (provider) => {
    setChoosing(true);
    setSaved(false);
    try {
      const next = await apiFetch({
        path: NS + "/provider",
        method: "POST",
        data: { provider },
      });
      // The answer leaves out the provider list; keep the one in hand.
      setStatus((prev) => ({ ...next, available: next?.available ?? prev?.available }));
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (e) {
      setResult({
        ok: false,
        text:
          e?.message ||
          __("Could not change the provider.", "video-gallery-block"),
      });
    }
    setChoosing(false);
  };

  const test = async () => {
    setTesting(true);
    setResult(null);
    try {
      const res = await apiFetch({ path: NS + "/test", method: "POST" });
      setResult({
        ok: true,
        text:
          res?.message ||
          __("The AI answered. Everything works.", "video-gallery-block"),
      });
    } catch (e) {
      setResult({
        ok: false,
        text:
          e?.message ||
          __("The test failed. Please try again.", "video-gallery-block"),
      });
    }
    setTesting(false);
  };

  const state = status?.state;
  const ready = "ready" === state;
  const blocked = state in STATE_TEXT;
  const connected = ["ready", "unreachable", "needs_approval"].includes(state);
  const endpoint =
    (restUrl || "").replace(/\/?$/, "/") + "mcp/mcp-adapter-default-server";

  const testButton = (
    <button
      type="button"
      className="button"
      onClick={test}
      disabled={testing || !connected}>
      {testing
        ? __("Testing…", "video-gallery-block")
        : __("Test connection", "video-gallery-block")}
    </button>
  );

  const steps = [
    {
      title: __("Connect an AI provider", "video-gallery-block"),
      text: __(
        "Install a provider plugin (Google, OpenAI or Anthropic) and paste its API key under Settings, Connectors. Google has a free plan with limits; OpenAI and Anthropic need a paid account.",
        "video-gallery-block",
      ),
      done: connected,
      button: status?.connectors_url && (
        <a className="button button-primary" href={status.connectors_url}>
          {__("Open Connectors", "video-gallery-block")}
        </a>
      ),
      keys: !connected,
    },
    ...(status?.approval_url
      ? [
          {
            title: __(
              "Allow Video Gallery Block to use it",
              "video-gallery-block",
            ),
            text: __(
              "Approve this plugin for your provider.",
              "video-gallery-block",
            ),
            done: "needs_approval" !== state && connected,
            button: (
              <a className="button button-primary" href={status.approval_url}>
                {__("Open Connector Approvals", "video-gallery-block")}
              </a>
            ),
          },
        ]
      : []),
    {
      title: __("Test the connection", "video-gallery-block"),
      text: __(
        "One tiny request to your provider, so you know it works before you edit a gallery.",
        "video-gallery-block",
      ),
      done: ready,
      button: testButton,
    },
  ];
  const current = steps.findIndex((s) => !s.done);

  // The status strip: one line on where AI stands right now.
  let statusIcon = keyIcon;
  let statusTitle = __("AI is not set up yet", "video-gallery-block");
  let statusText = __(
    "Follow the steps below. It takes about two minutes.",
    "video-gallery-block",
  );
  let statusClass = "is-pending";
  if (loading) {
    statusTitle = __("Checking…", "video-gallery-block");
    statusText = __("Asking WordPress whether an AI provider is connected.", "video-gallery-block");
  } else if (failed) {
    statusIcon = alertIcon;
    statusTitle = __("Could not check the AI status", "video-gallery-block");
    statusText = __("Please try again.", "video-gallery-block");
    statusClass = "is-bad";
  } else if (blocked) {
    statusIcon = alertIcon;
    statusTitle = __("AI is not available", "video-gallery-block");
    statusText = STATE_TEXT[state];
    statusClass = "is-bad";
  } else if (ready) {
    statusIcon = checkCircleIcon;
    statusTitle = __("AI is ready", "video-gallery-block");
    statusText = __(
      "Your AI provider is connected. Open any Video Gallery block and use “Edit with AI” in its sidebar.",
      "video-gallery-block",
    );
    statusClass = "is-ready";
  }

  const resultLine = result && (
    <p
      className={"vgbAiSetup__result " + (result.ok ? "is-ok" : "is-bad")}
      role="status">
      {result.text}
    </p>
  );


  return (
    <div className="bPlDashboardSettings vgbAiSetup">
      <header className="settingsHero">
        <span className="settingsEyebrow">{__("AI Setup", "video-gallery-block")}</span>
        <h1>{__("Build galleries with AI", "video-gallery-block")}</h1>
        <p>
          {__(
            "Turn on AI once and Video Gallery Block can set up a gallery from a short description. You will find it in the block's sidebar under “Edit with AI”.",
            "video-gallery-block",
          )}
        </p>
      </header>

      <section className={"settingsStatus vgbAiSetup__status " + statusClass} aria-live="polite">
        <div className="settingsStatusIcon">{statusIcon}</div>
        <div className="settingsStatusBody">
          <h2>{statusTitle}</h2>
          <p>{statusText}</p>
        </div>
        {!loading && (
          <button type="button" className="vgbAiSetup__recheck" onClick={load}>
            {refreshIcon}
            {__("Check again", "video-gallery-block")}
          </button>
        )}
      </section>

      {!loading && !failed && !blocked && !ready && (
        <Card
          badge={__("Get started", "video-gallery-block")}
          title={sprintf(
            /* translators: %d: number of steps */
            __("Turn on AI in %d steps", "video-gallery-block"),
            steps.length,
          )}
          text={__(
            "You need an AI provider account. Your key stays in WordPress; Video Gallery Block never sees it.",
            "video-gallery-block",
          )}>
          <ol className="vgbAiSetup__steps">
            {steps.map((step, i) => (
              <li
                key={step.title}
                className={
                  (step.done ? "is-done " : "") +
                  (i === current ? "is-current" : "")
                }>
                <span className="vgbAiSetup__num" aria-hidden="true">
                  {step.done ? "✓" : i + 1}
                </span>
                <div>
                  <strong>{step.title}</strong>
                  {!step.done && <span>{step.text}</span>}
                  {!step.done && step.keys && (
                    <ProviderList list={status.available} adminUrl={adminUrl} connectorsUrl={status.connectors_url} />
                  )}
                  {!step.done && step.keys && (
                    <span>
                      {__("Get a key:", "video-gallery-block")}{" "}
                      <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer">
                        Google
                      </a>
                      {" · "}
                      <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer">
                        OpenAI
                      </a>
                      {" · "}
                      <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noopener noreferrer">
                        Anthropic
                      </a>
                    </span>
                  )}
                  {i === current && step.button}
                </div>
              </li>
            ))}
          </ol>
          {resultLine}
        </Card>
      )}

      {!loading && !failed && ready && (
        <Card
          badge={__("Ready", "video-gallery-block")}
          badgeClass="is-ok"
          title={__("What you can do now", "video-gallery-block")}
          text={__(
            "Add a Video Gallery block to any page, then open “Edit with AI” in the block's sidebar and say what you want.",
            "video-gallery-block",
          )}
          foot={
            <>
              <div className="vgbAiSetup__actions">
                <a className="button button-primary" href={(adminUrl || "") + "post-new.php?post_type=page"}>
                  {__("Try it on a new page", "video-gallery-block")}
                </a>
                {testButton}
              </div>
              {resultLine}
            </>
          }>
          <ul className="vgbAiSetup__chips">
            <Chip on label={__("Gallery setup & styles", "video-gallery-block")} />
            <Chip on label={__("Better video titles", "video-gallery-block")} />
            <Chip on label={__("Sort videos into albums", "video-gallery-block")} />
          </ul>
        </Card>
      )}

      {!loading && !failed && ready && Array.isArray(status.providers) && (
        <Card
          badge={__("Provider", "video-gallery-block")}
          title={__("AI providers", "video-gallery-block")}
          text={__(
            "The gallery's AI uses one connected provider. Let WordPress choose, or pick one.",
            "video-gallery-block",
          )}>
          <div className="vgbAiSetup__useRow">
            <label htmlFor="vgbAiProviderSelect">{__("Use for galleries", "video-gallery-block")}</label>
            <select
              id="vgbAiProviderSelect"
              className="vgbAiSetup__select"
              value={status.provider || ""}
              disabled={choosing}
              onChange={(e) => chooseProvider(e.target.value)}>
              <option value="">{__("Let WordPress choose", "video-gallery-block")}</option>
              {(Array.isArray(status.available) && status.available.length
                ? status.available.filter((p) => !p.suggested)
                : status.providers.map((p) => ({ ...p, connected: true }))
              ).map((p) => (
                <option key={p.id} value={p.id} disabled={!p.connected}>
                  {p.connected
                    ? p.name
                    : sprintf(
                        /* translators: %s: AI provider name */
                        __("%s (not set up)", "video-gallery-block"),
                        p.name,
                      )}
                </option>
              ))}
            </select>
            <span className="vgbAiSetup__saved" role="status">
              {choosing
                ? __("Saving…", "video-gallery-block")
                : saved
                ? __("✓ Saved", "video-gallery-block")
                : ""}
            </span>
          </div>
          {Array.isArray(status.available) && status.available.length > 0 && (
            <ProviderList
              list={status.available}
              adminUrl={adminUrl}
              connectorsUrl={status.connectors_url}
              current={status.provider || ""}
            />
          )}
          {status.connectors_url && (
            <p className="vgbAiSetup__note">
              {__("Keys are kept by WordPress, under", "video-gallery-block")}{" "}
              <a href={status.connectors_url}>{__("Settings → Connectors", "video-gallery-block")}</a>.
            </p>
          )}
        </Card>
      )}

      <Card
        badge={__("Optional", "video-gallery-block")}
        badgeClass="is-muted"
        title={__("Use it from other AI apps", "video-gallery-block")}
        text={__(
          "Apps such as Claude or ChatGPT can look at your galleries through the WordPress MCP Adapter plugin. They act as the user you sign in with, so they can only do what that user may do.",
          "video-gallery-block",
        )}>
        <ol className="vgbAiSetup__steps">
          <li>
            <span className="vgbAiSetup__num" aria-hidden="true">1</span>
            <div>
              <strong>{__("Install the MCP Adapter plugin", "video-gallery-block")}</strong>
              <span>
                <a href={(adminUrl || "") + "plugin-install.php?tab=plugin-information&plugin=mcp-adapter"}>
                  {__("Install MCP Adapter", "video-gallery-block")}
                </a>
              </span>
            </div>
          </li>
          <li>
            <span className="vgbAiSetup__num" aria-hidden="true">2</span>
            <div>
              <strong>{__("Sign your AI app in", "video-gallery-block")}</strong>
              <span>
                {__(
                  "How an AI app signs in depends on the app. The MCP Adapter guide explains the options.",
                  "video-gallery-block",
                )}{" "}
                <a href="https://github.com/WordPress/mcp-adapter" target="_blank" rel="noopener noreferrer">
                  {__("Open the guide", "video-gallery-block")}
                </a>
              </span>
            </div>
          </li>
          <li>
            <span className="vgbAiSetup__num" aria-hidden="true">3</span>
            <div>
              <strong>{__("Give the AI app this address", "video-gallery-block")}</strong>
              <div className="vgbAiSetup__codeRow">
                <code className="vgbAiSetup__code">{endpoint}</code>
                <button
                  type="button"
                  className="button"
                  onClick={() =>
                    copy(endpoint, () => {
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    })
                  }>
                  {copied
                    ? __("Copied", "video-gallery-block")
                    : __("Copy address", "video-gallery-block")}
                </button>
              </div>
            </div>
          </li>
        </ol>
        <p className="cleanupLabel">{__("What the AI app can do", "video-gallery-block")}</p>
        <ul className="cleanupList vgbAiSetup__tools">
          {TOOLS.map((tool) => (
            <li key={tool}>
              <span className="vgbAiSetup__dot">{checkIcon}</span>
              {tool}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default AiSetup;
