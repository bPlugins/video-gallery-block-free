import React from "react";
import "./VideoLightbox.scss";

const VideoLightbox = ({ videoSrc, onClose }) => {
  if (!videoSrc) return null;

  return (
    <div className="common-video-lightbox-overlay" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <div className="lightbox-container">
          <button className="lightbox-close" onClick={onClose}>
            ×
          </button>
          <video
            src={videoSrc}
            controls
            autoPlay
            className="lightbox-video"
            playsInline
          />
        </div>
      </div>
    </div>
  );
};

export default VideoLightbox;
