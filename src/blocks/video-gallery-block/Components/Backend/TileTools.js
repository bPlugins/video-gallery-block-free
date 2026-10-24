import { Spinner } from "@wordpress/components";
import { __, sprintf } from "@wordpress/i18n";

const stop = (event) => {
  event.preventDefault();
  event.stopPropagation();
};

/**
 * Editor only: the small toolbar a tile shows while the pointer is on it (or
 * a button in it has keyboard focus) -- a handle to drag the video to another
 * place, and Move left / Move right for doing the same from the keyboard.
 * Dragging itself is handled by useCanvasVideoDnd. Never part of the page.
 *
 * @param {Object}   props
 * @param {number}   props.index   The video's index in `videos`.
 * @param {number}   props.prev    Index of the tile before it, or -1.
 * @param {number}   props.next    Index of the tile after it, or -1.
 * @param {boolean}  props.canMove Moving is possible (manual order).
 * @param {Function} props.onMove  Move a video: (from, to).
 * @param {Object}   props.extra   More buttons, after these.
 */
const TileTools = ({ index, prev, next, canMove, onMove, extra = null }) => {
  if (!canMove && !extra) {
    return null;
  }

  return (
    <span className="vgbTileTools" onClick={stop} onDoubleClick={stop}>
      {canMove && (
        <>
          <span
            className="vgbTileTools__drag"
            draggable="true"
            title={__("Drag to move", "video-gallery-block")}
            aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M8 4h3v3H8zm5 0h3v3h-3zM8 10.5h3v3H8zm5 0h3v3h-3zM8 17h3v3H8zm5 0h3v3h-3z" />
            </svg>
          </span>
          <button
            type="button"
            className="vgbTileTools__btn"
            disabled={prev < 0}
            aria-label={__("Move left", "video-gallery-block")}
            title={__("Move left", "video-gallery-block")}
            onClick={(event) => {
              stop(event);
              onMove(index, prev);
            }}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M14.6 6 8.6 12l6 6 1.4-1.4-4.6-4.6 4.6-4.6z" />
            </svg>
          </button>
          <button
            type="button"
            className="vgbTileTools__btn"
            disabled={next < 0}
            aria-label={__("Move right", "video-gallery-block")}
            title={__("Move right", "video-gallery-block")}
            onClick={(event) => {
              stop(event);
              onMove(index, next);
            }}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9.4 6 8 7.4l4.6 4.6L8 16.6 9.4 18l6-6z" />
            </svg>
          </button>
        </>
      )}
      {extra}
    </span>
  );
};

export default TileTools;

/**
 * Editor only: covers the gallery while video files are dragged over it, and
 * while dropped files upload.
 *
 * @param {Object}      props
 * @param {boolean}     props.dragging Files are over the gallery.
 * @param {Object|null} props.upload   { current, total } while uploading.
 */
export const DropOverlay = ({ dragging, upload }) => {
  if (!dragging && !upload) {
    return null;
  }

  return (
    <div className={`vgbDropOverlay ${upload ? "isUploading" : ""}`} role="status">
      <span className="vgbDropOverlay__badge">
        {upload ? (
          <>
            <Spinner />
            {sprintf(
              /* translators: 1: number of the video uploading now, 2: number of videos. */
              __("Uploading %1$d of %2$d…", "video-gallery-block"),
              upload.current,
              upload.total,
            )}
          </>
        ) : (
          __("Drop videos to add them", "video-gallery-block")
        )}
      </span>
    </div>
  );
};
