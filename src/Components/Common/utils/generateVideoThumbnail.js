export const generateVideoThumbnail = async (videoUrl, seekTime = 3) => {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");

    // IMPORTANT: append to DOM
    video.style.position = "fixed";
    video.style.left = "-9999px";
    document.body.appendChild(video);

    video.crossOrigin = "anonymous";
    video.preload = "auto";
    video.muted = true;
    video.playsInline = true;

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    const cleanup = () => {
      video.remove();
      canvas.remove();
    };

    video.addEventListener("loadedmetadata", () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const targetTime = Math.min(seekTime, video.duration || seekTime);
      video.currentTime = targetTime;
    });

    video.addEventListener(
      "seeked",
      () => {
        try {
          context.drawImage(video, 0, 0);

          const thumbnail = canvas.toDataURL("image/jpeg", 0.8);

          cleanup();
          resolve(thumbnail);
        } catch (error) {
          cleanup();
          reject(error);
        }
      },
      { once: true },
    );

    video.addEventListener("error", () => {
      cleanup();
      reject(new Error("Video load failed (likely CORS blocked)"));
    });

    video.src = videoUrl;
    video.load();
  });
};

export const isExternalVideoUrl = (url) => {
  if (!url) return false;
  const lowerUrl = url.toLowerCase();
  return (
    lowerUrl.includes("youtube.com") ||
    lowerUrl.includes("youtu.be") ||
    lowerUrl.includes("vimeo.com") ||
    lowerUrl.includes("dailymotion.com") ||
    lowerUrl.includes("wistia.com")
  );
};
