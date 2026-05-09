import { produce } from "immer";
import { BControlPro } from "../../../../../bpl-tools/ProControls";
import { Device, Label } from "../../../../../bpl-tools/Components";
import { PanelRow } from "@wordpress/components";

export const updateData = (attr, value, ...props) => {
  if (props.length === 0) {
    return value;
  }
  const [currentProp, ...remainingProps] = props;
  if (remainingProps.length === 0) {
    return produce(attr, (draft) => {
      draft[currentProp] = value;
    });
  }
  return produce(attr, (draft) => {
    if (!Object.prototype.hasOwnProperty.call(draft, currentProp)) {
      draft[currentProp] = {};
    }
    draft[currentProp] = updateData(
      draft[currentProp],
      value,
      ...remainingProps,
    );
  });
};

/**
 * Higher-Order Function to create an onChange handler that caps '%' values at 100
 * and handles nested attribute updates via updateData.
 * @param {function} setAttributes The block's setAttributes function.
 * @param {string} attributeKey The key on the 'items' object to update (e.g., 'height', 'navigation').
 * @param {object} items The current value of the block's 'items' attribute.
 * @param {Array<string>} [path=[]] Optional array representing the nested path (e.g., ['size', 'desktop']).
 * @returns {function} The validated onChange handler for the UnitControl.
 */
export const limitPercentageTo100 =
  (setAttributes, attributeKey, items, path = []) =>
  (val) => {
    // --- 1. Validation Logic ---
    const unitMatch = val.match(/([0-9.]+)(px|%|em|rem|vw|vh)/);
    let finalValue = val;

    if (unitMatch) {
      const numericValue = parseFloat(unitMatch[1]);
      const unit = unitMatch[2];

      // Cap the value at 100% and floor at 0% only if the unit is percentage.
      if (unit === "%") {
        if (numericValue > 100) {
          finalValue = "100%";
        } else if (numericValue < 0) {
          finalValue = "0%";
        }
      }
    }

    // --- 2. Update Logic ---
    // This spreads the arguments: [items, finalValue, attributeKey, ...path]
    const updateArgs = [items, finalValue, attributeKey, ...path];

    // Call setAttributes with the validated/capped value
    setAttributes({
      items: updateData(...updateArgs),
    });
  };

/**
 * Centralized module for managing free/premium field configurations and rendering controls.
 *
 * This module handles:
 * - Dynamic management of 'freeFields': An array of field labels (e.g., "title") that should render as free controls.
 * - Rendering logic for controls: Determines if a field is free (uses base Component) or premium (uses BControlPro wrapper).
 *
 * Usage:
 * - Call setFreeFields([...]) to update free fields dynamically (e.g., based on user role or config).
 * - Use renderComponentControl(...) to render a control, passing 'label' to auto-detect free/premium.
 *
 * Note: Field labels are normalized to lowercase for case-insensitive matching.
 * Hover over functions for more details (JSDoc supported in most IDEs like VS Code).
 */
let freeFields; // Default free fields; can be updated dynamically

/**
 * Retrieves the current list of free field labels.
 *
 * @returns {string[]} The array of free field labels (normalized to lowercase).
 */
export const getFreeFields = () => freeFields;

/**
 * Updates the list of free field labels dynamically.
 *
 * This allows runtime configuration, e.g., enabling more fields for premium users.
 * Fields are normalized to lowercase for consistent comparison.
 *
 * @param {string[]} newFields - Array of field labels to set as free (e.g., ["title", "description"]).
 * @returns {boolean} True if updated successfully, false otherwise (e.g., invalid input).
 *
 * Example:
 * @param {string[]} setFreeFields - (["title", "customField"]); // Updates free fields
 */
export const setFreeFields = (newFields) => {
  if (Array.isArray(newFields)) {
    freeFields = newFields.map((field) => field.toLowerCase());
    return true;
  } else {
    console.warn("setFreeFields expects an array of field names");
    return false;
  }
};

/**
 * Renders a control component, dynamically choosing between free and premium versions based on the label.
 *
 * - If the label is in freeFields: Renders the base <Component /> (free version).
 * - Otherwise: Wraps in <BControlPro /> (premium version).
 *
 * Supports device-responsive mode via isDeviceControl flag.
 *
 * @param {Object} params - Configuration object for the control.
 * @param {string} params.label - The field label (e.g., "title"). Used to check if free or premium.
 * @param {*} params.value - Current value of the control.
 * @param {Function} params.onChange - onChange handler for the control.
 * @param {React.Component} params.Component - The base React component to render (e.g., Input, Select).
 * @param {string} [params.units] - Units for the control (e.g., "px", "%").
 * @param {string} [params.className] - CSS class for the control or wrapper.
 * @param {string} [params.placeholder=""] - Placeholder values (into __() for i18n).
 * @param {string[]} [params.types=[""] - Control types (wrapped in array).
 * @param {string} [params.labelPosition="left"] - Position of the label (e.g., "left", "top").
 * @param {*} [params.defaults] - Default values (passed to inner controls, e.g., in device mode).
 * @param {boolean} [params.isDeviceControl=false] - If true, renders with <PanelRow> and <Device /> for responsive controls.
 * @param {...props} props - Additional props spread to the rendered component.
 *
 * @returns {React.Element} The rendered control (free or premium, standard or device-responsive).
 *
 * Example:
 * renderComponentControl({
 *   label: "title",
 *   value: "My Title",
 *   onChange: handleChange,
 *   Component: InputComponent,
 *   isDeviceControl: true
 * });
 *
 * @param {string[]} newFields - Array of field labels to set as free (e.g., ["title", "description"]).
 * @param {string[]} setFreeFields - (["title", "customField"]); // Updates free fields
 * @returns {boolean} True if updated successfully, false otherwise (e.g., invalid input).
 *
 * @returns {React.Element}
 *
 * Example:
 * import and use for free fields: setFreeFields(["title", "customField"]);
 *
 */
export const renderComponentControl = ({
  label,
  value,
  onChange,
  Component,
  units,
  className,
  placeholder = "",
  types = "",
  labelPosition = "left",
  defaults,
  isDeviceControl = false,
  ...props
}) => {
  // Retrieve current free fields and check if this label is free (case-insensitive)
  const freeFields = getFreeFields();
  const normalizedLabel = label?.toLowerCase();
  const isFree = freeFields?.includes(normalizedLabel);

  /**
   * Internal helper to render the core control (free or premium).
   *
   * Conditionally hides label/className in device mode if needed (based on original logic).
   *
   * @returns {React.Element} The base control element.
   */
  const renderControl = () => {
    if (!isFree) {
      // Premium version: Use BControlPro wrapper
      return (
        <BControlPro
          className={isDeviceControl ? "" : className} // Hide className in device mode if applicable
          label={isDeviceControl ? "" : label} // Hide label in device mode wrapper
          value={value}
          onChange={onChange}
          labelPosition={labelPosition}
          units={units}
          defaults={defaults}
          Component={Component}
          types={[types]} // Wrap types in array as per original
          {...props}
        />
      );
    }

    // Free version: Use base Component directly
    return (
      <Component
        className={isDeviceControl ? "" : className} // Hide className in device mode if applicable
        label={isDeviceControl ? "" : label} // Hide label in device mode
        value={value}
        onChange={onChange}
        labelPosition={labelPosition}
        units={units}
        defaults={defaults}
        placeholder={placeholder} // Spread and translate placeholder
        types={[types]} // Wrap types in array as per original
        {...props}
      />
    );
  };

  // If device-responsive mode: Wrap with PanelRow, Label, and Device selector
  if (isDeviceControl) {
    return (
      <>
        {/* Header row for device selector */}
        <PanelRow className={className}>
          <Label className="">{label}</Label>
          <Device />
        </PanelRow>
        {/* Render the core control below the header */}
        {renderControl()}
      </>
    );
  }

  // Standard mode: Return the core control directly
  return renderControl();
};

export const premiumBlocks = [
  "vgblk/lightbox-video-gallery",
  "vgblk/masonry-video-grid-one",
  "vgblk/parallax-row-video-gallery",
  "vgblk/slider-autoplay-video",
  "vgblk/video-carousel-gallery",
  "vgblk/video-playlist-gallery",
  "vgblk/video-testimonial-section",
  "vgblk/video-slider",
];

export const isBlockEnabled = (name) => {
  const isPremium = vgbpipecheck;
  const disabledBlocks = vgbDisabledBlocks || [];
  const checkProBlock = premiumBlocks.includes(name);
  if (!isPremium && checkProBlock) {
    return false;
  }
  return !disabledBlocks.includes(name);
};
