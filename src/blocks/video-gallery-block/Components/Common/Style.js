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

const Style = ({ attributes, id, itemWidth, isEditor, activeFilter, galleryRef }) => {
  const {
    columnGap,
    rowGap,
    isPopupWidthAsRatio,
    background,
    padding,
    border,
    shadow,
    filterBtnTypo,
    filterBtnColors,
    filterBtnHoverColors,
    itemHeight,
    options,
    styles,
    columns = { desktop: 3, tablet: 2, mobile: 1 },
  } = attributes;

  const colSettings =
    typeof columns === "number"
      ? { desktop: columns, tablet: Math.max(1, columns - 1), mobile: 1 }
      : { ...{ desktop: 3, tablet: 2, mobile: 1 }, ...columns };

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
              node.classList?.contains("vgbFancyBox") ||
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

		${videoGallerySl} .videoGallery {
			display: ${isEditor ? "grid" : "block"};
			${
        isEditor
          ? `
				grid-template-columns: repeat(${colSettings.desktop}, 1fr);
				grid-column-gap: ${columnGap}px;
				grid-row-gap: ${rowGap}px;
			`
          : `
				position: relative;
			`
      }
			width: 100%;
		}

		${buttonSl}{
			${getColorsCSS(filterBtnColors)}
		}

		${buttonSl}:hover,
		${buttonSl}.current{
			${getColorsCSS(filterBtnHoverColors)}
		}
		
		${videoGallerySl} .videoGallery .galleryItem{
			display: ${isEditor ? "block" : "inline-block"};
			vertical-align: top;
			width: ${
        isEditor
          ? "100%"
          : itemWidth
          ? `${itemWidth}px`
          : `${100 / (colSettings.desktop || 3)}%`
      };
			height: ${itemHeight};
			margin-bottom: ${rowGap}px;
			margin-right: ${!isEditor ? `${columnGap}px` : "0"};
			position: relative;
			box-sizing: border-box;
		}

		
		${
      isEditor && activeFilter !== "*"
        ? `
			${videoGallerySl} .videoGallery .galleryItem:not(${activeFilter}) {
				display: none;
			}
		`
        : ""
    }

		
		${
      !isEditor
        ? `
			${videoGallerySl} .videoGallery .galleryItem:nth-child(${colSettings.desktop}n) {
				margin-right: 0;
			}
		`
        : ""
    }

		${
      !isEditor
        ? `
			@media (max-width: 768px) {
				${videoGallerySl} .videoGallery .galleryItem {
					width: ${100 / (colSettings.tablet || 2)}%;
				}
			}
			@media (max-width: 576px) {
				${videoGallerySl} .videoGallery .galleryItem {
					width: ${100 / (colSettings.mobile || 1)}%;
				}
			}
		`
        : `
			@media (max-width: 768px) {
				${videoGallerySl} .videoGallery {
					grid-template-columns: repeat(${colSettings.tablet}, 1fr);
				}
			}
			@media (max-width: 576px) {
				${videoGallerySl} .videoGallery {
					grid-template-columns: repeat(${colSettings.mobile}, 1fr);
				}
			}
		`
    }

		.wp-block-vgb-video-gallery-block .galleryFigure img, .wp-block-vgb-video-gallery-block .react-thumbnail-generator img {
			object-fit: ${options.objectFit};
		}

		${videoSizeFit}{
			object-fit: ${options.objectFit};
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
