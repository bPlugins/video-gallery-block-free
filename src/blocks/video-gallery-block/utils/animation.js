/*
 * Animation: a Zoom hover effect on the thumbnails, off by default, so every
 * gallery made before this existed looks and moves exactly as before.
 * render.php prints the same classes.
 */

export const HOVER_EFFECTS = ["none", "zoom"];
export const SPEEDS = ["slow", "normal", "fast"];

/** The gallery's animation settings, each one a known value. */
export const animationOf = (attributes) => {
  const a = attributes?.animation || {};
  return {
    hover: HOVER_EFFECTS.includes(a.hover) ? a.hover : "none",
    speed: SPEEDS.includes(a.speed) ? a.speed : "normal",
  };
};

/** Classes for the gallery's root, as render.php prints them. */
export const animationClasses = ({ hover, speed }) =>
  ["none" !== hover && `vgbHover-${hover}`, "none" !== hover && "normal" !== speed && `vgbAnimSpeed-${speed}`].filter(
    Boolean,
  );
