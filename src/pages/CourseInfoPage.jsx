import { useLocation } from "react-router-dom";
import { buyCourse } from "../services/operations/paymentApi";
import { useEffect, useState } from "react";
import { getFullCourseDetails } from "../services/operations/courseApi";
import Spinner from "../components/comman/Spinner";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import NavBar from "../components/comman/NavBar";
import CourseIntro from "../components/courseInfo/courseIntro";
import CourseBuyCard from "../components/courseInfo/CourseBuyCard";
const CourseInfoPage = () => {
  const [course, setCourse] = useState(null);
  const loacation = useLocation();
  const courseId = loacation.pathname.split("/").at(-1);
  const loading = useSelector((state) => state.course.loading);
  const user = useSelector((state) => state.profile.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCourseDetails = async () => {
      const response = await getFullCourseDetails({ courseId }, dispatch);
      if (response) {
        setCourse(response);
        console.log(response);
      } else {
        console.error("Failed to fetch course details");
      }
    };
    fetchCourseDetails();
  }, []);

  const handleBuyCourse = async () => {
    await buyCourse([courseId]);
  };

  const isStudentEnrolled = () => {
    return course?.studentsEnrolled?.some((student) => student === user._id);
  };

  return (
    <div>
      <NavBar />
      {loading ? (
        <Spinner />
      ) : (
        <div className=" flex mx-auto">
          {/* <YellowBtn clickHandler={handleBuyCourse} text={'Buy'}/> */}

          {/* courseInfo section */}
          <div className="w-full flex flex-col gap-10">
            <div className="w-full bg-richblack-800">
              <div className=" max-w-maxContent w-11/12 relative py-8 flex   mx-auto">
                <div className="w-[73%]">
                  <CourseIntro course={course} />
                </div>
                <div className="absolute right-0 ">
                  <CourseBuyCard
                    thumbnail={course?.thumbnail}
                    buyHandler={handleBuyCourse}
                    isBought={isStudentEnrolled()}
                    course={course}
                    price={course?.price}
                    instructions={course?.instructions}
                  />
                </div>
              </div>
              <div className="w-1 h- full"></div>
            </div>

            {/* what you'll learn */}
            <div className="w-full">
              <div className="max-w-maxContent w-11/12 mx-auto ">
                <div className="w-[73%] p-8 flex flex-col gap-3 border-richblack-700 border-[1px]">
                  <p className="text-3xl text-richblack-5 font-medium">
                    What you'll learn
                  </p>
                  <ul className="list-type-none">
                    {course?.whatYouWillLearn?.map((item) => (
                      <li className="text-richblack-50 font-medium text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseInfoPage;
