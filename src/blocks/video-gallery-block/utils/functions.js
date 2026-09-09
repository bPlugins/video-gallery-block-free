export const controlsHandler = (controls) => {
  const newControls = [];
  Object.keys(controls).map((item) => {
    if (controls[item]) {
      newControls.push(item);
    }
  });
  return newControls;
};

/**
 * The Plyr options used for every lightbox video, in the editor and on the
 * front end. Kept in one place so the two call sites cannot drift apart.
 */
export const plyrOptions = {
  controls: controlsHandler({
    "play-large": true,
    restart: false,
    rewind: true,
    play: true,
    "fast-forward": true,
    progress: true,
    "current-time": true,
    duration: false,
    mute: true,
    volume: true,
    pip: false,
    airplay: false,
    settings: true,
    download: false,
    fullscreen: true,
  }),
  clickToPlay: false,
  loop: { active: false },
  muted: false,
  autoplay: false,
  resetOnEnd: false,
  hideControls: true,
};

/**
 * Pull the 11-character video id out of any shape of YouTube URL.
 *
 * The list matters: `shorts/` and `live/` are how a lot of YouTube links look
 * now, and the old single-regex version matched neither, so those videos came
 * through with no thumbnail at all.
 */
export const getYoutubeId = (url) => {
  if (!url || typeof url !== "string") return false;

  const patterns = [
    /youtu\.be\/([\w-]{11})/,
    /youtube\.com\/watch\?(?:.*&)?v=([\w-]{11})/,
    /youtube\.com\/(?:embed|v|shorts|live)\/([\w-]{11})/,
    /youtube\.com\/u\/\w+\/([\w-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return false;
};

/**
 * Whether a URL is a YouTube Shorts link. Kept in step with
 * `vidgalblk_is_youtube_short()` in the PHP.
 */
export const isYoutubeShort = (url) =>
  typeof url === "string" && /youtube\.com\/shorts\//.test(url);

/**
 * Thumbnails YouTube can be asked for, best first.
 *
 * `maxresdefault.jpg` does not exist for every video -- anything uploaded at a
 * lower resolution 404s -- and a 404 here is a visibly broken image in the
 * grid. So it is the first guess, not the only one, and the <img> steps down
 * this list on error.
 */
export const getYoutubeThumbnails = (url) => {
  const id = getYoutubeId(url);
  if (!id) return [];

  return [
    `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
    `https://img.youtube.com/vi/${id}/sddefault.jpg`,
    `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
  ];
};

export const getYoutubeThumbnail = (url) => getYoutubeThumbnails(url)[0] || false;

export const getVimeoId = (url) => {
  if (!url || typeof url !== "string") return false;
  const match = url.match(/vimeo\.com\/(?:video\/|channels\/[\w-]+\/|groups\/[\w-]+\/videos\/)?(\d{6,})/);
  return match ? match[1] : false;
};

/**
 * Whether a URL is a Facebook video link. Kept in step with
 * `vidgalblk_is_facebook_video()` in the PHP.
 */
export const isFacebookVideo = (url) =>
  typeof url === "string" &&
  /(?:facebook\.com\/.+\/videos\/|facebook\.com\/watch\/?\?|fb\.watch\/)/.test(url);

/**
 * Facebook's public video-embed iframe URL for a Facebook video link.
 *
 * Kept in step with `vidgalblk_facebook_embed_url()` in the PHP -- see the
 * comment there for why this is the one part of Facebook video support that
 * needs no API key, unlike fetching a Facebook video's title or thumbnail.
 */
export const facebookEmbedUrl = (url) =>
  `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false`;

/**
 * Stable, machine-readable provider id for a video URL: "youtube", "vimeo",
 * "facebook", or "other". Used for the GA4 `video_provider` event param --
 * unlike a user-facing provider name, this must stay in English and unchanged
 * across locales, or the same provider would fragment into different values
 * in Analytics depending on site language.
 */
export const videoProviderId = (url) => {
  if (getYoutubeId(url)) return "youtube";
  if (getVimeoId(url)) return "vimeo";
  if (isFacebookVideo(url)) return "facebook";
  return "other";
};

/**
 * A CSS-safe class for an album.
 *
 * Derived from the album's position in the `albums` array rather than from its
 * name. The name cannot be used: slugifying it dropped every non-Latin
 * character, so a Bengali, Cyrillic or CJK album name produced an empty class
 * and a `.` selector, and a name starting with a digit produced an invalid one.
 * Both broke filtering outright. Two albums whose names slugified the same
 * ("Music Videos" and "music-videos") also collided.
 *
 * @param {Array}  albums The block's album list.
 * @param {string} album  The album to get a class for.
 * @return {string} Class name, or '' if the album is not in the list.
 */
export const albumClass = (albums, album) => {
  const index = Array.isArray(albums) ? albums.indexOf(album) : -1;
  return index < 0 ? "" : `vgbAlb${index}`;
};

/** Classes for every album a video belongs to. */
export const albumClasses = (albums, albs) =>
  (Array.isArray(albs) ? albs : [])
    .map((alb) => albumClass(albums, alb))
    .filter(Boolean)
    .join(" ");

/**
 * Plain text for an `alt` attribute, from a caption that may contain markup.
 */
export const captionText = (caption) => {
  if (!caption || typeof caption !== "string") return "";
  return caption
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();
};

export const camelCase = (str) => {
  if (typeof str !== "string") return "";
  return str
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .toLowerCase()
    .replace(/\s+(.)/g, (match, group) => group.toUpperCase());
};
