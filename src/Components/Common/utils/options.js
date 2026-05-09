import { __ } from "@wordpress/i18n";

export const generalStyleTabs = [
  { name: "general", title: __("General", "video-gallery") },
  { name: "style", title: __("Style", "video-gallery") },
];

export const purposeTypeOptions = [
  { label: "Test", value: "test" },
  { label: "Final", value: "final" },
];

export const videoSizeOptions = [
  { value: "contain", label: "Contain" },
  { value: "cover", label: "Cover" },
  { value: "fill", label: "Fill" },
  { value: "none", label: "None" },
];

// Masonry Video Grid
export const videoHeightOptions = [
  { value: "tall", label: "Tall" },
  { value: "medium", label: "Medium" },
  { value: "short", label: "Short" },
];

export const videoHeightOptions2 = [
  { value: "tall", label: "Tall" },
  { value: "medium", label: "Medium" },
  { value: "short", label: "Short" },
  { value: "custom", label: "Custom" },
];

// Parallax Row Video Gallery
export const controlsDirection = [
  { value: "row", label: "Row" },
  { value: "row-reverse", label: "Row Reverse" },
  { value: "column", label: "Column" },
  { value: "column-reverse", label: "Column Reverse" },
];

export const galleryOriantation = [
  { value: "horizontal", label: "Horizontal" },
  { value: "vertical", label: "Vertical" },
];
