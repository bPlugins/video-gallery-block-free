import {
  getBackgroundCSS,
  getBorderCSS,
  getColorsCSS,
  getMultiShadowCSS,
  getSpaceCSS,
  getTypoCSS,
} from "../../../../../../bpl-tools/utils/getCSS";

import { prefix } from "../../utils/data";

const Style = ({ attributes, id, itemWidth, isEditor }) => {
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

  const colSettings = typeof columns === "number"
    ? { desktop: columns, tablet: Math.max(1, columns - 1), mobile: 1 }
    : { ...{ desktop: 3, tablet: 2, mobile: 1 }, ...columns };

  const videoGallerySl = `#${id} .${prefix}`;
  const buttonSl = `${videoGallerySl} .filter button`;
  const fancyMainSl = `.${id}-fancyBox`;
  const itemCaption = `${videoGallerySl} .videoGallery .galleryItemCaption`;
  const lightBoxCaption = `.vgbFancyBox .has-caption .f-caption`;
  const videoSizeFit = `.vgbFancyBox .fancybox__carousel .fancybox__slide .f-html5video`;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
		${getTypoCSS("", filterBtnTypo)?.googleFontLink}
		${getTypoCSS("", styles?.caption?.typography)?.googleFontLink}
		${getTypoCSS("", styles?.lightBoxCaption?.typography)?.googleFontLink}

		${getTypoCSS(buttonSl, filterBtnTypo)?.styles}
		${getTypoCSS(itemCaption, styles?.caption?.typography)?.styles}
		${getTypoCSS(lightBoxCaption, styles?.lightBoxCaption?.typography)?.styles}
		
		${itemCaption}{
			${getColorsCSS(styles?.caption?.colors)}
			padding: ${getSpaceCSS(styles?.caption?.padding)};
		}
		
		${lightBoxCaption}{
			${getColorsCSS(styles?.lightBoxCaption?.colors)}
			padding: ${getSpaceCSS(styles?.lightBoxCaption?.padding)};
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
			width: ${isEditor ? "100%" : (itemWidth ? `${itemWidth}px` : `${100 / (colSettings.desktop || 3)}%`)};
			height: ${itemHeight};
			margin-bottom: ${rowGap}px;
			margin-right: ${!isEditor ? `${columnGap}px` : "0"};
			position: relative;
			box-sizing: border-box;
		}

		/* Remove margin from last item in row on frontend */
		${!isEditor ? `
			${videoGallerySl} .videoGallery .galleryItem:nth-child(${colSettings.desktop}n) {
				margin-right: 0;
			}
		` : ""}

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
