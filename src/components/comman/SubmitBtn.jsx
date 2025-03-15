import React from 'react';

const SubmitBtn = ({text}) => {
    return (
        <button
          type="submit"
          className="bg-[#FFD60A] mt-5 self-end rounded-lg font-medium p-3"
        >
          {text}
        </button>
    );
}

export default SubmitBtn;
