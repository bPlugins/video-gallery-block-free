import {
  videoGalleryIcon,
  lightBoxIcon,
  masonryVideoGridIcon,
  parallaxRowIcon,
  sliderAutoplayIcon,
  videoCarouselIcon,
  videoPlaylistIcon,
  videoSliderIcon,
  testimonialIcon,
} from "../../Components/Common/utils/icons";

const siteURL = "https://bblockswp.com";
const demoLink = `${siteURL}/demo`;

export default [
  {
    name: "vgb/video-gallery",
    title: "Video Gallery",
    icon: videoGalleryIcon,
    demo: `${demoLink}/video-gallery-block-default/`,
    status: "published",
    required: true,
  },
  {
    name: "vgblk/lightbox-video-gallery",
    title: "Lightbox Video Gallery",
    icon: lightBoxIcon,
    demo: `${demoLink}/video-gallery-block-lightbox-video-gallery/`,
    status: "published",
    isPremium: true,
  },
  {
    name: "vgblk/masonry-video-grid-one",
    title: "Masonry Video Grid",
    icon: masonryVideoGridIcon,
    demo: `${demoLink}/video-gallery-block-masonry-video-grid/`,
    status: "published",
    isPremium: true,
  },
  {
    name: "vgblk/parallax-row-video-gallery",
    title: "Parallax Row Video Gallery",
    icon: parallaxRowIcon,
    demo: `${demoLink}/video-gallery-block-parallax-row-video-gallery/`,
    status: "published",
    isPremium: true,
  },
  {
    name: "vgblk/slider-autoplay-video",
    title: "Slider Autoplay Video",
    icon: sliderAutoplayIcon,
    demo: `${demoLink}/video-gallery-block-slider-autoplay-video/`,
    status: "published",
    isPremium: true,
  },
  {
    name: "vgblk/video-carousel-gallery",
    title: "Video Carousel Gallery",
    icon: videoCarouselIcon,
    demo: `${demoLink}/video-gallery-block-video-carousel-gallery/`,
    status: "published",
    isPremium: true,
  },
  {
    name: "vgblk/video-playlist-gallery",
    title: "Video Playlist Gallery",
    icon: videoPlaylistIcon,
    demo: `${demoLink}/video-gallery-block-video-playlist-gallery/`,
    status: "published",
    isPremium: true,
  },
  {
    name: "vgblk/video-slider",
    title: "Video Slider",
    icon: videoSliderIcon,
    demo: `${demoLink}/video-gallery-block-video-slider/`,
    status: "published",
    isPremium: true,
  },
  {
    name: "vgblk/video-testimonial-section",
    title: "Video Testimonial Section",
    icon: testimonialIcon,
    demo: `${demoLink}/video-gallery-block-video-testimonial-section/`,
    status: "published",
    isPremium: true,
  },
];
