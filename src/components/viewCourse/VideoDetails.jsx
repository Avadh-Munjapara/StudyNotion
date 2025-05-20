import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Player } from "video-react";
import "video-react/dist/video-react.css"; // import css
const VideoDetails = () => {
  const videoRef = useRef(null);
  const params = useParams();
  const subSectionId = params.subSectionId;
  const sectionId=params.sectionId;
  const courseId=params.courseId;
  const sectionData = useSelector((state) => state.viewCourse.sectionData);
  const sectionIndex=sectionData.findIndex((section)=>section._id===sectionId);
  const subSectionIndex=sectionData[sectionIndex].subSections.findIndex((subSection)=>subSection._id===subSectionId);
//   const subSection = sectionData[
//     sectionData?.findIndex((section) =>
//       section?.subSections?.some(
//         (subSection) => subSection._id === subSectionId
//       )
//     )
//   ]?.subSections?.filter((subSection) => subSection?._id === subSectionId)[0];
const navigate=useNavigate();
const sectionLength=sectionData.length;
const lecturesLength=sectionData[sectionIndex].subSections.length;

const subSection=sectionData[sectionIndex].subSections[subSectionIndex];

  const isFirstVideo=()=>{
    return sectionData[0].subSections[0]._id===subSectionId;
  }

  const isLastVideo=()=>{
    return sectionData[sectionLength-1].subSections[(sectionData[sectionLength-1].subSections.length)-1]._id===subSectionId;
  }

  const nextVideo=()=>{
    if(sectionData[sectionIndex].subSections[lecturesLength-1]._id===subSectionId){
        navigate(`/view-course/${courseId}/sectionId/${sectionData[sectionIndex+1]}/sub-sectionId/${sectionData[sectionIndex+1].subSections[0]._id}`);
    }else{
        navigate(`/view-course/${courseId}/sectionId/${sectionData[sectionIndex]}/sub-sectionId/${sectionData[sectionIndex].subSections[subSectionIndex+1]._id}`);
    }
  }

  const previousVideo=()=>{
  if(sectionData[sectionIndex].subSections[0]._id===subSectionId){
        navigate(`/view-course/${courseId}/sectionId/${sectionData[sectionIndex-1]}/sub-sectionId/${sectionData[sectionIndex-1].subSections[(sectionData[sectionIndex-1].subSections.length)-1]._id}`);
    }else{
        navigate(`/view-course/${courseId}/sectionId/${sectionData[sectionIndex]}/sub-sectionId/${sectionData[sectionIndex].subSections[subSectionIndex-1]._id}`);
    }
  }

  const videoEndHandler=()=>{
    console.log(isFirstVideo());
    console.log(isLastVideo());
  }

  return (
    <div className="w-full">
      <Player onEnded={videoEndHandler} ref={videoRef}>   
        <source src={subSection?.videoUrl} />
      </Player>
    </div>
  );
};

export default VideoDetails;
