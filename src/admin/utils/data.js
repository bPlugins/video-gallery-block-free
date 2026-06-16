import { __ } from "@wordpress/i18n";
import blocks from "./blocks";

const slug = "video-gallery-block";

export const dashboardInfo = (info) => {
  const {
    version,
    licenseActiveNonce,
    adminUrl,
    uninstallNonce,
    deleteDataOnUninstall,
  } = info;

  return {
    name: `Video Gallery Block`,
    displayName: `Video Gallery Block - Display your videos as a gallery in a professional way`,
    description:
      "A lightweight Gutenberg block plugin for WordPress that lets you easily create responsive video galleries with albums, filters, captions, and lightbox support. Showcase YouTube, Vimeo, Wistia, or self hosted videos in a lightbox grid layout directly in the block editor.",
    slug,
    version,
    licenseActiveNonce,
    uninstallNonce,
    deleteDataOnUninstall,
    adminUrl,
    allBlocks: blocks,
    displayOurPlugins: true,
    media: {
      logo: `https://ps.w.org/${slug}/assets/icon-128x128.png`,
      banner: `https://ps.w.org/${slug}/assets/banner-772x250.png`,
      thumbnail: `https://bplugins.com/wp-content/uploads/2026/01/video-gallery-block.png`,
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
    startButton: {
      label: "Start Now",
      url: `wp-admin/post-new.php?post_type=video-gallery-block`,
      // url: `wp-admin/post-new.php?post_type=page&title=Video Gallery Block&content=<!-- wp:vgb/video-gallery /-->&nonce=${nonce}`,
    },
  };
};

export const welcomeInfo = (adminUrl = "") => ({
  // Hero card keyword chips
  keywords: [
    __("Gallery", "video-gallery-block"),
    __("Albums", "video-gallery-block"),
    __("Filters", "video-gallery-block"),
    __("Lightbox", "video-gallery-block"),
    __("Captions", "video-gallery-block"),
  ],
  keywordsLabel: __("Features", "video-gallery-block"),

  // Getting Started tabbed steps
  gettingStarted: {
    tabs: [
      {
        key: "gutenberg",
        label: __("Gutenberg", "video-gallery-block"),
        steps: [
          {
            num: 1,
            title: __("Add the Block", "video-gallery-block"),
            body: __("Open the block editor. Click <strong>+</strong> or type <strong>/Video Gallery</strong>.", "video-gallery-block"),
            link: { url: `${adminUrl}post-new.php`, label: __("Open Editor", "video-gallery-block") },
          },
          {
            num: 2,
            title: __("Add Your Videos", "video-gallery-block"),
            body: __("Add <strong>YouTube</strong>, <strong>Vimeo</strong>, <strong>Wistia</strong>, or self-hosted videos.", "video-gallery-block"),
          },
          {
            num: 3,
            title: __("Organize & Filter", "video-gallery-block"),
            body: __("Group videos into <strong>albums</strong> and enable filters for visitors.", "video-gallery-block"),
          },
          {
            num: 4,
            title: __("Style & Publish", "video-gallery-block"),
            body: __("Adjust columns, captions, and lightbox, then publish.", "video-gallery-block"),
          },
        ],
      },
      {
        key: "shortcode",
        label: __("Shortcode", "video-gallery-block"),
        steps: [
          {
            num: 1,
            title: __("Create a Gallery", "video-gallery-block"),
            body: __("Go to <strong>Video Gallery</strong> in your admin menu and click <strong>Add New</strong>.", "video-gallery-block"),
            link: {
              url: `${adminUrl}post-new.php?post_type=video-gallery-block`,
              label: __("Add New Gallery", "video-gallery-block"),
            },
          },
          {
            num: 2,
            title: __("Customize & Publish", "video-gallery-block"),
            body: __("Add your videos and customize gallery settings, then click <strong>Publish</strong>.", "video-gallery-block"),
          },
          {
            num: 3,
            title: __("Copy the Shortcode", "video-gallery-block"),
            body: __("Go to <strong>Video Gallery -> All Video Gallery</strong> to find and copy your gallery shortcode (e.g. <code>[video_gallery id=\"123\"]</code>).", "video-gallery-block"),
            link: {
              url: `${adminUrl}edit.php?post_type=video-gallery-block`,
              label: __("All Galleries", "video-gallery-block"),
            },
          },
          {
            num: 4,
            title: __("Paste & Display", "video-gallery-block"),
            body: __("Paste the shortcode into any post, page, widget, or page builder layout where you want the gallery to render.", "video-gallery-block"),
          },
        ],
      },
      {
        key: "elementor",
        label: __("Elementor", "video-gallery-block"),
        steps: [
          {
            num: 1,
            title: __("Create a Gallery", "video-gallery-block"),
            body: __("Go to <strong>Video Gallery -> Add New</strong> to configure and publish a gallery, then copy its shortcode.", "video-gallery-block"),
            link: {
              url: `${adminUrl}post-new.php?post_type=video-gallery-block`,
              label: __("Add New Gallery", "video-gallery-block"),
            },
          },
          {
            num: 2,
            title: __("Edit with Elementor", "video-gallery-block"),
            body: __("Open any post or page in the <strong>Elementor</strong> editor.", "video-gallery-block"),
          },
          {
            num: 3,
            title: __("Add Shortcode Widget", "video-gallery-block"),
            body: __("Search for the <strong>Shortcode</strong> widget in the Elementor elements panel and drag it into your layout.", "video-gallery-block"),
          },
          {
            num: 4,
            title: __("Paste Shortcode", "video-gallery-block"),
            body: __("Paste your gallery shortcode (e.g., <code>[video_gallery id=\"123\"]</code>) into the widget input field and save your changes.", "video-gallery-block"),
          },
        ],
      },
      {
        key: "php",
        label: __("PHP", "video-gallery-block"),
        steps: [
          {
            num: 1,
            title: __("Get Gallery ID", "video-gallery-block"),
            body: __("Go to <strong>Video Gallery -> All Video Gallery</strong> and note the <strong>ID</strong> of the gallery you want to embed.", "video-gallery-block"),
            link: {
              url: `${adminUrl}edit.php?post_type=video-gallery-block`,
              label: __("All Galleries", "video-gallery-block"),
            },
          },
          {
            num: 2,
            title: __("Copy PHP Function", "video-gallery-block"),
            body: __("Copy the WordPress <code>do_shortcode</code> function: <pre><code>&lt;?php echo do_shortcode('[video_gallery id=\"YOUR_ID\"]'); ?&gt;</code></pre>", "video-gallery-block"),
          },
          {
            num: 3,
            title: __("Insert in Template", "video-gallery-block"),
            body: __("Open your theme or template files (e.g., <code>single.php</code>, <code>page.php</code>) in an editor.", "video-gallery-block"),
          },
          {
            num: 4,
            title: __("Replace ID & Save", "video-gallery-block"),
            body: __("Paste the code into your PHP file and replace <code>YOUR_ID</code> with the actual ID of your video gallery.", "video-gallery-block"),
          },
        ],
      },
    ],
  },

  // Changelogs — each list item starts with <strong>Type:</strong> for badges
  changelogs: [
    {
      version: "1.4.0 - 16 Jun 2026",
      type: "new",
      list: [
        __("<strong>New:</strong> Added 24 premium video gallery blocks (Video Shorts Reel, Video Showcase Wall, Video Curriculum Accordion, Video Hotspot Scene, Video Tabs Gallery, Video Scrollytelling Showcase, Video Timeline Gallery, Video Bento Grid, Video Comparison Gallery, Video Justified Gallery, Video Expanding Panels, Video Wall with Floating Player (PiP), Video Swipe Deck, Video Marquee Wall, Video Flip Cards Gallery, Video Map Gallery, Video Stories, Video Podcast Episodes, Video Property Tour Gallery, Video Workout Planner, Video Wedding Story Gallery, Video Menu Showcase, and Video Feature Tour).", "video-gallery-block"),
        __("<strong>Update:</strong> Minor fixes and styling updates.", "video-gallery-block")
      ],
    },
    {
      version: "1.1.3 - 21 May 2026",
      type: "update",
      list: [
        __("<strong>Fix:</strong> Prefixed generic 'admin-post' script handles with plugin-specific prefix.", "video-gallery-block"),
        __("<strong>Fix:</strong> Resolved directory guideline (security) issues.", "video-gallery-block"),
      ],
    },
    {
      version: "1.1.2 - 10 May 2026",
      type: "update",
      list: [
        __("<strong>Update:</strong> Compliance updates and security enhancements for directory guidelines.", "video-gallery-block"),
        __("<strong>Update:</strong> Updated Freemius-Lite SDK.", "video-gallery-block"),
      ],
    },
    {
      version: "1.1.1 - 12 Aug 2025",
      type: "update",
      list: [
        __("<strong>Fix:</strong> Fixed minor issues.", "video-gallery-block"),
        __("<strong>New:</strong> Added 8 new block styles.", "video-gallery-block"),
        __("<strong>Update:</strong> Updated New Dashboard.", "video-gallery-block"),
      ],
    },
    {
      version: "1.1.0 - 30 Jan 2025",
      type: "update",
      list: [__("<strong>Update:</strong> Updated Fancybox library to v5.", "video-gallery-block")],
    },
    {
      version: "1.0.8 - 27 Nov 2024",
      type: "new",
      list: [
        __("<strong>New:</strong> Added option to hide the 'All' album filter.", "video-gallery-block"),
      ],
    },
    {
      version: "1.0.7 - 27 Nov 2024",
      type: "new",
      list: [
        __("<strong>New:</strong> Added custom label option for common filter.", "video-gallery-block"),
      ],
    },
    {
      version: "1.0.6",
      type: "new",
      list: [__("<strong>New:</strong> Added gallery shadow options.", "video-gallery-block")],
    },
  ],
  changelogsLimit: 6,
  changelogsReadMoreLabel: __("View More Changelogs", "video-gallery-block"),

  // Pro upsell bullets (free users only)
  proFeatures: [
    __("31 premium blocks including Video Slider, Carousel, Playlist, and Bento Grid.", "video-gallery-block"),
    __("Masonry and mixed-ratio layouts.", "video-gallery-block"),
    __("Sliders and carousels with autoplay.", "video-gallery-block"),
    __("Playlist gallery with navigation.", "video-gallery-block"),
    __("Parallax background video sections.", "video-gallery-block"),
    __("Advanced typography and overlays.", "video-gallery-block"),
    __("Custom navigation and player controls.", "video-gallery-block"),
    __("WooCommerce product carousel.", "video-gallery-block"),
    __("Priority support.", "video-gallery-block"),
  ],
});

export const demoInfo = {
  allInOneLabel: "See All Demos",
  allInOneLink: "https://bblockswp.com/demo/video-gallery-block-all-demos/",
  demos: blocks.map((block) => ({
    icon: block.icon,
    title: block.title,
    type: "iframe",
    url: block.demo,
  })),
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
