import { useState } from "react";
import { withSelect } from "@wordpress/data";
import { useBlockProps } from "@wordpress/block-editor";

import Settings from "./Settings/Settings";
import VideoGallery from "../Common/VideoGallery";
import { prefix } from "../../utils/data";
import FrontShortCode from "./FrontShortCode/FrontShortCode";

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
  const blockProps = useBlockProps({
    id: id,
  });

  const isGalleryPostType = ["video-gallery-block", "free", "pro"].includes(
    currentPostType,
  );

  return (
    <>
      <Settings
        attributes={attributes}
        setAttributes={setAttributes}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        clientId={clientId}
        currentPostId={currentPostId}
        currentPostType={currentPostType}
      />

      <div {...blockProps} id={id}>
        {isGalleryPostType && (
          <FrontShortCode
            postType={currentPostType}
            shortCode={`[video_gallery id=${currentPostId}]`}
          />
        )}

        <VideoGallery
          attributes={attributes}
          id={id}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
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
