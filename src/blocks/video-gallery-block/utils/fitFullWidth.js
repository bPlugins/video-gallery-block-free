/**
 * Keep a full-width gallery inside the visible page.
 *
 * Many classic themes (Hello Elementor among them) make `.alignfull` blocks
 * full width with `width: 100vw; margin-inline: calc(50% - 50vw)`. `100vw`
 * includes the vertical scrollbar, so on any desktop browser with a classic
 * scrollbar -- Windows, by default -- the block comes out ~15px wider than the
 * page: half of that hangs off the left edge, half hides under the scrollbar,
 * and the gallery's own side padding looks almost gone. The editor has no such
 * rule, so the editor and the live page disagreed.
 *
 * This only steps in when a gallery actually sticks out of the visible page,
 * and then pins it to exactly the visible width. Themes that already get full
 * width right (block themes, overlay scrollbars on macOS and phones) are never
 * touched. It re-measures whenever the page width changes, which includes the
 * moment a scrollbar appears because the page has grown taller.
 */

const fitted = new Set();

const fit = (el) => {
  // Measure where the theme puts the block on its own.
  el.style.removeProperty("width");
  el.style.removeProperty("max-width");
  el.style.removeProperty("margin-left");
  el.style.removeProperty("margin-right");

  const visible = document.documentElement.clientWidth;
  const rect = el.getBoundingClientRect();

  if (rect.left > -0.5 && rect.right < visible + 0.5) {
    return;
  }

  const style = getComputedStyle(el);
  const marginLeft = parseFloat(style.marginLeft) || 0;
  const marginRight = parseFloat(style.marginRight) || 0;

  // Both margins are set: left-to-right pages position the block by its left
  // margin, right-to-left pages by its right one.
  el.style.setProperty("width", `${visible}px`);
  el.style.setProperty("max-width", `${visible}px`);
  el.style.setProperty("margin-left", `${marginLeft - rect.left}px`);
  el.style.setProperty("margin-right", `${marginRight + rect.right - visible}px`);
};

const refitAll = () => fitted.forEach(fit);

let watching = false;

const watch = () => {
  if (watching) return;
  watching = true;

  if ("ResizeObserver" in window) {
    // The root element narrows when a scrollbar appears; `resize` does not fire.
    new ResizeObserver(() => window.requestAnimationFrame(refitAll)).observe(
      document.documentElement,
    );
  } else {
    window.addEventListener("resize", refitAll);
    window.addEventListener("load", refitAll);
  }
};

export const fitFullWidth = (el) => {
  if (!el?.classList?.contains("alignfull")) return;
  fitted.add(el);
  fit(el);
  watch();
};
