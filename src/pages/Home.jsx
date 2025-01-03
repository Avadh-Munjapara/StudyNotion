import React from 'react';
import { IoMdArrowRoundForward } from "react-icons/io";
import CustomButton from '../components/home/CustomButton';
import { Link } from 'react-router-dom';
import HighlightedText from '../components/home/HighlightedText';
import banner from '../assets/Images/banner.mp4';
import CodeBlock from '../components/home/CodeBlock';
const Home = () => {
    return (
        <div className='bg-[#000814] w-full min-h-screen'>
            {/* section1 */}
                <div className='w-full flex flex-col gap-16'>
                    <div className=' flex flex-col pt-[124px] gap-4 items-center'>
                        <Link to={'/signUp'} className='hover:bg-richblack-900 rounded-full w-fit self-center
                         flex items-center gap-2 text-bold mb-4 border-b-2 text-richblack-200 bg-richblack-800 py-3 px-6 '>
                            Become An Instructor    
                          <IoMdArrowRoundForward /></Link>
                        <h2 className='text-white text-3xl'>Empower Your Future with <HighlightedText text={"Coding Skills"} /></h2>
                        <p className='text-richblack-300 font-semibold text-center w-2/3'>With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. </p>
                        <div className='flex gap-4 mt-5'>
                        <CustomButton text={"Learn More"} active={true}></CustomButton>
                        <CustomButton text={"Book a Demo"} active={false}></CustomButton>
                        </div>
                    </div>

                
                    <div className='w-[75%] self-center shadow-[19px_19px_#FFFFFF] mb-40 relative'>

                    {/* <div className='shadow-[1px_1px_1000px_60px_rgb(6,53,68)] absolute right-52 w-1/3 h-1/3'> 

                    </div> */}

                    <video controls className='bg-blue'>
                        <source src={banner} type='video/mp4' />
                    </video>    
                    </div>    

                    <div className='flex mx-auto '>
                        <div className='w-1/2 flex flex-col gap-5 px-10'>
                            <p className='text-4xl text-white'>
                                Unlock your <HighlightedText text={'coding potential'} /> with our online courses.
                            </p>
                            <p className='text-richblack-300 '> 
                            Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.
                            </p>
                            <div className='flex gap-4'>
                                <CustomButton text={`Try it Yourself`}  active={true}/>
                                <CustomButton text={'Learn More'} active={false}/>
                            </div>
                        </div>

                        <div className='w-1/2'>
                            <CodeBlock/>
                        </div>
                    </div>
                </div>
            {/* section2 */}

            {/* section3 */}

            {/* footersection */}


        </div>
    );
}

export default Home;
