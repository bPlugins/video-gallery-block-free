/**
 * Stops the lightbox from following the mouse after a lost mouse-up.
 *
 * Fancybox starts a drag on mouse-down and keeps moving the slide with every
 * mouse move until it hears the mouse-up -- it never checks whether a button
 * is still pressed. A mouse-up it never hears (released over the video
 * player's iframe as it loads, or inside the editor canvas) leaves it
 * dragging: the open lightbox then slides around with the pointer.
 *
 * So: once a press inside the lightbox is followed by a mouse move with no
 * button down, the release is handed to Fancybox here. Installed once per
 * window, for the editor and the page alike.
 */
let installed = false;

const fancyboxDragGuard = () => {
  if (installed || "undefined" === typeof window) return;
  installed = true;

  let pressed = false;

  window.addEventListener(
    "mousedown",
    (event) => {
      pressed =
        0 === event.button &&
        !!event.target?.closest?.(".fancybox__container");
    },
    true,
  );

  window.addEventListener(
    "mouseup",
    () => {
      pressed = false;
    },
    true,
  );

  window.addEventListener(
    "mousemove",
    (event) => {
      if (!pressed || 0 !== event.buttons) return;
      pressed = false;
      window.dispatchEvent(
        new MouseEvent("mouseup", {
          clientX: event.clientX,
          clientY: event.clientY,
          button: 0,
        }),
      );
    },
    true,
  );
};

export default fancyboxDragGuard;
