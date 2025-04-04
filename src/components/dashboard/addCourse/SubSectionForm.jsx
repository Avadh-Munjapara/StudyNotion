import React from "react";
import { ImCross } from "react-icons/im";
import Label from "../../comman/Label";
import ImViUpload from "./ImViUpload";
import { useForm } from "react-hook-form";
import useFilePreview from "../../../hooks/useFilePreview";
import ErrorMessage from "../../comman/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import SubmitBtn from "../../comman/SubmitBtn";
import { createsubsection } from "../../../services/operations/courseApi";
const SubSectionForm = ({
  ref,
  sectionIndex,
  removeForm,
  create = false,
  view = false,
  edit = false,
  dele = false,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch=useDispatch();
  const file = watch("video");
  const [videoPreview, setVideoPreview] = useFilePreview(file);
  const courseInfo=useSelector((state)=>state.course.courseInfo);
  const submitHanlder=(data)=>{
    if(create){
        console.log(data);
        const formData=new FormData();
        formData.append("videoFile",data.video[0]);
        formData.append("title",data.title);
        formData.append("description",data.description);
        formData.append("sectionId",courseInfo.courseContent[sectionIndex]._id);
        dispatch(createsubsection(formData,courseInfo,sectionIndex));
    }    
}
  return (
    <div ref={ref} className="">
      <div className="flex py-6 px-4 justify-between items-center bg-richblack-700 rounded-lg border border-richblack-600">
        <h2 className="text-white">
          {create
            ? "Create Lecture"
            : view
            ? "View Lecture"
            : edit
            ? "Edit Lecture"
            : dele
            ? "Delete Lecture"
            : null}
        </h2>
        <button>
          <ImCross className="text-richblack-50" onClick={removeForm} />
        </button>
      </div>
      <div className="bg-richblack-800 p-8">
        <form onSubmit={handleSubmit(submitHanlder)} className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <Label text={"Video Lecture"} required={true} />
            {videoPreview || courseInfo.courseContent[sectionIndex] ? (
              <video src={videoPreview}> </video>
            ) : (
              <ImViUpload forwhat={"video"} />
            )}
            {videoPreview ? (
              <button>
                <label htmlFor="video">select other video</label>
              </button>
            ) : null}
            <input
              {...register("video")}
              className="hidden"
              type="file"
              id="video"
              name="video"
            />
          </div>

            <div className="flex flex-col gap-1">
                <Label text={'Lecture Title'} required={true}/>
                <input {...register("title",{required:{value:true,message:"the lecture title is required"}})} className="field2" type="text" name="title" id="title" />
                {
                    errors.title && <ErrorMessage message={errors.title.message}/>
                }
            </div>

            <div className="flex flex-col gap-1">
                <Label text={'Lecture Description'} required={true}/>
                <input {...register("description",{required:{value:true,message:"the lecture description is required"}})} className="field2"  type="text" name="description" id="description" />
                {
                    errors.description && <ErrorMessage message={errors.description.message}/>
                }
            </div>

            <SubmitBtn text={create?'Create':edit?'Save Edits':null}/>     
            
           
        </form>
      </div>
    </div>
  );
};

export default SubSectionForm;
