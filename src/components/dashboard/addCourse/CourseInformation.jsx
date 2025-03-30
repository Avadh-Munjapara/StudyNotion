import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Label from "../../comman/Label";
import ErrorMessage from "../../comman/ErrorMessage";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { getAllCategory } from "../../../services/operations/CategoryApi";
import { setLoading } from "../../../slices/courseSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../comman/Spinner";
import Tags from "./Tags";
import ThumbnailUpload from "./ThumbnailUpload";
import InstructionsInput from "./InstructionsInput";
import { MdKeyboardArrowRight } from "react-icons/md";
import SubmitBtn from "../../comman/SubmitBtn";
import { createCourse } from "../../../services/operations/courseApi";
const CourseInformation = () => {
  const {
    register,
    setValue,
    getValue,
    watch,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const [categories, setCategories] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const loading = useSelector((state) => state.course.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategory(dispatch, setLoading);
        setCategories(response.data.categories);
      } catch (error) {
        console.log("error while fetching categories", error);
      }
    };
    fetchCategories();
  }, []);
  const submitHandler=async (data)=>{

    const formData=new FormData();
     formData.append('thumbnail',data.thumbnail[0]);
     formData.append('name',data.courseTitle);
     formData.append('description',data.courseDesc);
     formData.append('whatYouWillLearn',data.benefits);
     formData.append('price',data.price);
     formData.append('category',data.category);
     formData.append('tags',allTags);
     formData.append('instructions',instructions);
    if(!allTags.empty && instructions){
     dispatch(createCourse(formData,setLoading));
    }
  }
  const downHandler=(e)=>{
    if(e.key==='Enter'){
      e.preventDefault();
    }
  }
  return loading ? (
    <div>
      {" "}
      <Spinner />{" "}
    </div>
  ) : (
    <form onKeyDown={downHandler} onSubmit={handleSubmit(submitHandler)} className="ml-5 flex flex-col gap-5 bg-[#161D29] p-3">
      <div className="flex flex-col gap-1">
        <Label text={"Course Title"} forwhat={"courseTitle"} required={true} />
        <input
          className="field2"
          {...register("courseTitle", {
            required: { value: true, message: "course title is required" },
          })}
          placeholder="Enter Course Title"
          type="text"
          name="courseTitle"
          id="courseTitle"
        />
        {errors.courseTitle && (
        <ErrorMessage message={errors.courseTitle.message} />
      )}
      </div>
      

      <div className="flex flex-col gap-1">
        <Label
          text={"Course Short Description"}
          forwhat={"courseDesc"}
          required={true}
        />
        <textarea
          className="field2"
          rows={6}
          {...register("courseDesc", {
            required: {
              value: true,
              message: "Course Short Description is required",
            },
          })}
          placeholder="Enter Course Description"
          type="text"
          name="courseDesc"
          id="courseDesc"
        />
         {errors.courseDesc && (
        <ErrorMessage message={errors.courseDesc.message} />
      )}
      </div>
     

      <div className="flex flex-col gap-1">
        <Label text={"Price"} forwhat={"price"} required={true} />
        <div className="flex gap-1 items-center field2">
          <RiMoneyRupeeCircleLine className="text-[#585D69] text-3xl" />
          <input
            className="w-full outline-none bg-[#2C333F] text-[rgba(153,157,170,1)] pl-1"
            {...register("price", {
              required: { value: true, message: "Price is required" },
            })}
            placeholder="Enter Price"
            type="text"
            name="price"
            id="price"
          />
        </div>
      {errors.price && <ErrorMessage message={errors.price.message} />}
      </div>

      <div className="flex flex-col gap-1">
        <Label text={"Category"} forwhat={"category"} required={true} />
        <select {...register('category')} name="category" className="field2 cursor-pointer" id="category">
          {categories?.map((item, index) => (
            <option key={index} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      {errors.category && <ErrorMessage message={errors.category.message} />}
      </div>

      <Tags register={register} allTags={allTags} getValues={getValues} setAllTags={setAllTags} watch={watch} errors={errors}/>
      <ThumbnailUpload watch={watch} register={register} erros={errors}/>

      <div className="flex flex-col gap-1">
        <Label
          text={"Benefits of the Course"}
          forwhat={"benefits"}
          required={true}
        />
        <textarea
          className="field2"
          rows={6}
          {...register("benefits", {
            required: {
              value: true,
              message: "Course benefits are required",
            },
          })}
          placeholder="Enter Course benefits"
          type="text"
          name="benefits"
          id="benefits"
        />
      {errors.benefits && (
        <ErrorMessage message={errors.benefits.message} />
      )}
      </div>

      <InstructionsInput instructions={instructions} watch={watch} setInstructions={setInstructions} register={register} errors={errors}/>
   <div className="self-end">
   <SubmitBtn text={<>Next <MdKeyboardArrowRight /> </>}/>

   </div>
    </form> 
  );
};

export default CourseInformation;
