import React from "react";

const YellowBtn = ({ clickHandler, text, textColour, bgColour }) => {
  return (
    <button
      className={`rounded-lg font-medium cursor-pointer
       h-fit w-fit
        py-3 px-6 items-center flex gap-1 border border-[#2C333F]`}
      style={{
        color: textColour || "#000814",
        backgroundColor: bgColour || "#FFD60A",
      }}
      onClick={() => clickHandler()}
    >
      {text}
    </button>
  );
};

export default YellowBtn;
