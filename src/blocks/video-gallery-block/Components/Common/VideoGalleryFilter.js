import { albumClass } from "../../utils/functions";

/**
 * The album filter bar.
 *
 * Filtering is done by the gallery itself, from React state -- this component
 * only reports which album was picked. It used to also reach for
 * `jQuery.fn.isotope` and re-filter the DOM directly, which meant that on any
 * site where jQuery or Isotope was deferred, bundled away or dequeued, the
 * buttons looked active but nothing moved.
 */
const VideoGalleryFilter = ({ attributes, id, activeAlbum, setActiveAlbum }) => {
  const { albums, filter } = attributes;
  const commonLabel = filter?.commonLabel;

  return (
    <div id={`${id}-filter`} className="filter" role="group">
      {commonLabel && (
        <button
          type="button"
          data-filter="*"
          className={"*" === activeAlbum ? "current" : ""}
          aria-pressed={"*" === activeAlbum}
          onClick={() => setActiveAlbum("*")}>
          {commonLabel}
        </button>
      )}

      {albums?.map((album, index) => (
        <button
          type="button"
          key={index}
          data-filter={albumClass(albums, album)}
          className={album === activeAlbum ? "current" : ""}
          aria-pressed={album === activeAlbum}
          onClick={() => setActiveAlbum(album)}>
          {album}
        </button>
      ))}
    </div>
  );
};

export default VideoGalleryFilter;
