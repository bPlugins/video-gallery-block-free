import { useEffect, useRef } from "react";
import lodash from "lodash";
const $ = jQuery;

const VideoGalleryFilter = ({
  attributes,
  id,
  itemWidth,
  setItemWidth,
  activeFilter,
  setActiveFilter,
}) => {
  const {
    align,
    albums,
    videos,
    columns = { desktop: 3, tablet: 2, mobile: 1 },
    columnGap,
    rowGap,
    filter = { show: true, commonLabel: "All Videos" },
    padding,
    border,
    itemHeight,
  } = attributes;

  // Handle case where columns might be stored as a number or incomplete object
  const colSettings =
    typeof columns === "number"
      ? { desktop: columns, tablet: Math.max(1, columns - 1), mobile: 1 }
      : { ...{ desktop: 3, tablet: 2, mobile: 1 }, ...columns };
  const { commonLabel } = filter || {};

  // Handle filter button clicks
  const handleFilterClick = (filterValue, e) => {
    // Update React state (handles editor and frontend visual)
    setActiveFilter(filterValue);

    // Trigger Isotope (for frontend animation)
    const $ = window.jQuery;
    if ($ && $.fn.isotope) {
      const $gallery = $(`#${id}-gallery`);
      if ($gallery.length) {
        $gallery.isotope({ filter: filterValue });
      }
    }
  };

  return (
    <>
      <div id={`${id}-filter`} className="filter">
        {commonLabel && (
          <button
            data-filter="*"
            className={activeFilter === "*" ? "current" : ""}
            onClick={(e) => handleFilterClick("*", e)}>
            {commonLabel}
          </button>
        )}
        {albums?.map((alb, index) => {
          const filterVal = `.${lodash.camelCase(alb)}`;
          return (
            <button
              className={activeFilter === filterVal ? "current" : ""}
              key={lodash.camelCase(alb)}
              data-filter={filterVal}
              onClick={(e) => handleFilterClick(filterVal, e)}>
              {alb}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default VideoGalleryFilter;
