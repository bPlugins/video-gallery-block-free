export const controlsHandler = (controls) => {
  const newControls = [];
  Object.keys(controls).map((item) => {
    if (controls[item]) {
      newControls.push(item);
    }
  });
  return newControls;
};

export const getYoutubeId = (url) => {
  if (!url) return false;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : false;
};

export const getYoutubeThumbnail = (url) => {
  const id = getYoutubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : false;
};

export const getYoutubeTitle = async (url) => {
  if (!url) return false;
  try {
    const response = await fetch(`https://noembed.com/embed?url=${url}`);
    const data = await response.json();
    return data.title || false;
  } catch (error) {
    console.error("Error fetching YouTube title:", error);
    return false;
  }
};
