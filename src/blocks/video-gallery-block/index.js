import { registerBlockType } from "@wordpress/blocks";
import "./editor.scss";
import metadata from "./block.json";
import Edit from "./Components/Backend/Edit";
import { videoGalleryIcon } from "../../Components/Common/utils/icons";

registerBlockType(metadata, {
  icon: videoGalleryIcon,
  // Build in Functions
  edit: Edit,
  save: () => null,
});
