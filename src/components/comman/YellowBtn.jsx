import React from "react";

const YellowBtn = ({clickHandler,text}) => {
  return (
    <button
      className="rounded-lg font-medium text-[#000814] h-fit bg-[#FFD60A] py-3 px-6 items-center flex gap-2 border border-[#2C333F]"
      onClick={() => clickHandler()}
    >
      {text}
    </button>
  );
};

export default YellowBtn;
