import { __ } from "@wordpress/i18n";
import blocks from "./blocks";
import { videoGalleryBanner } from "../assets/banner";
import { videoGalleryLogo } from "../assets/logo";

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
      "A lightweight Gutenberg block plugin for WordPress that lets you easily create responsive video galleries with albums, filters, captions, and lightbox support. Showcase YouTube, Vimeo, or self hosted videos in a lightbox grid layout directly in the block editor.",
    slug,
    version,
    licenseActiveNonce,
    uninstallNonce,
    deleteDataOnUninstall,
    adminUrl,
    allBlocks: blocks,
    displayOurPlugins: true,
    media: {
      logo: videoGalleryLogo,
      banner: `https://ps.w.org/${slug}/assets/banner-772x250.png`,
      thumbnail: videoGalleryBanner,
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
            body: __("Add <strong>YouTube</strong>, <strong>Vimeo</strong>, or self-hosted videos.", "video-gallery-block"),
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
      version: "1.6.0 - 13 October 2026",
      type: "new",
      list:   [
        __("<strong>Update:</strong> Freemius SDK updated to 2.13.5.", "video-gallery-block"),
        __("<strong>Fix:</strong> After activating the plugin, the page no longer says you are not allowed to access it. The Freemius opt-in now opens first, then the first page of the plugin.", "video-gallery-block"),
      ],
    },
    {
      version: "1.5.4 - 6 October 2026",
      type: "new",
      list: [
        __("<strong>New:</strong> Video play events for Google Analytics. A video now sends video_play when a visitor presses play, and video_watch_progress at 25, 50 and 75 percent and video_watch_complete when they finish. Works with files, YouTube and Vimeo. Facebook videos only report that they were opened.", "video-gallery-block"),
        __("<strong>New:</strong> Video events are also sent straight to Google Analytics when gtag.js is on the page, for example with Site Kit. Google Tag Manager is no longer needed.", "video-gallery-block"),
        __("<strong>Fix:</strong> Facebook Reel links now open as Facebook videos.", "video-gallery-block"),
      ],
    },
    {
      version: "1.5.3 - 15 September 2026",
      type: "fix",
      list: [
        __("<strong>Fix:</strong> Editor Hover Tooltip Visibility — fixed an issue where the tooltip for the first row of videos in the gallery would be clipped by Gutenberg's block boundaries.", "video-gallery-block"),
        __("<strong>Fix:</strong> Editor Selection Border — fixed an issue where the blue selection outline would be hidden behind poster images in the editor.", "video-gallery-block"),
      ],
    },
    {
      version: "1.5.2 - 12 September 2026",
      type: "new",
      list: [
        __("<strong>New:</strong> Animated Album Filtering — switching album filters now features smooth FLIP layout transitions (sliding into place, fade-in, and scale effects) with zero external library overhead.", "video-gallery-block"),
        __("<strong>New:</strong> Editor Interaction & Double-Click Preview — single-clicking any video tile in the block editor selects it in the sidebar, while double-clicking opens the lightbox preview.", "video-gallery-block"),
        __("<strong>Fix:</strong> Editor Hover Tooltip Visibility — fixed an issue where the hover hint tooltip was clipped and hidden by thumbnail overflow boundaries in the editor.", "video-gallery-block"),
      ],
    },
    {
      version: "1.5.1 - 9 September 2026",
      type: "new",
      list: [
        __("<strong>New:</strong> Sort Order — show the gallery in the order you added the videos, or set it to Newest First / Oldest First and let the block keep it sorted automatically.", "video-gallery-block"),
        __("<strong>New:</strong> Row Alignment — when the last row of a gallery doesn't fill every column, align it left, center, or right instead of it always stretching to one side.", "video-gallery-block"),
        __("<strong>New:</strong> Per-Device Column & Row Gap — set the spacing between tiles separately for desktop, tablet, and mobile, the same way column counts already work per device.", "video-gallery-block"),
        __("<strong>New:</strong> Facebook Video Support — add Facebook videos to the gallery alongside YouTube and Vimeo, using Facebook's public embed player. No app or API key required.", "video-gallery-block"),
        __("<strong>New:</strong> GDPR Consent-Gated Embeds — a Require Consent Before Playing option shows a consent overlay in place of the player until a visitor agrees, so no third-party cookie is set before that.", "video-gallery-block"),
        __("<strong>New:</strong> Google Analytics 4 Video Tracking — a Send Video Play Events to Google Analytics option pushes a video_start event (title, provider, URL) to window.dataLayer whenever a visitor plays a video. Works with GA4 or Google Tag Manager already on the site.", "video-gallery-block"),
        __("<strong>New:</strong> Cached Thumbnails — YouTube and Vimeo thumbnails are downloaded into your Media Library the first time they're needed and served from your own site after that, so a thumbnail can never 404 again just because a provider reshuffled its sizes. Warms up gradually, at most one new thumbnail per page view.", "video-gallery-block"),
        __("<strong>New:</strong> Load More Pagination — a Videos Per Page setting under Layout Settings starts the gallery with that many tiles and reveals the rest behind a Load More button. Off by default (0 = show everything) so no existing gallery's appearance changes on upgrade.", "video-gallery-block"),
        __("<strong>New:</strong> YouTube Shorts Filter — show every video, hide Shorts, or show only Shorts, detected from the link itself with no API key needed.", "video-gallery-block"),
        __("<strong>New:</strong> Play Icon on Thumbnails — a play icon now sits over every tile by default, so a gallery reads as video content before anyone hovers or clicks. Its color, background, size, and hover zoom are all customizable under Style → Item, or it can be turned off entirely under Options.", "video-gallery-block"),
        __("<strong>New:</strong> Item Border & Shadow — Style → Item now has Border and Shadow controls for each individual thumbnail tile, the same way the overall gallery box already did.", "video-gallery-block"),
        __("<strong>Fix:</strong> Filter button active/hover colors — the Button Hover/Active Colors control under Style → Filter had no effect on the active (current) filter button, and could leave the hover color stuck on the Load More button permanently instead of only on hover. Both now behave correctly.", "video-gallery-block"),
        __("<strong>Fix:</strong> Custom player controls in the lightbox — videos now consistently get the plugin's Plyr-based controls instead of occasionally falling back to the browser's default video controls.", "video-gallery-block"),
      ],
    },
    {
      version: "1.5.0 - 7 September 2026",
      type: "new",
      list: [
        __("<strong>New:</strong> Bulk Import — paste a list of video links, one per line, and the whole gallery is built with titles and posters filled in automatically via WordPress oEmbed.", "video-gallery-block"),
        __("<strong>New:</strong> Thumbnail Shape — tiles can be 16∶9, 4∶3, 1∶1 or 9∶16 instead of a fixed pixel height, so vertical Shorts and Reels are no longer cropped.", "video-gallery-block"),
        __("<strong>New:</strong> Video SEO markup (free) — each video gets Schema.org VideoObject JSON-LD so galleries can appear as video results in search.", "video-gallery-block"),
        __("<strong>New:</strong> Five ready-made sections — Video gallery with album filters, Course video library, Product demo showcase, Customer video stories, and Portfolio showreel wall.", "video-gallery-block"),
        __("<strong>New:</strong> Added a Show Filter Bar toggle.", "video-gallery-block"),
        __("<strong>Update:</strong> The gallery is now rendered by the server, so search engines see the content and galleries no longer depend on JavaScript loading first.", "video-gallery-block"),
        __("<strong>Update:</strong> Patterns arrive fully configured with headings, columns, gaps, and thumbnail height already set.", "video-gallery-block"),
        __("<strong>Update:</strong> Pattern thumbnails are drawn inline for instant rendering with no broken posters.", "video-gallery-block"),
        __("<strong>Update:</strong> Vimeo thumbnails — pasting a Vimeo URL now fills in the title and poster.", "video-gallery-block"),
        __("<strong>Update:</strong> Removed jQuery and Isotope from the front end (~120 KB less JavaScript).", "video-gallery-block"),
        __("<strong>Update:</strong> Thumbnails are lazy-loaded with alt text; filter buttons and links carry accessible labels.", "video-gallery-block"),
        __("<strong>Fix:</strong> The gallery now appears on sites that delay JavaScript (WP Rocket, LiteSpeed, Perfmatters).", "video-gallery-block"),
        __("<strong>Fix:</strong> Tablet and mobile column counts — items no longer overflow their columns.", "video-gallery-block"),
        __("<strong>Fix:</strong> Album filters now work for non-English album names (Bengali, Cyrillic, Arabic, CJK, etc.).", "video-gallery-block"),
        __("<strong>Fix:</strong> Broken YouTube thumbnails — the block now steps down through available sizes.", "video-gallery-block"),
        __("<strong>Fix:</strong> Captions with formatting no longer show literal HTML tags.", "video-gallery-block"),
        __("<strong>Fix:</strong> One broken gallery no longer takes down every other gallery on the page.", "video-gallery-block"),
        __("<strong>Fix:</strong> Galleries no longer appear in the site's own search results.", "video-gallery-block"),
        __("<strong>Fix:</strong> Closing a lightbox no longer breaks other galleries on the same page.", "video-gallery-block"),
        __("<strong>Fix:</strong> The editor's Get Premium link and translations now work correctly.", "video-gallery-block"),
        __("<strong>Fix:</strong> The Customer video stories section now uses the full width of its surrounding section.", "video-gallery-block"),
      ],
    },
    {
      version: "1.4.1 - 24 June 2026",
      type: "update",
      list: [
        __("<strong>Update:</strong> Improved block metadata, keywords, and search discoverability in the Gutenberg editor.", "video-gallery-block"),
      ],
    },
    {
      version: "1.4.0 - 18 June 2026",
      type: "new",
      list: [
        __("<strong>New:</strong> Added 23 new premium blocks including Video Shorts Reel, Video Showcase Wall, Video Curriculum Accordion, Video Hotspot Scene, Video Tabs Gallery, Video Scrollytelling Showcase, Video Timeline Gallery, Video Bento Grid, Video Comparison Gallery, Video Justified Gallery, Video Expanding Panels, Video Wall with Floating Player (PiP), Video Swipe Deck, Video Marquee Wall, Video Flip Cards Gallery, Video Map Gallery, Video Stories, Video Podcast Episodes, Video Property Tour Gallery, Video Workout Planner, Video Wedding Story Gallery, Video Menu Showcase, and Video Feature Tour.", "video-gallery-block"),
        __("<strong>New:</strong> Introduced a redesigned admin dashboard with an improved user experience.", "video-gallery-block"),
        __("<strong>Update:</strong> Greatly improved page performance when several video blocks are used on the same page.", "video-gallery-block"),
        __("<strong>Update:</strong> Videos no longer load data in the background — they now load only when played (on hover or click), reducing bandwidth and CPU usage and keeping scrolling smooth.", "video-gallery-block"),
        __("<strong>Fix:</strong> Parallax Row Video Gallery: Fixed scroll stuttering by switching the parallax effect to GPU-accelerated, requestAnimationFrame-based updates and rendering posters instead of video elements until played.", "video-gallery-block"),
        __("<strong>Update:</strong> Video Carousel Gallery: Cards now show a poster image and load the video only on hover; off-screen videos are fully released.", "video-gallery-block"),
        __("<strong>Update:</strong> Video Slider: Now uses click-to-play, so videos no longer stream in the background.", "video-gallery-block"),
        __("<strong>Update:</strong> Video Testimonial Section: Idle cards render lightweight poster images instead of video elements, and card heights are now consistent.", "video-gallery-block"),
        __("<strong>Fix:</strong> Video Playlist Gallery: Up Next durations now load lazily, and fixed an issue where selecting a video from the playlist did not start playing.", "video-gallery-block"),
        __("<strong>Update:</strong> Minor fixes and styling updates.", "video-gallery-block"),
      ],
    },
    {
      version: "1.1.2 - 10 May 2026",
      type: "update",
      list: [
        __("<strong>Update:</strong> Compliance updates and security enhancements for directory guidelines.", "video-gallery-block"),
      ],
    },
    {
      version: "1.1.1 - 12 Aug 2025",
      type: "update",
      list: [
        __("<strong>Fix:</strong> Fixed minor issues.", "video-gallery-block"),
        __("<strong>New:</strong> Added 8 new block styles.", "video-gallery-block"),
        __("<strong>New:</strong> Added new shortcode styles.", "video-gallery-block"),
        __("<strong>New:</strong> Added new dashboard.", "video-gallery-block"),
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
        __("<strong>New:</strong> Added option to hide the \"All\" album filter.", "video-gallery-block"),
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
    {
      version: "1.0.5",
      type: "update",
      list: [__("<strong>Update:</strong> Improved vertical video height handling.", "video-gallery-block")],
    },
    {
      version: "1.0.4",
      type: "new",
      list: [
        __("<strong>New:</strong> Added video captions.", "video-gallery-block"),
        __("<strong>Update:</strong> Prevented loading scripts when block is not used.", "video-gallery-block"),
      ],
    },
    {
      version: "1.0.3",
      type: "new",
      list: [__("<strong>New:</strong> Added translation support.", "video-gallery-block")],
    },
    {
      version: "1.0.2",
      type: "update",
      list: [__("<strong>Fix:</strong> Fixed add/remove video issues.", "video-gallery-block")],
    },
    {
      version: "1.0.1",
      type: "new",
      list: [__("<strong>New:</strong> Automatic video thumbnail generation.", "video-gallery-block")],
    },
    {
      version: "1.0.0",
      type: "new",
      list: [__("<strong>New:</strong> Initial release.", "video-gallery-block")],
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
  logo: videoGalleryLogo, // Optional
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
