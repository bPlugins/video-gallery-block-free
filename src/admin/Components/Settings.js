import { useState } from "react";
import { __ } from "@wordpress/i18n";

const Settings = ({ deleteDataOnUninstall, uninstallNonce, adminUrl }) => {
  const [enabled, setEnabled] = useState(deleteDataOnUninstall);
  const [notice, setNotice] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = () => {
    const newValue = !enabled;

    // Show confirm dialog when enabling (destructive action)
    if (newValue) {
      const confirmed = window.confirm(
        __(
          "Are you sure? This will permanently delete all Video Gallery Block posts and settings when the plugin is uninstalled.",
          "video-gallery-block",
        ),
      );

      if (!confirmed) return;
    }

    setIsLoading(true);
    setNotice("");

    const formData = new FormData();
    formData.append("action", "vgbSaveUninstallOption");
    formData.append("nonce", uninstallNonce);
    formData.append("enabled", String(newValue));

    fetch(`${adminUrl}admin-ajax.php`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setEnabled(res.data.enabled);
          setNotice(res.data.message);
        } else {
          setNotice(
            res.data?.message ||
              __("Failed to save setting.", "video-gallery-block"),
          );
        }
      })
      .catch(() => {
        setNotice(
          __("Failed to save setting. Network error.", "video-gallery-block"),
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="bPlDashboardSettings bPlDashboardCard">
      <h2>{__("Delete Data on Uninstall", "video-gallery-block")}</h2>

      <p>
        {__(
          "When enabled, all plugin data will be permanently deleted when you uninstall (delete) the plugin. This includes:",
          "video-gallery-block",
        )}
      </p>

      <ul>
        <li>{__("All video gallery block posts", "video-gallery-block")}</li>
        <li>
          {__("All plugin settings and configurations", "video-gallery-block")}
        </li>
      </ul>

      <p className="settingsWarning">
        {__(
          "⚠️ This action cannot be undone. Your data will be safe if you only deactivate the plugin.",
          "video-gallery-block",
        )}
      </p>

      <div className="settingsControl">
        <label className="toggleControl">
          <input
            type="checkbox"
            checked={enabled}
            onChange={handleToggle}
            disabled={isLoading}
          />

          <span className="toggleSlider" />
        </label>

        <span className="toggleLabel">
          {enabled
            ? __("Data will be deleted on uninstall", "video-gallery-block")
            : __("Data will be preserved on uninstall", "video-gallery-block")}
        </span>
      </div>

      {notice && (
        <div className={`settingsNotice ${enabled ? "warning" : "success"}`}>
          {notice}
        </div>
      )}
    </div>
  );
};
export default Settings;
