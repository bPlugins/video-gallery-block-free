import { useState } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Demos from "../../../../bpl-tools/Admin/Demos";
import Pricing from "../../../../bpl-tools/Admin/Pricing";
import FeatureCompare from "../../../../bpl-tools/Admin/FeatureCompare";
import Activation from "../../../../bpl-tools/Admin/Activation";
import OurPlugins from "../../../../bpl-tools/Admin/OurPlugins";
import Blocks from "../../../../bpl-tools/Admin/Blocks";
import Layout from "./Layout";
import Welcome from "./Welcome";
import Settings from "./Settings";
import { demoInfo, pricingInfo } from "../utils/data";

const App = (props) => {
  const {
    isPremium,
    hasPro,
    disabledBlocks: initialDisabledBlocks,
    disabledBlocksNonce,
    adminUrl,
  } = props;

  const [disabledBlocks, setDisabledBlocks] = useState(
    initialDisabledBlocks || [],
  );
  const [status, setStatus] = useState("");

  const handleBlocksChange = (updatedBlocks) => {
    setDisabledBlocks(updatedBlocks);
    setStatus("loading");

    const formData = new FormData();
    formData.append("action", "vgb_disabled_blocks");
    formData.append("_wpnonce", disabledBlocksNonce);
    formData.append("data", JSON.stringify(updatedBlocks));

    fetch(`${adminUrl}admin-ajax.php`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStatus("success");
        } else {
          setStatus("error");
        }
      })
      .catch(() => {
        setStatus("error");
      });
  };

  const appProps = {
    ...props,
    disabledBlocks,
    status,
    onChange: handleBlocksChange,
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout {...appProps} />}>
          <Route index element={<Welcome {...appProps} />} />
          <Route path="welcome" element={<Welcome {...appProps} />} />
          <Route
            path="demos"
            element={<Demos demoInfo={demoInfo} {...appProps} />}
          />
          {!isPremium && (
            <Route
              path="pricing"
              element={
                <Pricing pricingInfo={pricingInfo} options={{}} {...appProps} />
              }
            />
          )}
          {!isPremium && (
            <Route
              path="feature-comparison"
              element={<FeatureCompare plans={["free", "pro"]} {...appProps} />}
            />
          )}
          {hasPro && (
            <Route path="activation" element={<Activation {...appProps} />} />
          )}

          <Route path="blocks" element={<Blocks {...appProps} />} />

          <Route path="our-plugins" element={<OurPlugins {...appProps} />} />
          <Route path="settings" element={<Settings {...appProps} />} />
          <Route path="*" element={<Navigate to="/welcome" replace />} />
        </Route>
      </Routes>
    </Router>
  );
};
export default App;
