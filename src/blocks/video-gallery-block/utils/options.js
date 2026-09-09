import { __ } from '@wordpress/i18n';

export const generalStyleTabs = [
	{ name: 'general', title: __('General', 'video-gallery-block') },
	{ name: 'style', title: __('Style', 'video-gallery-block') }
];

export const videoSizeOptions = [
  { value: "contain", label: "Contain" },
  { value: "cover", label: "Cover" },
  { value: "fill", label: "Fill" },
  { value: "none", label: "None" },
];
/**
 * Thumbnail shapes.
 *
 * "" keeps the older fixed-height behaviour, which is what every gallery
 * published before this option existed was laid out with -- picking a default
 * ratio here would have re-cropped all of them.
 */
export const aspectRatioOptions = [
  { value: "", label: __("Fixed", "video-gallery-block") },
  { value: "16/9", label: "16:9" },
  { value: "4/3", label: "4:3" },
  { value: "1/1", label: "1:1" },
  { value: "9/16", label: "9:16" },
];

/** Whether YouTube Shorts are included, excluded, or the only videos shown. */
export const shortsFilterOptions = [
  { value: "all", label: __("All Videos", "video-gallery-block") },
  { value: "hide", label: __("Hide Shorts", "video-gallery-block") },
  { value: "only", label: __("Only Shorts", "video-gallery-block") },
];

/**
 * Which order the gallery's videos appear in. "Manual" is the order they
 * were dragged/added into in the editor -- unchanged from before this option
 * existed, so no gallery reorders itself on upgrade.
 */
export const sortOrderOptions = [
  { value: "manual", label: __("Manual", "video-gallery-block") },
  { value: "newest", label: __("Newest First", "video-gallery-block") },
  { value: "oldest", label: __("Oldest First", "video-gallery-block") },
];

/**
 * Where an incomplete last row of tiles sits horizontally -- only visible
 * when the video count doesn't divide evenly into the column count.
 */
export const rowAlignOptions = [
  { value: "start", label: __("Left", "video-gallery-block") },
  { value: "center", label: __("Center", "video-gallery-block") },
  { value: "end", label: __("Right", "video-gallery-block") },
];
