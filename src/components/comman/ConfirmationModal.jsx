import React from 'react';

const ConfirmationModal = ({heading,modalRef,btn1Text,btn2Text,btn1Handler,btn2Handler}) => {
    return (
        <>
        <div className=" z-20 w-full h-full  bg-white/10 top-0 absolute backdrop-blur-sm "></div>
        <div
          ref={modalRef}
          className="text-white border-white border-[1px] z-30 bg-richblack-800 h-fit px-6 rounded-md py-4 gap-3  flex  absolute  left-[40%] top-[45%] flex-col justify-center items-center "
        >
          <h2 className="text-lg">
           {heading}
          </h2>
          <div className="flex gap-3">
            <button
            onClick={btn1Handler}
              className="px-2 py-1 bg-yellow-200 rounded-md"
            >
              {btn1Text}
            </button>
            <button
              onClick={btn2Handler}
              className="px-2 py-1 bg-red-600 rounded-md"
            >
              {btn2Text}
            </button>
          </div>
        </div>
      </>
    );
}

export default ConfirmationModal;
