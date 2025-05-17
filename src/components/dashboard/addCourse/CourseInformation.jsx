import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Label from "../../comman/Label";
import ErrorMessage from "../../comman/ErrorMessage";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { getAllCategory } from "../../../services/operations/CategoryApi";
import { setCourseInfo,setEditCourse, setLoading, setStep } from "../../../slices/courseSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../comman/Spinner";
import Tags from "./Tags";
import ThumbnailUpload from "./ThumbnailUpload";
import InstructionsInput from "./InstructionsInput";
import { MdKeyboardArrowRight } from "react-icons/md";
import SubmitBtn from "../../comman/SubmitBtn";
import toast from "react-hot-toast";
import { createCourse } from "../../../services/operations/courseApi";
import { editCourseDetails } from "../../../services/operations/courseApi";
import YellowBtn from "../../comman/YellowBtn";
const CourseInformation = () => {
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm();
  const [categories, setCategories] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const loading = useSelector((state) => state.course.loading);
  const courseInfo = useSelector((state) => state.course.courseInfo);
  const thumnailPreview = courseInfo?.thumbnail;
  const editCourse = useSelector((state) => state.course.editCourse);
  const dispatch = useDispatch();
  const thumbanil = watch("thumbnail");

  // useEffect(()=>{
  //   return ()=>{
  //     dispatch(setCourseInfo(null));
  //     dispatch(setStep(1));
  //     }
  // })

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

  useEffect(() => {
    if (editCourse && courseInfo) {
      setValue("courseTitle", courseInfo.name);
      setValue("courseDesc", courseInfo.description);
      setValue("benefits", courseInfo.whatYouWillLearn);
      setValue("price", courseInfo.price);
      setValue("category", courseInfo.category.name);
      setAllTags([...courseInfo.tag]);
      setInstructions([...courseInfo.instructions]);
    }else{
      reset();
      const newArray=[];
      setAllTags(newArray);
      setInstructions(newArray);
    }
  }, [editCourse,courseInfo]);

  useEffect(()=>{
    return ()=>{
      setCourseInfo(null);
      setStep(1);
        setEditCourse(false);
    }
  })

  const isFormUpdated = () => {
    if (
      getValues("courseTitle") != courseInfo.name ||
      getValues("courseDesc") != courseInfo.description ||
      getValues("price") != courseInfo.price ||
      getValues("category") != courseInfo.category.name ||
      getValues("benefits") != courseInfo.whatYouWillLearn
    ) {
      return true;
    }
    if (!compareArrays(allTags, courseInfo.tag)) {
      return true;
    }
    if (!compareArrays(instructions, courseInfo.instructions)) {
      return true;
    }
    if (thumbanil[0]) return true;
    return false;
  };

  const compareArrays = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    return arr1.every((item, index) => item === arr2[index]);
  };

  const submitHandler = async (data) => {
    if (!editCourse) {
      if (
        allTags.length === 0 ||
        instructions.length === 0 ||
        !data.thumbnail[0]
      ) {
        console.log("executed1");

        if (allTags.length === 0) {
          toast.error("please add at least one tag");
        } else if (instructions.length === 0) {
          toast.error("please add at least one instruction");
        } else if (!data.thumbnail[0]) {
          toast.error("please upload thumbnail");
        }
      } else {
        const newCourseInfo = {
          name: data.courseTitle,
          description: data.courseDesc,
          whatYouWillLearn: data.benefits,
          price: data.price,
          category: data.category,
          tag: allTags,
          instructions: instructions,
          thumbnail: URL.createObjectURL(data.thumbnail[0]),
        };
        const formData = new FormData();
        formData.append("thumbnail", data.thumbnail[0]);
        formData.append("name", data.courseTitle);
        formData.append("description", data.courseDesc);
        formData.append("whatYouWillLearn", data.benefits);
        formData.append("price", data.price);
        formData.append("category", data.category);
        formData.append("tags", allTags);
        formData.append("instructions", instructions);
        dispatch(createCourse(formData, courseInfo, setLoading));
      }
    } else {
      if (allTags.length === 0) {
        toast.error("please add at least one tag");
        return;
      } else if (instructions.length === 0) {
        toast.error("please add at least one instruction");
        return;
      }
      if (!isFormUpdated()) {
        toast.error("no changes made in the form");
      } else {
        const formData = new FormData();
        if (data?.thumbnail[0]) {
          formData.append("thumbnail", data.thumbnail[0]);
        }
        data.courseTitle != courseInfo.name &&
          formData.append("name", data.courseTitle);
        data.courseDesc != courseInfo.description &&
          formData.append("description", data.courseDesc);
        data.benefits != courseInfo.whatYouWillLearn &&
          formData.append("whatYouWillLearn", data.benefits);
        data.price != courseInfo.price && formData.append("price", data.price);
        data.category != courseInfo.category &&
          formData.append("category", data.category);
       if(!compareArrays(allTags, courseInfo.tag)) 
          allTags.forEach((item) => {
            formData.append("tags", item);
          });
        if(!compareArrays(instructions, courseInfo.instructions))
          instructions.forEach((item) => {
            formData.append("instructions", item);
          });
        formData.append("courseId", courseInfo._id);
        const updCourse = {
          ...courseInfo,
          name: data.courseTitle,
          description: data.courseDesc,
          whatYouWillLearn: data.benefits,
          price: data.price,
          category: data.category,
          tag: allTags,
          instructions: instructions,
          thumbnail: data.thumbnail[0]
            ? URL.createObjectURL(data.thumbnail[0])
            : thumnailPreview,
        };
        dispatch(editCourseDetails(formData, updCourse, setLoading));
      }
    }
  };
  const downHandler = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };
  return loading  ? (
    <div className="flex h-full w-full justify-center items-center">
      {" "}
      <Spinner />{" "}
    </div>
  ) : (
    <form
      onKeyDown={downHandler}
      onSubmit={handleSubmit(submitHandler)}
      className="ml-5 flex rounded-lg border border-richblack-700 flex-col gap-5 bg-[#161D29] p-6"
    >
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
        <select
          {...register("category")}
          name="category"
          className="field2 cursor-pointer"
          id="category"
        >
          {categories?.map((item, index) =>
            item.name === courseInfo?.category ? (
              <option key={index} value={item.name} selected>
                {item.name}
              </option>
            ) : (
              <option key={index} value={item.name}>
                {item.name}
              </option>
            )
          )}
        </select>
        {errors.category && <ErrorMessage message={errors.category.message} />}
      </div>

      <Tags
      setValue={setValue}
        register={register}
        allTags={allTags}
        getValues={getValues}
        setAllTags={setAllTags}
        watch={watch}
        errors={errors}
      />
      <ThumbnailUpload watch={watch} register={register} erros={errors} />

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
        {errors.benefits && <ErrorMessage message={errors.benefits.message} />}
      </div>

      <InstructionsInput
      setValue={setValue}
        instructions={instructions}
        watch={watch}
        setInstructions={setInstructions}
        register={register}
        errors={errors}
      />
      <div className="self-end flex gap-2">
        <SubmitBtn
          text={
            <>
              {editCourse ? (
                "Save changes"
              ) : (
                <>
                  {" "}
                  Next <MdKeyboardArrowRight />
                </>
              )}
            </>
          }
        />
        {editCourse && (
          <YellowBtn 
          textColour={'#000814'}
          bgColour={'#C5C7D4'}
            text={"Continue without saving"}
            clickHandler={() => dispatch(setStep(2))}
          />
        )}
      </div>
    </form>
  );
};
export default CourseInformation;
