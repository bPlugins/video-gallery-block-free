import { useRef, useEffect, useState } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  SkipBack,
  SkipForward,
} from "lucide-react";
// import "./VideoPlayer.scss";

const VideoPlayer = ({
  video,
  poster,
  title,
  subtitle,
  isPlaying,
  onPlay,
  onPause,
  index,
  setActiveIndex = () => {},
  className = "",
  autoPlay = false,
  loop = true,
  muted = true,
  showControls = true,
  showInfo = true,
  playIcon = null,
  onVideoEnd = () => {},
  onTimeUpdate = () => {},
  objectFit = "cover",
  showSkip = false,
  skipSeconds = 10,
  onNext = null,
  onPrevious = null,
  hasNext = false,
  hasPrevious = false,
  showVolumeSlider = false,
  showTimeDisplay = false,
  autoHideControls = false,
  autoHideDelay = 3000,
  onViewTracked = null,
  viewTrackingThreshold = 3,
  showPlaylistNavigation = true,
  videoRef: externalVideoRef = null,
}) => {
  const internalVideoRef = useRef(null);
  const videoRef = externalVideoRef || internalVideoRef;
  const controlsTimeoutRef = useRef(null);
  const viewTrackedRef = useRef(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(muted);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showControlsState, setShowControlsState] = useState(true);
  const [instanceId, setInstanceId] = useState("");

  useEffect(() => {
    setInstanceId(Math.random().toString(36).substr(2, 9));
  }, []);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    if (isPlaying || autoPlay) {
      videoEl.muted = isMuted;
      videoEl.play().catch((err) => {
        return err;
      });
    } else {
      videoEl.pause();
    }
  }, [isPlaying, isMuted, autoPlay]);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const updateProgress = () => {
      if (videoEl.duration) {
        const currentProgress = (videoEl.currentTime / videoEl.duration) * 100;
        setProgress(currentProgress);
        setCurrentTime(videoEl.currentTime);
        onTimeUpdate(videoEl.currentTime, videoEl.duration);

        // View tracking
        if (
          onViewTracked &&
          !viewTrackedRef.current &&
          videoEl.currentTime >= viewTrackingThreshold
        ) {
          viewTrackedRef.current = true;
          onViewTracked(video, index);
        }
      }
    };

    const updateDuration = () => {
      setDuration(videoEl.duration);
    };

    const handleEnded = () => {
      onPause();
      onVideoEnd();
    };

    videoEl.addEventListener("timeupdate", updateProgress);
    videoEl.addEventListener("loadedmetadata", updateDuration);
    videoEl.addEventListener("ended", handleEnded);

    return () => {
      videoEl.removeEventListener("timeupdate", updateProgress);
      videoEl.removeEventListener("loadedmetadata", updateDuration);
      videoEl.removeEventListener("ended", handleEnded);
    };
  }, [
    onPause,
    onVideoEnd,
    onTimeUpdate,
    onViewTracked,
    viewTrackingThreshold,
    video,
    index,
  ]);

  // Auto-hide controls
  useEffect(() => {
    if (!autoHideControls || !isPlaying) {
      setShowControlsState(true);
      return;
    }

    const resetTimeout = () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      setShowControlsState(true);
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControlsState(false);
      }, autoHideDelay);
    };

    resetTimeout();

    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying, autoHideControls, autoHideDelay]);

  const handleMouseMove = () => {
    if (autoHideControls && isPlaying) {
      setShowControlsState(true);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControlsState(false);
      }, autoHideDelay);
    }
  };

  const handleClick = (e) => {
    e.stopPropagation();
    if (isPlaying) {
      onPause();
    } else {
      onPlay();
      setIsMuted(false);
    }
    setActiveIndex(index);
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    setIsMuted((prev) => !prev);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  const handleVolumeChange = (e) => {
    e.stopPropagation();
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      videoRef.current.muted = newVolume === 0;
    }
  };

  const toggleFullscreen = (e) => {
    e.stopPropagation();
    const videoEl = videoRef.current;
    if (!videoEl) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoEl.requestFullscreen().catch((err) => {
        console.log("Error attempting fullscreen:",err);
      });
    }
  };

  const skip = (e, seconds) => {
    e.stopPropagation();
    const videoEl = videoRef.current;
    if (!videoEl) return;
    videoEl.currentTime = Math.max(
      0,
      Math.min(duration, videoEl.currentTime + seconds),
    );
  };

  const handleProgressClick = (e) => {
    e.stopPropagation();
    const videoEl = videoRef.current;
    if (!videoEl || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    videoEl.currentTime = newTime;
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const shouldShowControls =
    showControls && (showControlsState || isHovered || !isPlaying);

  return (
    <div
      className={`common-video-player ${className} ${
        isHovered ? "hovered" : ""
      } ${isPlaying ? "is-playing" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={handleClick}>
      <video
        ref={videoRef}
        id={instanceId ? `${instanceId}-video` : undefined}
        className="video-element"
        poster={poster}
        muted={isMuted}
        loop={loop}
        playsInline
        preload="metadata"
        style={{ objectFit }}>
        <source src={video} type="video/mp4" />
      </video>

      <div className="video-gradient" />

      <div className={`overlay ${isHovered || !isPlaying ? "visible" : ""}`}>
        <div className="overlay-center">
          <div className="play-button">
            {playIcon ? (
              <div dangerouslySetInnerHTML={{ __html: playIcon }} />
            ) : isPlaying ? (
              <Pause className="icon" />
            ) : (
              <Play className="icon play-offset" />
            )}
          </div>
        </div>
      </div>

      {showInfo && (
        <div className={`info ${isPlaying ? "hidden" : "visible"}`}>
          {title && <h3 className="title">{title}</h3>}
          {subtitle && <p className="subtitle">{subtitle}</p>}

        </div>
      )}

      {shouldShowControls && (
        <div
          className="video-controls-overlay"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
          }}>
          <div className="controls" style={{ pointerEvents: "auto" }}>
            {/* Playlist Navigation - Previous */}
            {showPlaylistNavigation && onPrevious && hasPrevious && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPrevious();
                }}
                className="control-button"
                title="Previous video">
                <SkipBack className="icon-small" />
              </button>
            )}

            {/* Skip Backward */}
            {showSkip && (
              <button
                onClick={(e) => skip(e, -skipSeconds)}
                className="control-button"
                title={`Skip ${skipSeconds}s backward`}>
                <SkipBack className="icon-small" />
              </button>
            )}

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="control-button"
              title="Fullscreen">
              <Maximize className="icon-small" />
            </button>

            {/* Volume Control */}
            <div className="volume-control">
              <button
                onClick={toggleMute}
                className="control-button"
                title={isMuted ? "Unmute" : "Mute"}>
                {isMuted || volume === 0 ? (
                  <VolumeX className="icon-small" />
                ) : (
                  <Volume2 className="icon-small" />
                )}
              </button>
              {showVolumeSlider && (
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="volume-slider"
                  onClick={(e) => e.stopPropagation()}
                />
              )}
            </div>

            {/* Time Display */}
            {showTimeDisplay && (
              <span className="time-display">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            )}

            {/* Skip Forward */}
            {showSkip && (
              <button
                onClick={(e) => skip(e, skipSeconds)}
                className="control-button"
                title={`Skip ${skipSeconds}s forward`}>
                <SkipForward className="icon-small" />
              </button>
            )}

            {/* Playlist Navigation - Next */}
            {showPlaylistNavigation && onNext && hasNext && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNext();
                }}
                className="control-button"
                title="Next video">
                <SkipForward className="icon-small" />
              </button>
            )}
          </div>

          <div
            className="progress-container"
            onClick={handleProgressClick}
            style={{ pointerEvents: "auto" }}>
            <div className="progress-bg" />
            <div className="progress-bar" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;