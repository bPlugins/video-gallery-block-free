import { useEffect, useState } from "react";
import { withSelect } from "@wordpress/data";
import { useBlockProps } from "@wordpress/block-editor";
import { Spinner } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

import Settings from "./Settings/Settings";
import VideoGallery from "../Common/VideoGallery";
import { prefix } from "../../utils/data";
import FrontShortCode from "./FrontShortCode/FrontShortCode";
import FeedPlaceholder from "./FeedPlaceholder";
import TileTools, { DropOverlay } from "./TileTools";
import useCanvasVideoDnd from "./useCanvasVideoDnd";
import { moveItem } from "../../utils/editorItems";
import {
  isVimeoFeedUrl,
  useYoutubeFeed,
  useYoutubeKey,
} from "../../utils/youtubeFeed";

const noop = () => {};

const Edit = (props) => {
  const {
    attributes,
    setAttributes,
    clientId,
    currentPostId,
    currentPostType,
  } = props;

  const [activeIndex, setActiveIndex] = useState(0);
  const id = `${prefix}-${clientId}`;

  const isGalleryPostType = ["video-gallery-block"].includes(
    currentPostType,
  );

  /*
   * YouTube / Vimeo channel or playlist feed. Its videos are previewed from
   * the server, never written into the `videos` attribute: the owner's own
   * list stays intact underneath, and the page always shows the feed as it is
   * now rather than as it was when the post was last saved.
   */
  const feed = attributes.feed || {};
  const isFeed = !!feed.enabled;
  const keyState = useYoutubeKey(isFeed);
  // Vimeo needs no key; only a YouTube link waits for one.
  const canLoadFeed = !!keyState.connected || isVimeoFeedUrl(feed.url);
  const feedState = useYoutubeFeed({
    enabled: isFeed && canLoadFeed,
    url: feed.url,
    refresh: feed.refresh || 6,
    shorts: attributes.options?.shortsFilter,
  });
  // "Number of videos" is applied here, so changing it is instant.
  const feedVideos = feedState.data?.videos?.slice(0, feed.count || 12);
  // A newer list is on its way while the current one is still shown.
  const feedUpdating = isFeed && "loading" === feedState.status && !!feedVideos;
  const showFeedPlaceholder =
    isFeed && (!canLoadFeed || !feed.url || !feedVideos?.length);
  const galleryAttributes =
    isFeed && feedVideos
      ? { ...attributes, videos: feedVideos, albums: [] }
      : attributes;

  /*
   * The video being edited, kept inside the gallery's own list.
   *
   * Clicking a tile selects it for editing. In feed mode the tiles are the
   * feed's videos, so clicking the 6th of a channel set the index to 5 -- and
   * switching back to "My videos", with its one video, made the item settings
   * read a video that does not exist and crashed the block. Feed tiles are not
   * editable, so in feed mode a click selects nothing, and the index is
   * clamped here on every render (an effect alone would run one render too
   * late) as well as stored back.
   */
  const ownCount = Array.isArray(attributes.videos) ? attributes.videos.length : 0;
  const safeActiveIndex = Math.max(0, Math.min(activeIndex, ownCount - 1));
  useEffect(() => {
    if (safeActiveIndex !== activeIndex) setActiveIndex(safeActiveIndex);
  }, [safeActiveIndex, activeIndex]);

  /*
   * Organizing on the canvas: drop video files on the gallery to add them,
   * drag a tile (or use its Move buttons) to put it somewhere else. Only for
   * the gallery's own videos, and moving only while the order on screen is
   * the order of the list ("Manual" sort).
   */
  const sortOrder = attributes.options?.sortOrder;
  const canMove =
    !isFeed && ownCount > 1 && "newest" !== sortOrder && "oldest" !== sortOrder;
  const dnd = useCanvasVideoDnd({
    canDrop: !isFeed,
    canMove,
    videos: attributes.videos,
    setAttributes,
    activeIndex: safeActiveIndex,
    setActiveIndex,
  });
  const showDropOverlay = dnd.dragging || !!dnd.upload;
  const blockProps = useBlockProps({
    id,
    ref: dnd.ref,
    ...(showDropOverlay ? { className: "vgbHasDropOverlay" } : {}),
  });
  const onMove = (from, to) => {
    const moved = moveItem(attributes.videos, from, to, safeActiveIndex);
    if (moved) {
      setAttributes({ videos: moved.videos });
      setActiveIndex(moved.active);
    }
  };
  const renderTileTools = canMove
    ? (index, prev, next) => (
        <TileTools index={index} prev={prev} next={next} canMove onMove={onMove} />
      )
    : undefined;

  return (
    <>
      <Settings
        attributes={attributes}
        setAttributes={setAttributes}
        activeIndex={safeActiveIndex}
        setActiveIndex={setActiveIndex}
        clientId={clientId}
        currentPostId={currentPostId}
        currentPostType={currentPostType}
        keyState={keyState}
        feedState={feedState}
        feedVideos={isFeed ? feedVideos : undefined}
        onMove={onMove}
        canMove={canMove}
      />

      <div {...blockProps} id={id}>
        <DropOverlay dragging={dnd.dragging} upload={dnd.upload} />
        {isGalleryPostType && (
          <FrontShortCode
            postType={currentPostType}
            shortCode={`[video_gallery id=${currentPostId}]`}
          />
        )}

        {showFeedPlaceholder ? (
          <FeedPlaceholder
            attributes={attributes}
            setAttributes={setAttributes}
            keyState={keyState}
            feedState={feedState}
          />
        ) : (
          isFeed ? (
            <div
              className={`vgbFeedPreview ${feedUpdating ? "isUpdating" : ""}`}
              aria-busy={feedUpdating || undefined}>
              <VideoGallery
                attributes={galleryAttributes}
                id={id}
                activeIndex={-1}
                setActiveIndex={noop}
                previewOnClick
              />
              {feedUpdating && (
                <div className="vgbFeedPreview__overlay" role="status">
                  <span className="vgbFeedPreview__badge">
                    <Spinner />
                    {__("Updating videos…", "video-gallery-block")}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <VideoGallery
              attributes={galleryAttributes}
              id={id}
              activeIndex={safeActiveIndex}
              setActiveIndex={setActiveIndex}
              renderTileTools={renderTileTools}
            />
          )
        )}
      </div>
    </>
  );
};
export default withSelect((select) => {
  const { getCurrentPostId, getCurrentPostType } = select("core/editor");
  return {
    currentPostId:
      getCurrentPostId() || select("core").getEditedPostAttribute("id"),
    currentPostType:
      getCurrentPostType() || select("core").getEditedPostAttribute("type"),
  };
})(Edit);
