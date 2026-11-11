import { __, _n, sprintf } from "@wordpress/i18n";
import {
  ToggleControl,
  __experimentalNumberControl as NumberControl,
} from "@wordpress/components";

/**
 * How many more videos each Load More click shows (`loadMoreCount`): 0 means
 * as many as the first page (what it always did), -1 all the rest at once,
 * any other number that many.
 *
 * @param {Object}   props
 * @param {Object}   props.attributes    Block attributes.
 * @param {Function} props.setAttributes Block attribute setter.
 * @param {number}   props.firstPage     Videos shown before the button.
 * @param {Object}   props.numberProps   Extra props for the number field, to
 *                                       match the field next to it.
 */
const LoadMoreCount = ({ attributes, setAttributes, firstPage, numberProps = {} }) => {
  const count = parseInt(attributes.loadMoreCount, 10) || 0;

  return (
    <>
      {count >= 0 && (
        <NumberControl
          {...numberProps}
          label={__("Then show per click", "video-gallery-block")}
          value={count > 0 ? count : firstPage}
          min={1}
          onChange={(val) =>
            setAttributes({ loadMoreCount: Math.max(1, parseInt(val, 10) || 1) })
          }
          help={__("How many more videos each Load More click shows.", "video-gallery-block")}
          __nextHasNoMarginBottom
        />
      )}

      <ToggleControl
        className={numberProps.className?.includes("mt20") ? "mt20" : undefined}
        label={__("Show all the rest on one click", "video-gallery-block")}
        checked={count < 0}
        onChange={(all) => setAttributes({ loadMoreCount: all ? -1 : 0 })}
        __nextHasNoMarginBottom
      />
    </>
  );
};

export default LoadMoreCount;

/**
 * "Show the rest of the videos": off (`pagination: "none"`) shows only the
 * first page, with no Load More button. On is the button, as always.
 */
export const RestToggle = ({ attributes, setAttributes, firstPage, className }) => {
  const none = "none" === attributes.pagination;
  return (
    <ToggleControl
      className={className}
      label={__("Show the rest of the videos", "video-gallery-block")}
      checked={!none}
      onChange={(on) => setAttributes({ pagination: on ? "loadmore" : "none" })}
      help={
        none
          ? sprintf(
              /* translators: %d: number of videos shown */
              _n(
                "Only the first %d video shows, with no Load More button.",
                "Only the first %d videos show, with no Load More button.",
                firstPage,
                "video-gallery-block",
              ),
              firstPage,
            )
          : __("Turn off to show only these videos, with no Load More button.", "video-gallery-block")
      }
      __nextHasNoMarginBottom
    />
  );
};
