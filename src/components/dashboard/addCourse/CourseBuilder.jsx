import React from 'react';
import { useForm } from 'react-hook-form';
import { IoAddCircleOutline } from 'react-icons/io5';
import { useDispatch,useSelector } from 'react-redux';
import { createSection } from '../../../services/operations/courseApi';
import ErrorMessage from '../../comman/ErrorMessage';
import YellowBtn from '../../comman/YellowBtn';
import { setStep } from '../../../slices/courseSlice';
const CourseBuilder = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    }= useForm();
    const courseInfo=useSelector((state)=>state.course.courseInfo);
    const dispatch=useDispatch();
    const courseId=courseInfo?._id;
    const submitHanlder = (data) => {
        const payload={
            name:data.sectionName,
            courseId:'67e98c51a6a02c8867102b29',
        }
        dispatch(createSection(payload));
        reset();
    }
    return (
        <div>
            <div className='back p-6 ml-6 flex flex-col gap-4'>
                <h2 className='text-2xl text-richblack-5 font-semibold'>Course Builder</h2>
                <form className='flex flex-col gap-4' onSubmit={handleSubmit((data)=>submitHanlder(data))}>
                    <input {...register('sectionName',{required:{value:true,message:"Enter Section Name"}})} type="text" className='field2' placeholder='Add a Section to build your course' />
                    {
                        errors.sectionName && (
                            <ErrorMessage message={errors.sectionName.message} />
                        )
                    }
                    <button type='submit' className='flex gap-1 w-fit items-center bg-richblack-800 border border-yellow-50 rounded-lg py-3 px-6 font-medium text-yellow-50'>
                    <IoAddCircleOutline />
                    Create Section
                    </button>
                    
                </form>

                <YellowBtn clickHandler={()=>{dispatch(setStep(1))}} text='Back'/>
            </div>
        </div>
    );
}

export default CourseBuilder;
