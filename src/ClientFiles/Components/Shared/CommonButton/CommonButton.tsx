import React from "react";
import "./CommonButton.css"

const CommonButton = ({ value }: { value: { text: String } }) => {
  const { text } = value;
  return (
    <button
    className="common-btn"
      style={{
        backgroundImage:
          "-webkit-linear-gradient(169deg, #5560ff 17%, #aa52a1 63%, #ff4343 100%)",
        padding: "4px 10px !important",
        borderRadius: "8px",
        fontWeight: "bold",
      }}
    >
      {text}
    </button>
  );
};

export default CommonButton;
