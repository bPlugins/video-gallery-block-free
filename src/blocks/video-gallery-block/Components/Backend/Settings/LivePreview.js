import { useRef, useState } from "@wordpress/element";
import { Button, Popover } from "@wordpress/components";
import CheckProVersion from "../../../../../Components/CheckProVersion";

const LivePreview = (props) => {
  const { isPremium } = props;
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef();
  const togglePreview = () => setIsVisible(!isVisible);

  return (
    <>
      {!isPremium && (
        <Button
          style={{
            padding: "6px 12px",
            height: "36px",
            backgroundColor: "#146ef5",
            color: "#fff",
            borderRadius: "2px",
            fontWeight: "bold",
          }}
          ref={buttonRef}
          onClick={togglePreview}>
          Check Pro Version
        </Button>
      )}

      {isVisible && (
        <Popover
          anchor={buttonRef.current}
          placement="bottom-start"
          offset={8}
          noArrow={false}>
          <div
            className="bplg-popover-container"
            style={{
              width: "min(700px, 95vw)",
              maxHeight: "80vh",
              overflow: "auto",
              boxSizing: "border-box",
            }}>
            <CheckProVersion />
          </div>
        </Popover>
      )}
    </>
  );
};

export default LivePreview;
