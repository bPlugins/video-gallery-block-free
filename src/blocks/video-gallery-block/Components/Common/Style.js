import { useEffect } from "react";
import {
  getBackgroundCSS,
  getBorderCSS,
  getColorsCSS,
  getMultiShadowCSS,
  getSpaceCSS,
  getTypoCSS,
} from "../../../../../../bpl-tools/utils/getCSS";
import { prefix } from "../../utils/data";

/**
 * Layout is driven by custom properties, not by generated rules.
 *
 * The grid itself lives in style.scss and reads these. That is what lets the
 * server render the gallery with the right number of columns before any
 * JavaScript runs -- render.php sets the same properties inline -- and it is
 * also what fixed the responsive columns. The old version wrote the desktop
 * width in pixels and a `margin-right` gutter, then overrode only the width in
 * the tablet and mobile media queries: each item ended up `50% + 10px` wide, two
 * of them no longer fitted a row, and a gallery set to two columns on tablet
 * rendered one.
 */
const layoutVars = (attributes) => {
  const {
    columnGap,
    rowGap,
    itemHeight,
    aspectRatio,
    options,
    columns = { desktop: 3, tablet: 2, mobile: 1 },
  } = attributes;

  const cols =
    typeof columns === "number"
      ? { desktop: columns, tablet: Math.max(1, columns - 1), mobile: 1 }
      : { desktop: 3, tablet: 2, mobile: 1, ...columns };

  return {
    "--vgbCols": cols.desktop || 3,
    "--vgbColsT": cols.tablet || 2,
    "--vgbColsM": cols.mobile || 1,
    "--vgbColGap": `${columnGap ?? 10}px`,
    "--vgbRowGap": `${rowGap ?? 10}px`,
    /*
     * A tile is sized by one of these two, never both -- a definite height
     * wins over aspect-ratio, so the height has to step aside for the ratio to
     * mean anything.
     */
    "--vgbItemH": aspectRatio ? "auto" : itemHeight || "200px",
    "--vgbRatio": aspectRatio || "auto",
    "--vgbFit": options?.objectFit || "cover",
  };
};

const varsToCSS = (vars) =>
  Object.entries(vars)
    .map(([name, value]) => `${name}: ${value};`)
    .join(" ");

const Style = ({ attributes, id, isEditor, galleryRef }) => {
  const {
    isPopupWidthAsRatio,
    background,
    padding,
    border,
    shadow,
    filterBtnTypo,
    filterBtnColors,
    filterBtnHoverColors,
    styles,
  } = attributes;

  const videoGallerySl = `#${id} .${prefix}`;
  const buttonSl = `${videoGallerySl} .filter button`;
  const fancyMainSl = `.${id}-fancyBox`;
  const itemCaption = `${videoGallerySl} .videoGallery .galleryItemCaption`;
  const lightBoxCaption = `${fancyMainSl} .f-caption, ${fancyMainSl} .fancybox__caption, ${fancyMainSl} .fancybox__caption-inner`;
  const videoSizeFit = `${fancyMainSl} .f-html5video, ${fancyMainSl} .fancybox__html5video`;
  const editorLightBoxCaption = `${fancyMainSl} .f-caption`;

  // Apply lightbox caption styles directly via inline styles in the editor
  // This bypasses CSS specificity issues where Fancybox's own styles override the <style> tag
  useEffect(() => {
    if (!isEditor || !galleryRef?.current) return; // Editor only

    const captionStyles = styles?.lightBoxCaption;
    if (!captionStyles) return;

    // Load Google Font in the main document so Fancybox can use it outside the iframe
    const typo = captionStyles.typography || {};
    const isEmptyFamily = !typo.fontFamily || typo.fontFamily === "Default";
    if (!isEmptyFamily && typo.isUploadFont !== false) {
      const fontVariant = typo.fontVariant || 400;
      let linkQuery = "";
      if (fontVariant !== 400) {
        if (fontVariant === "400i") {
          linkQuery = ":ital@1";
        } else if (String(fontVariant).includes("00i")) {
          linkQuery = `:ital,wght@1,${String(fontVariant).replace("00i", "00")}`;
        } else {
          linkQuery = `:wght@${fontVariant}`;
        }
      }

      const fontUrl = `https://fonts.googleapis.com/css2?family=${typo.fontFamily.split(" ").join("+")}${linkQuery}&display=swap`;

      if (!document.querySelector(`link[href="${fontUrl}"]`)) {
        const linkEl = document.createElement("link");
        linkEl.rel = "stylesheet";
        linkEl.href = fontUrl;
        document.head.appendChild(linkEl);
      }
    }

    const applyStylesToCaption = (el) => {
      // Apply typography
      const typo = captionStyles.typography || {};
      if (typo.fontFamily && typo.fontFamily !== "Default") {
        el.style.setProperty("font-family", `'${typo.fontFamily}', ${typo.fontCategory || "sans-serif"}`, "important");
      }
      if (typo.fontSize) {
        const size = typo.fontSize?.desktop || typo.fontSize;
        if (size) {
          const sizeVal = typeof size === "number" ? `${size}px` : size;
          el.style.setProperty("font-size", sizeVal, "important");
        }
      }
      if (typo.fontWeight) el.style.setProperty("font-weight", typo.fontWeight, "important");
      if (typo.fontStyle) el.style.setProperty("font-style", typo.fontStyle, "important");
      if (typo.textTransform) el.style.setProperty("text-transform", typo.textTransform, "important");
      if (typo.textDecoration) el.style.setProperty("text-decoration", typo.textDecoration, "important");
      if (typo.lineHeight) el.style.setProperty("line-height", typo.lineHeight, "important");
      if (typo.letterSpace) el.style.setProperty("letter-spacing", typo.letterSpace, "important");

      // Apply colors
      const colors = captionStyles.colors || {};
      if (colors.color) el.style.setProperty("color", colors.color, "important");
      if (colors.bg || colors.gradient) {
        const bgVal = colors.bgType === "gradient" ? colors.gradient : colors.bg;
        if (bgVal) el.style.setProperty("background", bgVal, "important");
      }

      el.style.setProperty("box-sizing", "border-box", "important");
      el.style.setProperty("overflow", "hidden", "important");

      // Apply padding
      const padding = captionStyles.padding;
      if (padding) {
        const { side = 2, vertical = "0px", horizontal = "0px", top = "0px", right = "0px", bottom = "0px", left = "0px" } = padding;
        const paddingVal = side === 2 ? `${vertical} ${horizontal}` : `${top} ${right} ${bottom} ${left}`;
        el.style.setProperty("padding", paddingVal, "important");
      }
    };

    // Apply to any currently visible captions
    const applyCurrent = () => {
      const doc1 = document;
      const doc2 = galleryRef.current?.ownerDocument;

      const elements = new Set();
      if (doc1) doc1.querySelectorAll(".f-caption").forEach(el => elements.add(el));
      if (doc2) doc2.querySelectorAll(".f-caption").forEach(el => elements.add(el));

      elements.forEach(applyStylesToCaption);
    };
    applyCurrent();

    // Watch for Fancybox dynamically adding caption elements
    const observer = new MutationObserver((mutations) => {
      let shouldApply = false;
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node.nodeType === 1) {
            if (
              node.classList?.contains("f-caption") ||
              node.classList?.contains("fancybox__container") ||
              node.classList?.contains("vidgalblkFancyBox") ||
              node.querySelector?.(".f-caption") ||
              node.querySelector?.(".fancybox__container")
            ) {
              shouldApply = true;
              break;
            }
          }
        }
        if (shouldApply) break;
      }

      if (shouldApply) {
        applyCurrent();
      }
    });

    const doc1 = document;
    const doc2 = galleryRef.current?.ownerDocument;

    if (doc1?.body) observer.observe(doc1.body, { childList: true, subtree: true });
    if (doc2?.body && doc2 !== doc1) observer.observe(doc2.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [styles?.lightBoxCaption, isEditor, galleryRef]);

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
		${getTypoCSS("", filterBtnTypo)?.googleFontLink}
		${getTypoCSS("", styles?.caption?.typography)?.googleFontLink}
		${getTypoCSS("", styles?.lightBoxCaption?.typography)?.googleFontLink}

		${getTypoCSS(buttonSl, filterBtnTypo)?.styles}
		${getTypoCSS(itemCaption, styles?.caption?.typography)?.styles}
		${getTypoCSS(lightBoxCaption, styles?.lightBoxCaption?.typography)?.styles?.replace(/;/g, " !important;")}
		${getTypoCSS(editorLightBoxCaption, styles?.lightBoxCaption?.typography)?.styles?.replace(/;/g, " !important;")}

		#${id}{
			${varsToCSS(layoutVars(attributes))}
		}

		${itemCaption}{
			${getColorsCSS(styles?.caption?.colors)}
			padding: ${getSpaceCSS(styles?.caption?.padding)};
		}

		${lightBoxCaption}{
			${getColorsCSS(styles?.lightBoxCaption?.colors)?.replace(/;/g, " !important;")}
			padding: ${getSpaceCSS(styles?.lightBoxCaption?.padding)} !important;
		}

		${editorLightBoxCaption}{
			${getColorsCSS(styles?.lightBoxCaption?.colors)?.replace(/;/g, " !important;")}
			padding: ${getSpaceCSS(styles?.lightBoxCaption?.padding)} !important;
		}

		${videoGallerySl}{
			${getBackgroundCSS(background)}
			padding: ${getSpaceCSS(padding)};
			${getBorderCSS(border)}
			box-shadow: ${shadow ? getMultiShadowCSS(shadow) : "0px 25px 30px -20px #0003"};
		}

		${buttonSl}{
			${getColorsCSS(filterBtnColors)}
		}

		${buttonSl}:hover,
		${buttonSl}.current{
			${getColorsCSS(filterBtnHoverColors)}
		}

		${videoSizeFit}{
			object-fit: var(--vgbFit, cover);
		}

		${
      isPopupWidthAsRatio
        ? `
			${fancyMainSl} .fancybox-content{
				background: #0000 !important;
			}
			${fancyMainSl} .plyr{
				width: fit-content;
			}
			${fancyMainSl} .plyr .plyr__controls{
				justify-content: flex-start;
			}
		`
        : ""
    }
		`.replace(/\s+/g, " "),
      }}
    />
  );
};

export default Style;
