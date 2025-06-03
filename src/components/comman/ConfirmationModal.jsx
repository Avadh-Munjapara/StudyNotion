import React from 'react';

const ConfirmationModal = ({heading,modalRef,btn1Text,btn2Text,btn1Handler,btn2Handler}) => {
    return (
        <>
        <div className=" z-20 w-[100vw] absolute min-h-screen bg-white/10 top-0 left-0 bottom-0 right-0 backdrop-blur-sm "></div>
        <div
          ref={modalRef}
          className="text-white fixed top-[16rem] left-[35%] font-medium w-fit border-white/70
           shadow-[10px_10px_10px_rgba(0,0,0,1)] border-[1px] z-30
          bg-richblack-800 h-fit px-10 rounded-md py-6 gap-3  flex   flex-col justify-center items-center "
        >
          <h2 className="text-lg">
          Do you Really want to{" "}
          <span className="text-red-600 font-semibold">{btn2Text}</span>
          {" "}
          {heading && heading}?
          </h2>
          <div className="flex gap-3">
            <button
            onClick={btn1Handler}
              className="px-4 py-2 border-[1px] border-white font-semibold text-black bg-yellow-200 rounded-md"
            >
              {btn1Text}
            </button>
            <button
              onClick={btn2Handler}
              className="px-4 py-2 border-[1px] border-white font-semibold text-black bg-richblack-300 rounded-md"
            >
              {btn2Text}
            </button>
          </div>
        </div>
      </>
    );
}

export default ConfirmationModal;
