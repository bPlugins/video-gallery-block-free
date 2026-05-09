import { useEffect, useState } from "react";
import useWPAjax from "../../../../bpl-tools/hooks/useWPAjax";

const useBlocksSettings = (action, nonce) => {
  const [internalStatus, setInternalStatus] = useState(null);

  const {
    data = [],
    saveData,
    refetch,
    isLoading,
  } = useWPAjax(action, { _wpnonce: nonce }, true);

  useEffect(() => {
    if (nonce && action) {
      refetch();
    }
  }, [nonce, action]);

  useEffect(() => {
    if (!isLoading && data) {
      setInternalStatus("");
    }
  }, [data, isLoading]);

  const saveToBackend = async (updatedBlocksName) => {
    try {
      setInternalStatus("loading");

      const response = await saveData({
        _wpnonce: nonce,
        data: JSON.stringify(updatedBlocksName),
      });

      setInternalStatus("success");
      return response;
    } catch (error) {
      console.error("Save failed:", error);
      setInternalStatus("error");
    }
  };

  return {
    data,
    internalStatus,
    saveToBackend,
    isLoading,
  };
};

export default useBlocksSettings;
