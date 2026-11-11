import { __experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon } from "@wordpress/components";
import { justifyLeft, justifyCenter, justifyRight, justifyStretch } from "@wordpress/icons";

/**
 * Alignment choices as icons, like WordPress's own alignment buttons. The
 * label stays: it is the tooltip and what screen readers say.
 */
const ICONS = {
  left: justifyLeft,
  start: justifyLeft,
  center: justifyCenter,
  right: justifyRight,
  end: justifyRight,
  full: justifyStretch,
};

/**
 * @param {Object} props
 * @param {Array}  props.options [{ value, label }], value one of left/start, center, right/end, full.
 */
const AlignOptions = ({ options }) =>
  options.map((option) => (
    <ToggleGroupControlOptionIcon
      key={option.value}
      value={option.value}
      icon={ICONS[option.value]}
      label={option.label}
    />
  ));

export default AlignOptions;
