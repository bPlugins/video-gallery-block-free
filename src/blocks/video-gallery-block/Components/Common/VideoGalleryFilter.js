import { useEffect, useRef } from "react";
const $ = jQuery;

const VideoGalleryFilter = ({ attributes, id, itemWidth, setItemWidth }) => {
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
  const colSettings = typeof columns === 'number' 
    ? { desktop: columns, tablet: Math.max(1, columns - 1), mobile: 1 }
    : { ...{ desktop: 3, tablet: 2, mobile: 1 }, ...columns };
  const { commonLabel } = filter || {};

  return (
    <>
      <div id={`${id}-filter`} className="filter">
        {commonLabel && (
          <button data-filter="*" className="current">
            {commonLabel}
          </button>
        )}
        {albums?.map((alb, index) => (
          <button
            className={index === 0 && !commonLabel ? "current" : ""}
            key={lodash.camelCase(alb)}
            data-filter={`.${lodash.camelCase(alb)}`}>
            {alb}
          </button>
        ))}
      </div>

    </>
  );
};

export default VideoGalleryFilter;
