/**
 * Strips any literal "<" from a CSS string before it is injected into a
 * <style> tag via dangerouslySetInnerHTML.
 *
 * The CSS strings these Style.js components build are assembled from
 * block attribute values (colors, sizes, etc.) via bpl-tools/utils/getCSS.js
 * helpers, which don't escape their output. A saved attribute value
 * containing "</style>" would otherwise close the style tag early and let
 * the rest of the value inject a live <script>. CSS never legitimately
 * needs "<", so stripping it entirely is safe and keeps all valid styling
 * intact.
 */
export const sanitizeStyleTag = (css) => String(css ?? '').replace(/</g, '');
export default sanitizeStyleTag;
