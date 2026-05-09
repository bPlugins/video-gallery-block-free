import {
  getBackgroundCSS,
  getBorderCSS,
  getColorsCSS,
  getMultiShadowCSS,
  getSpaceCSS,
  getTypoCSS,
} from "../../../../../../bpl-tools/utils/getCSS";

import { prefix } from "../../utils/data";

const Style = ({ attributes, id, itemWidth }) => {
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
  } = attributes;

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
		${buttonSl}{
			${getColorsCSS(filterBtnColors)}
		}
		${buttonSl}:hover,
		${buttonSl}.current{
			${getColorsCSS(filterBtnHoverColors)}
		}
		${videoGallerySl} .vgbColumnSizer {
			grid-column-gap: ${columnGap}px;
		}
		${videoGallerySl} .videoGallery .galleryItem{
			width: ${itemWidth}px;
			height: ${itemHeight};
			margin-bottom: ${rowGap}px;
		}

		.wp-block-vgb-video-gallery .galleryFigure img, .wp-block-vgb-video-gallery .react-thumbnail-generator img {
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
