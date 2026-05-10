import { createRoot } from "react-dom/client";
import "./style.scss";
import VideoGallery from "./Components/Common/VideoGallery";

document.addEventListener("DOMContentLoaded", () => {
  const galleryEls = document.querySelectorAll(".wp-block-vgb-video-gallery-block");
  galleryEls.forEach((galleryEl) => {
    const attributes = JSON.parse(galleryEl.dataset.attributes);

    createRoot(galleryEl).render(
      <VideoGallery attributes={attributes} id={galleryEl.id} />
    );

    galleryEl?.removeAttribute("data-attributes");
  });
});
