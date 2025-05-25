import React, { useEffect,useState } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Label from "./Label";
import ReactStars from "react-stars";
import toast from "react-hot-toast";
import ErrorMessage from "./ErrorMessage";
import SubmitBtn from "./SubmitBtn";
import { addRating } from "../../services/operations/courseApi";
import { useParams } from "react-router-dom";
const ReviewModal = ({ modalRef, disappearHandler }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const user = useSelector((state) => state.profile.user);
  const params=useParams();
  const courseId=params.courseId;
    const [loading,setLoading]=useState(false);
    var rating = null;
    useOnClickOutside(modalRef, disappearHandler);
    const submitHandler = (data) => {
      if (rating === null) {
        toast.error("forget to give rating!");
        return;
      }
      addRating(rating, data.review,courseId,setLoading);
      
  };
  const ratingChangeHandler = (newRating) => {
    rating = newRating;
  };
  return (
    <div
      ref={modalRef}
      className="absolute flex justify-center items-center bg-richblack-900/80  z-20 h-full left-0 top-0 right-0"
    >
      <div className="flex flex-col">
        <h3 className="flex font-semibold text-richblack-5 justify-between items-center">
          Add Review{" "}
          <span className="cursor-pointer" onClick={disappearHandler}>
            {" "}
            <RxCross2 />
          </span>
        </h3>
        <div>
          <div>
            <div>
              <img src={user?.image} alt="profile picture" />
              <div>
                <p>
                  {user?.firstName} {user?.lastName}
                </p>
                <p>Posting Publicly </p>
              </div>
              <ReactStars onChange={ratingChangeHandler} />
            </div>

            <form onSubmit={handleSubmit(submitHandler)}>
              <Label
                text={"Add Your Experience"}
                required={true}
                forwhat={"review"}
              />
              <textarea
                {...register("review", {
                  required: {
                    value: true,
                    message: "your review is necessary",
                  },
                })}
                name="review"
                id="review"
              ></textarea>
              {errors.review && (
                <ErrorMessage message={errors.review.message} />
              )}

              <SubmitBtn text={"Save Edits"} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
