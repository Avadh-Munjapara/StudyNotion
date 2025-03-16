import React from 'react';

const SubmitBtn = ({text}) => {
    return (
        <button
          type="submit"
          className="bg-[#FFD60A] rounded-lg font-medium py-[6px] px-[18px]"
        >
          {text}
        </button>
    );
}

export default SubmitBtn;
