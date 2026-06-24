import { __ } from "@wordpress/i18n";
import blocks from "./blocks";

const slug = "video-gallery-block";

// Inline SVG banner (3:2) for the Welcome hero. Source: src/admin/assets/welcome-banner.svg
const welcomeBanner =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400' width='600' height='400' fill='none' role='img' aria-label='Video Gallery Block by bPlugins'%3E%3Cdefs%3E%3ClinearGradient id='vgbBg' x1='0' y1='0' x2='600' y2='400' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%234b3fd6'/%3E%3Cstop offset='0.55' stop-color='%236155f5'/%3E%3Cstop offset='1' stop-color='%237c3aed'/%3E%3C/linearGradient%3E%3ClinearGradient id='vgbCard' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23ffffff' stop-opacity='0.18'/%3E%3Cstop offset='1' stop-color='%23ffffff' stop-opacity='0.06'/%3E%3C/linearGradient%3E%3ClinearGradient id='vgbCardA' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%238b80ff'/%3E%3Cstop offset='1' stop-color='%235a4ce0'/%3E%3C/linearGradient%3E%3ClinearGradient id='vgbCardB' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23a78bfa'/%3E%3Cstop offset='1' stop-color='%236d28d9'/%3E%3C/linearGradient%3E%3ClinearGradient id='vgbCardC' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23c4b5fd'/%3E%3Cstop offset='1' stop-color='%237c3aed'/%3E%3C/linearGradient%3E%3Cfilter id='vgbShadow' x='-20%25' y='-20%25' width='140%25' height='140%25'%3E%3CfeDropShadow dx='0' dy='8' stdDeviation='14' flood-color='%231e1145' flood-opacity='0.35'/%3E%3C/filter%3E%3C/defs%3E%3Crect width='600' height='400' fill='url(%23vgbBg)'/%3E%3Ccircle cx='80' cy='60' r='120' fill='%23ffffff' opacity='0.06'/%3E%3Ccircle cx='540' cy='350' r='150' fill='%233b2bb5' opacity='0.25'/%3E%3Ccircle cx='520' cy='70' r='60' fill='%23ffffff' opacity='0.05'/%3E%3Cg%3E%3Crect x='48' y='44' width='44' height='44' rx='12' fill='%23ffffff'/%3E%3Cg transform='translate(55 52) scale(0.8)'%3E%3Cpath d='M37.4506 10.2852C37.4429 13.1251 36.1918 15.7041 34.2269 17.5539C32.3003 19.3883 29.683 20.5166 26.8891 20.5166H25.6687C22.5909 20.5166 20.0963 23.0111 20.0963 26.089V35.2689H12.9735C12.1139 35.2689 11.4231 34.5704 11.4231 33.7184V22.259C11.4231 21.5605 11.0393 20.8774 10.3869 20.6241C9.72678 20.3631 9.04367 20.555 8.61384 20.9695C8.59849 20.9925 8.58314 21.0002 8.56779 21.0155C7.66208 21.9903 6.38028 22.5967 4.95264 22.5967C2.02061 22.5967 -0.305059 20.0561 0.032662 17.0703C0.293628 14.7677 2.20482 12.9256 4.50746 12.7183C6.11931 12.5802 7.593 13.2096 8.59081 14.2918C8.97458 14.6679 9.55025 14.8675 10.1489 14.7293C10.9165 14.5528 11.4307 13.8236 11.4307 13.033V1.55821C11.4307 0.698559 12.1292 0.00776578 12.9812 0.00776578H18.024C18.9066 0.00776578 19.7126 0.652504 19.7816 1.53518C19.82 2.04944 19.6358 2.51764 19.3058 2.84769C18.3233 3.75339 17.7093 5.04287 17.7093 6.47819C17.7093 9.21833 19.9275 11.4289 22.66 11.4289C25.4001 11.4289 27.6106 9.21833 27.6106 6.47819C27.6106 5.04287 27.0043 3.76107 26.0295 2.86304C26.0141 2.84769 26.0065 2.83234 25.9834 2.81699C25.6073 2.42554 25.4231 1.8422 25.5843 1.24352C25.7762 0.483645 26.5284 -0.0075868 27.3113 8.86678e-05C30.0975 0.038466 32.615 1.17444 34.4418 3.0012C36.3069 4.87401 37.4583 7.43762 37.4506 10.2852Z' fill='%23146EF5'/%3E%3Cpath d='M37.4507 25.0145C37.4507 30.679 32.8607 35.2689 27.1962 35.2689H20.0964V26.0891C20.0964 23.0112 22.591 20.5167 25.6688 20.5167H26.8892C29.6831 20.5167 32.3004 19.3884 34.227 17.554C34.2961 17.623 34.3728 17.6921 34.4419 17.7689C36.2994 19.6187 37.4507 22.1823 37.4507 25.0145Z' fill='%23FF7A00'/%3E%3C/g%3E%3Ctext x='108' y='64' font-family='Arial%2C Helvetica%2C sans-serif' font-size='27' font-weight='700' fill='%23ffffff'%3EVideo Gallery%3C/text%3E%3Ctext x='108' y='90' font-family='Arial%2C Helvetica%2C sans-serif' font-size='27' font-weight='700' fill='%23ffffff' opacity='0.9'%3EBlock%3C/text%3E%3C/g%3E%3Cg filter='url(%23vgbShadow)'%3E%3Cg transform='translate(70 150) rotate(-6)'%3E%3Crect width='150' height='100' rx='14' fill='url(%23vgbCardA)'/%3E%3Ccircle cx='75' cy='50' r='22' fill='%23ffffff' opacity='0.95'/%3E%3Cpath d='M68 39 v22 l18 -11 z' fill='%235a4ce0'/%3E%3C/g%3E%3Cg transform='translate(380 150) rotate(6)'%3E%3Crect width='150' height='100' rx='14' fill='url(%23vgbCardC)'/%3E%3Ccircle cx='75' cy='50' r='22' fill='%23ffffff' opacity='0.95'/%3E%3Cpath d='M68 39 v22 l18 -11 z' fill='%237c3aed'/%3E%3C/g%3E%3Cg transform='translate(213 135)'%3E%3Crect width='174' height='116' rx='16' fill='url(%23vgbCardB)'/%3E%3Crect width='174' height='116' rx='16' fill='url(%23vgbCard)'/%3E%3Ccircle cx='87' cy='58' r='27' fill='%23ffffff'/%3E%3Cpath d='M78 44 v28 l23 -14 z' fill='%236d28d9'/%3E%3C/g%3E%3C/g%3E%3Cg%3E%3Crect x='222' y='330' width='156' height='44' rx='22' fill='%23ffffff'/%3E%3Cg transform='translate(243 344) scale(0.57)'%3E%3Cpath d='M37.4506 10.2852C37.4429 13.1251 36.1918 15.7041 34.2269 17.5539C32.3003 19.3883 29.683 20.5166 26.8891 20.5166H25.6687C22.5909 20.5166 20.0963 23.0111 20.0963 26.089V35.2689H12.9735C12.1139 35.2689 11.4231 34.5704 11.4231 33.7184V22.259C11.4231 21.5605 11.0393 20.8774 10.3869 20.6241C9.72678 20.3631 9.04367 20.555 8.61384 20.9695C8.59849 20.9925 8.58314 21.0002 8.56779 21.0155C7.66208 21.9903 6.38028 22.5967 4.95264 22.5967C2.02061 22.5967 -0.305059 20.0561 0.032662 17.0703C0.293628 14.7677 2.20482 12.9256 4.50746 12.7183C6.11931 12.5802 7.593 13.2096 8.59081 14.2918C8.97458 14.6679 9.55025 14.8675 10.1489 14.7293C10.9165 14.5528 11.4307 13.8236 11.4307 13.033V1.55821C11.4307 0.698559 12.1292 0.00776578 12.9812 0.00776578H18.024C18.9066 0.00776578 19.7126 0.652504 19.7816 1.53518C19.82 2.04944 19.6358 2.51764 19.3058 2.84769C18.3233 3.75339 17.7093 5.04287 17.7093 6.47819C17.7093 9.21833 19.9275 11.4289 22.66 11.4289C25.4001 11.4289 27.6106 9.21833 27.6106 6.47819C27.6106 5.04287 27.0043 3.76107 26.0295 2.86304C26.0141 2.84769 26.0065 2.83234 25.9834 2.81699C25.6073 2.42554 25.4231 1.8422 25.5843 1.24352C25.7762 0.483645 26.5284 -0.0075868 27.3113 8.86678e-05C30.0975 0.038466 32.615 1.17444 34.4418 3.0012C36.3069 4.87401 37.4583 7.43762 37.4506 10.2852Z' fill='%23146EF5'/%3E%3Cpath d='M37.4507 25.0145C37.4507 30.679 32.8607 35.2689 27.1962 35.2689H20.0964V26.0891C20.0964 23.0112 22.591 20.5167 25.6688 20.5167H26.8892C29.6831 20.5167 32.3004 19.3884 34.227 17.554C34.2961 17.623 34.3728 17.6921 34.4419 17.7689C36.2994 19.6187 37.4507 22.1823 37.4507 25.0145Z' fill='%23FF7A00'/%3E%3Cpath d='M62.3039 10.5922C58.5352 10.5922 57.1997 12.9563 57.1997 12.9563H56.7391V4.07574C56.7391 3.61521 56.4705 3.35425 56.0176 3.35425H52.2874C51.8268 3.35425 51.6042 3.62289 51.6042 4.07574V30.8171C51.6042 31.2776 51.8345 31.5386 52.2874 31.5386H56.0176C56.4782 31.5386 56.7391 31.2699 56.7391 30.8171V29.4816H57.1997C57.1997 29.4816 58.5352 31.8456 62.3039 31.8456C67.5999 31.8456 70.7238 27.2019 70.7238 21.2151C70.7238 15.2282 67.5923 10.5922 62.3039 10.5922ZM60.9299 27.5397C57.9595 27.5397 56.4705 24.9146 56.4705 21.2151C56.4705 17.5232 57.9595 14.8905 60.9299 14.8905C63.9387 14.8905 65.351 17.5155 65.351 21.2151C65.351 24.9146 63.9387 27.5397 60.9299 27.5397Z' fill='%23101828'/%3E%3Cpath d='M73.7786 4.45953C73.7786 4.0604 74.1009 3.73804 74.5001 3.73804H83.5494C86.3203 3.73804 88.5769 4.60536 90.3039 6.34002C92.0308 8.07468 92.8982 10.3389 92.8982 13.1405C92.8982 15.8883 92.0078 18.1219 90.2271 19.8488C88.4464 21.5682 86.1514 22.4278 83.3422 22.4278H78.7523V30.8171C78.7523 31.2162 78.4299 31.5386 78.0308 31.5386H74.5077C74.1086 31.5386 73.7862 31.2162 73.7862 30.8171V4.45953H73.7786ZM78.7523 7.89814V18.2984H82.2293C84.0176 18.2984 85.3992 17.8456 86.3817 16.9475C87.3641 16.0495 87.8554 14.7754 87.8554 13.1328C87.8554 11.4365 87.3718 10.1394 86.397 9.24135C85.4299 8.34332 84.0407 7.89046 82.2446 7.89046H78.7523V7.89814Z' fill='%23101828'/%3E%3Cpath d='M104.603 31.5386C105.056 31.5386 105.325 31.2699 105.325 30.8171V27.7699C105.325 27.3094 105.056 27.0868 104.603 27.0868H102.431C101.594 27.0868 101.096 26.5879 101.096 25.7513V4.07574C101.096 3.61521 100.827 3.35425 100.374 3.35425H96.6438C96.1833 3.35425 95.9607 3.62289 95.9607 4.07574V26.1274C95.9607 29.6351 97.8258 31.5386 101.334 31.5386H104.603Z' fill='%23101828'/%3E%3Cpath d='M120.415 10.9758C119.954 10.9758 119.693 11.2445 119.693 11.6973V24.0011C119.693 26.4803 118.058 27.6163 116.224 27.6163C114.397 27.6163 112.793 26.4726 112.793 24.0011V11.6973C112.793 11.2368 112.524 10.9758 112.071 10.9758H108.341C107.881 10.9758 107.658 11.2445 107.658 11.6973V24.6075C107.658 29.1744 110.283 31.9222 114.213 31.9222C118.097 31.9222 119.24 29.2204 119.24 29.2204H119.701V30.8169C119.701 31.2774 119.969 31.5384 120.422 31.5384H124.153C124.613 31.5384 124.874 31.2698 124.874 30.8169V11.6973C124.874 11.2368 124.605 10.9758 124.153 10.9758H120.415Z' fill='%23101828'/%3E%3Cpath d='M147.072 27.2868C147.064 26.8032 147.056 26.3197 147.056 25.8515C147.056 21.8679 147.056 17.892 147.056 13.9084C147.056 13.1486 147.056 12.3887 147.056 11.6288C147.056 11.176 146.834 10.8997 146.366 10.8997H142.635C142.183 10.8997 141.906 11.176 141.906 11.6288V12.9567H141.453C141.453 12.9567 140.126 10.585 136.349 10.585C131.053 10.585 127.929 15.2363 127.929 21.2155C127.929 27.1947 131.061 30.925 136.349 30.9096C140.003 30.8943 141.453 28.5379 141.453 28.5379H141.891C141.906 28.5993 141.906 28.653 141.906 28.7298V30.38C141.829 32.3372 141.668 34.5324 139.619 35.4151C139.281 35.5609 138.897 35.6837 138.529 35.7145C135.06 36.1059 133.594 34.1103 133.064 33.0664C132.895 32.7287 132.488 32.5982 132.143 32.744L129.226 34.0028C128.85 34.164 128.681 34.6092 128.858 34.9776C129.487 36.2901 131.276 39.0686 135.413 39.8132C138.306 40.3351 141.653 39.7671 143.833 38.0938C146.32 36.1827 146.934 33.3197 147.049 30.4491C147.103 29.3899 147.087 28.3383 147.072 27.2868ZM137.731 26.596C135.643 26.596 134.077 25.5598 133.555 23.4798C132.765 20.3175 133.54 14.8986 137.731 14.8986C140.701 14.8986 142.19 17.5313 142.19 21.2155C142.19 24.9151 140.694 26.596 137.731 26.596Z' fill='%23101828'/%3E%3Cpath d='M154.763 2.21094C152.859 2.21094 151.447 3.58484 151.447 5.44998C151.447 7.3535 152.859 8.72741 154.763 8.72741C156.666 8.72741 158.078 7.3535 158.078 5.44998C158.071 3.58484 156.666 2.21094 154.763 2.21094Z' fill='%23101828'/%3E%3Cpath d='M156.628 10.9766H152.897C152.437 10.9766 152.176 11.2452 152.176 11.6981V30.8177C152.176 31.2782 152.444 31.5392 152.897 31.5392H156.628C157.088 31.5392 157.349 31.2705 157.349 30.8177V11.6981C157.349 11.2375 157.08 10.9766 156.628 10.9766Z' fill='%23101828'/%3E%3Cpath d='M173.13 10.5928C169.246 10.5928 168.103 13.2945 168.103 13.2945H167.642V11.698C167.642 11.2375 167.373 10.9765 166.921 10.9765H163.19C162.73 10.9765 162.469 11.2452 162.469 11.698V30.8176C162.469 31.2782 162.737 31.5391 163.19 31.5391H166.921C167.381 31.5391 167.642 31.2705 167.642 30.8176V18.5139C167.642 16.0347 169.277 14.8987 171.111 14.8987C172.938 14.8987 174.542 16.0424 174.542 18.5139V30.8176C174.542 31.2782 174.811 31.5391 175.264 31.5391H178.994C179.455 31.5391 179.677 31.2705 179.677 30.8176V17.9075C179.677 13.3329 177.052 10.5928 173.13 10.5928Z' fill='%23101828'/%3E%3Cpath d='M199.418 24.0474C199.019 21.7141 197.4 20.4476 195.335 19.7799C194.237 19.4268 193.109 19.1812 191.981 18.9509C190.776 18.6976 188.665 18.6976 188.082 17.3621C187.568 16.1877 188.581 15.1132 189.648 14.8138C191.751 14.2305 193.409 14.8906 194.475 16.7941C194.759 17.293 195.089 17.4695 195.611 17.2853C196.571 16.9399 197.369 16.6022 198.329 16.2491C198.92 16.0342 199.096 15.6274 198.789 15.0825C198.421 14.4224 198.098 13.7086 197.599 13.1559C194.775 10.0013 188.466 9.73267 185.111 12.5112C182.563 14.6296 181.857 20.0408 186.27 22.0288C187.115 22.4049 187.936 22.5047 188.842 22.7196C190.208 23.0496 191.597 23.2492 192.963 23.5715C193.739 23.7558 194.591 24.224 194.66 25.2218C194.721 26.1044 194.276 26.8336 193.232 27.202C191.336 27.8852 188.182 27.7317 187.069 25.2064C186.792 24.5924 186.409 24.4619 185.81 24.6922C184.935 25.0222 184.052 25.3523 183.162 25.6209C182.448 25.8358 182.525 26.1966 182.732 26.8413C183.607 29.5124 186.255 31.1319 188.888 31.6692C188.918 31.6768 188.957 31.6845 188.987 31.6922C189.057 31.7075 189.126 31.7152 189.195 31.7306C190.584 31.9685 191.866 32.0146 193.247 31.7306C194.115 31.554 194.959 31.2777 195.75 30.8863C195.949 30.7865 196.133 30.6714 196.325 30.5716C198.712 29.3281 199.887 26.7645 199.418 24.0474Z' fill='%23101828'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E";

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
      logo: `https://ps.w.org/${slug}/assets/icon-128x128.png`,
      banner: `https://ps.w.org/${slug}/assets/banner-772x250.png`,
      thumbnail: welcomeBanner,
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
