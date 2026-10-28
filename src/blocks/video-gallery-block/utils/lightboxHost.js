/**
 * An isolated home for the front-end lightbox.
 *
 * Fancybox's class names (`.fancybox__container`, `.f-button`, ...) are the
 * same in every plugin that ships a copy of it, in several incompatible
 * versions, and their stylesheets are global. With another plugin's Fancybox
 * on the page, its rules reached into this lightbox (it opened transparent,
 * hidden, or off screen) and ours reached into theirs.
 *
 * So the lightbox is mounted inside a shadow root: no stylesheet on the page
 * can touch it, and ours cannot leak out. The root gets copies of this
 * plugin's own stylesheets only, plus the per-gallery lightbox rules, plus
 * the Plyr icon sprite (an SVG `<use href="#...">` cannot see an id outside
 * its own root).
 *
 * Front end only. The editor keeps the document-level lightbox.
 */
const OWN_STYLE = /\/video-gallery-block(?:-free)?\/build\/blocks\/video-gallery-block\/view\.css/;
const GALLERY_RULES = "-fancyBox";

let mount = null;
let dynamic = null;

const OWN_SCRIPT = /\/build\/blocks\/video-gallery-block\/view\.js/;
const OWN_RULES = /fancybox|f-button|f-carousel|f-thumbs|f-spinner|plyr|vgb|vidgalblk/i;

/**
 * Where the plugin folder is, read from our own stylesheet or, when a cache or
 * optimizer plugin merged or renamed that, from our own script.
 */
const pluginBase = () => {
  const link = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
    .map((el) => el.href)
    .find((href) => OWN_STYLE.test(href));
  if (link) return link.replace(/build\/blocks\/.*$/, "");

  const script = Array.from(document.scripts)
    .map((el) => el.src)
    .find((src) => OWN_SCRIPT.test(src));

  return script ? script.replace(/build\/blocks\/.*$/, "") : "";
};

/**
 * Last resort for a page whose optimizer merged our stylesheet into another
 * file or inlined it: copy every rule on the page about the lightbox or the
 * player, so the shadow root is never left unstyled.
 */
const pageRules = () => {
  const out = [];

  Array.from(document.styleSheets).forEach((sheet) => {
    let rules;
    try {
      rules = sheet.cssRules;
    } catch (e) {
      return; // cross-origin sheet, unreadable
    }
    Array.from(rules || []).forEach((rule) => {
      if (OWN_RULES.test(rule.cssText)) out.push(rule.cssText);
    });
  });

  return out.join("\n");
};

/** Copies every per-gallery lightbox rule on the page into the root. */
const syncGalleryRules = () => {
  if (!dynamic) return;

  dynamic.textContent = Array.from(document.querySelectorAll("style"))
    .map((el) => el.textContent || "")
    .filter((css) => css.includes(GALLERY_RULES))
    .join("\n");
};

const loadSprite = (root, base) => {
  if (!base) return;

  fetch(`${base}public/plyr.svg`)
    .then((response) => (response.ok ? response.text() : ""))
    .then((svg) => {
      if (!svg) return;
      const holder = document.createElement("div");
      holder.hidden = true;
      holder.innerHTML = svg;
      root.prepend(holder);
    })
    .catch(() => {});
};

/** The element Fancybox appends the lightbox to (`parentEl`). */
export const getLightboxMount = () => {
  if (mount?.isConnected) {
    syncGalleryRules();
    return mount;
  }

  const host = document.createElement("div");
  host.className = "vgb-lightbox-host";
  // The page's own rules for `div` must not reach the host either.
  host.style.cssText = "all:initial;font:inherit;color:inherit";

  const root = host.attachShadow({ mode: "open" });
  const base = pluginBase();

  const addStylesheet = (href) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    root.append(link);
  };

  const own = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
    .map((el) => el.href)
    .filter((href) => OWN_STYLE.test(href));
  own.forEach(addStylesheet);
  if (!own.length) {
    const fallback = document.createElement("style");
    fallback.textContent = pageRules();
    root.append(fallback);
    if (base) addStylesheet(`${base}build/blocks/video-gallery-block/view.css`);
  }
  if (base) addStylesheet(`${base}public/css/plyr.css`);

  dynamic = document.createElement("style");
  root.append(dynamic);

  mount = document.createElement("div");
  root.append(mount);

  loadSprite(root, base);
  syncGalleryRules();
  document.body.append(host);

  return mount;
};

/** The root holding the lightbox, if it has been opened. */
export const getLightboxRoot = () =>
  document.querySelector(".vgb-lightbox-host")?.shadowRoot || null;
