import React, { useEffect, useState } from "react";
import Stars from "../comman/Stars";
import { Link } from "react-router-dom";
import avgRating from "../../utils/avgRating";

const CourseCard = ({ info,allowWidth=false }) => {
  const [width,setWidth]=useState(window.innerWidth);
        useEffect(()=>{
          const handleResize=()=>{
            setWidth(window.innerWidth);
          }
          window.addEventListener('resize',handleResize);
          return ()=>{
            window.removeEventListener('resize',handleResize);
          }
        },[]);
  const [averageRating,setAverageRating]=useState(0);
  useEffect(()=>{
    const avRating=avgRating(info.ratingAndReviews);
    setAverageRating(avRating);
  },[info]);
  return (
    <Link to={`/course/${info._id}`} className="flex flex-col gap-2">
      <img style={{'max-width': allowWidth ? width > 766 ? '600px' : '371px' : '371px'}}  className={`rounded-lg`} src={info.thumbnail} alt="" />
      <p className="text-richblack-5 font-medium">{info.description}</p>
      <p className="text-richblack-300">{info.name}</p>
      <Stars rating={averageRating} />
      <span className="text-richblack-5 font-semibold">{info.price}</span>
    </Link>
  );
};

export default CourseCard;
