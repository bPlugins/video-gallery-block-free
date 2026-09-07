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
  { value: "", label: "Fixed height" },
  { value: "16/9", label: "16:9" },
  { value: "4/3", label: "4:3" },
  { value: "1/1", label: "1:1" },
  { value: "9/16", label: "9:16" },
];
