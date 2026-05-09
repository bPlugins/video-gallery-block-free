import { useEffect, useRef } from "react";
const $ = jQuery;

const VideoGalleryFilter = ({ attributes, id, itemWidth, setItemWidth }) => {
  const {
    align,
    albums,
    videos,
    columns,
    columnGap,
    rowGap,
    filter = { show: true, commonLabel: "All Videos" },
    padding,
    border,
    itemHeight,
  } = attributes;
  const { commonLabel } = filter || {};

  const vgbColumn = useRef(null);

  useEffect(() => {
    setItemWidth(vgbColumn.current.clientWidth);
  }, [vgbColumn.current, align, columns, columnGap, rowGap, padding, border]);

  // Icotope
  useEffect(() => {
    const isoOptions = {
      filter: commonLabel ? "*" : `.${lodash.camelCase(albums[0])}`,
      itemSelector: ".galleryItem",
      masonry: {
        fitWidth: true,
        gutter: columnGap,
      },
      stagger: 30,
      transitionDuration: "0.5s",
    };

    const vgbIso = $(`#${id}-gallery`).isotope(isoOptions);
    vgbIso.isotope("destroy");
    vgbIso.isotope(isoOptions);

    // Filter items on button click
    $(`#${id}-filter`).on("click", "button", function () {
      $(`#${id}-filter .current`).removeClass("current");
      $(this).addClass("current");

      const filterValue = $(this).attr("data-filter");

      vgbIso.isotope({ ...isoOptions, filter: filterValue });
    });
  }, [
    commonLabel,
    align,
    videos?.length,
    columns,
    columnGap,
    rowGap,
    itemHeight,
    itemWidth,
    padding,
    border,
  ]);

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

      <div
        className={`vgbColumnSizer columns-${columns.desktop} columns-tablet-${columns.tablet} columns-mobile-${columns.mobile}`}>
        <div className="vgbColumn" ref={vgbColumn}></div>
      </div>
    </>
  );
};

export default VideoGalleryFilter;
