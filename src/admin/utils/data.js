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
import blocks from "./blocks";

const slug = "video-gallery-block";

export const dashboardInfo = (info) => {
  const {
    version,
    isPremium,
    hasPro,
    licenseActiveNonce,
    vgbDisabledBlocks,
    disabledBlocksNonce,
    adminUrl,
    uninstallNonce,
    deleteDataOnUninstall,
  } = info;

  const proSuffix = isPremium ? " Pro" : "";

  return {
    name: `Video Gallery Block${proSuffix}`,
    displayName: `Video Gallery Block${proSuffix} - Display your videos as a gallery in a professional way`,
    description:
      "A lightweight Gutenberg block plugin for WordPress that lets you easily create responsive video galleries with albums, filters, captions, and lightbox support. Showcase YouTube, Vimeo, Wistia, or self hosted videos in a lightbox grid layout directly in the block editor.",
    slug,
    version,
    isPremium,
    hasPro,
    licenseActiveNonce,
    uninstallNonce,
    deleteDataOnUninstall,
    disabledBlocks: vgbDisabledBlocks,
    disabledBlocksNonce,
    adminUrl,
    allBlocks: blocks,
    displayOurPlugins: true,
    media: {
      logo: `https://ps.w.org/${slug}/assets/icon-128x128.png`,
      banner: `https://ps.w.org/${slug}/assets/banner-772x250.png`,
      thumbnail: `https://bplugins.com/wp-content/uploads/2026/01/video-gallery-block.png`,
      //   thumbnail: `https://bplugins.com/wp-content/themes/b-technologies/assets/images/products/${slug}.png`,
      // proThumbnail: `https://bplugins.com/wp-content/uploads/2026/01/3d-image-gallery.png`,
      //   video: "https://www.youtube.com/watch?v=milYZrqLJsE",
      //   isYoutube: true,
    },
    pages: {
      org: `https://wordpress.org/plugins/${slug}/`,
      landing: `https://bplugins.com/products/${slug}/`,
      //   docs: `https://bplugins.com/docs/${slug}/`,
      pricing: `https://bplugins.com/products/${slug}/pricing`,
    },
    freemius: {
      product_id: 20637,
      plan_id: 34353,
      public_key: "pk_02d017aab6844d54db3238a59e91c",
    },
    changelogs: [
      {
        version: "1.1.1 - 12 Aug 2025",
        list: [
          "Fixed minor issues.",
          "Added 8 new block styles.",
          "Add: Updated New Dashboard",
        ],
        type: "update",
      },
      {
        version: "1.1.0 - 30 Jan 2025",
        list: ["Updated Fancybox library to v5."],
        type: "update",
      },
      {
        version: "1.0.8 - 27 Nov 2024",
        list: ["Added option to hide the 'All' album filter."],
        type: "new",
      },
      {
        version: "1.0.7 - 27 Nov 2024",
        list: ["Added custom label option for common filter."],
        type: "new",
      },
      {
        version: "1.0.6",
        list: ["Added gallery shadow options."],
        type: "new",
      },
    ],
    proFeatures: [
      "8 premium blocks including Slider, Carousel, Playlist, and Masonry.",
      "Masonry and mixed-ratio layouts.",
      "Sliders and carousels with autoplay.",
      "Playlist gallery with navigation.",
      "Parallax background video sections.",
      "Advanced typography and overlays.",
      "Custom navigation and player controls.",
      "WooCommerce product carousel.",
      "Priority support.",
    ],
    startButton: {
      label: "Start Now",
      url: `wp-admin/post-new.php?post_type=video-gallery-block`,
      // url: `wp-admin/post-new.php?post_type=page&title=Video Gallery Block&content=<!-- wp:vgb/video-gallery /-->&nonce=${nonce}`,
    },
  };
};

export const demoInfo = {
  allInOneLabel: "See All Demos",
  allInOneLink: "https://bblockswp.com/demo/video-gallery-block-all-demos/",
  demos: [
    {
      icon: videoGalleryIcon,
      title: "Video Gallery Block Default",
      type: "iframe",
      url: "https://bblockswp.com/demo/video-gallery-block-default/",
    },
    {
      icon: testimonialIcon,
      title: "Video Testimonial Section",
      type: "iframe",
      url: "https://bblockswp.com/demo/video-gallery-block-video-testimonial-section/",
    },
    {
      icon: parallaxRowIcon,
      title: "Parallax Row Video Gallery",
      type: "iframe",
      url: "https://bblockswp.com/demo/video-gallery-block-parallax-row-video-gallery/",
    },
    {
      icon: videoSliderIcon,
      title: "Video Slider",
      type: "iframe",
      url: "https://bblockswp.com/demo/video-gallery-block-video-slider/",
    },
    {
      icon: sliderAutoplayIcon,
      title: "Slider Autoplay Video",
      type: "iframe",
      url: "https://bblockswp.com/demo/video-gallery-block-slider-autoplay-video/",
    },
    {
      icon: lightBoxIcon,
      title: "Lightbox Gallery",
      type: "iframe",
      url: "https://bblockswp.com/demo/video-gallery-block-lightbox-video-gallery/",
    },
    {
      icon: masonryVideoGridIcon,
      title: "Masonry Video Grid",
      type: "iframe",
      url: "https://bblockswp.com/demo/video-gallery-block-masonry-video-grid/",
    },
    {
      icon: videoPlaylistIcon,
      title: "Video Playlist Gallery",
      type: "iframe",
      url: "https://bblockswp.com/demo/video-gallery-block-video-playlist-gallery/",
    },
    {
      icon: videoCarouselIcon,
      title: "Video Carousel Gallery",
      type: "iframe",
      url: "https://bblockswp.com/demo/video-gallery-block-video-carousel-gallery/",
    },
  ],
};

export const pricingInfo = {
  logo: `https://ps.w.org/${slug}/assets/icon-128x128.png`, // Optional
  pluginId: 20637,
  planId: 34353,
  licenses: [1, 3, null],
  button: {
    label: "Buy Now ➜",
  },
  featured: {
    selected: 3, // choose from licenses item
  },
};
