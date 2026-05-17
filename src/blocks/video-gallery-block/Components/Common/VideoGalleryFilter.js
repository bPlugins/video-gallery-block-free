import lodash from "lodash";
// const $ = jQuery;

const VideoGalleryFilter = ({
  attributes,
  id,
  activeFilter,
  setActiveFilter,
}) => {
  const {
    albums,
    filter = { show: true, commonLabel: "All Videos" },
  } = attributes;

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
        {albums?.map((alb) => {
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
