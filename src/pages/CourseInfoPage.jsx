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
import CourseContent from "../components/courseInfo/CourseContent";
import Footer from "../components/comman/Footer";
import { addItem } from "../slices/cartSlice";
import toast from "react-hot-toast";
import { ACCOUNT_TYPE } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import ReviewSlider from "../components/comman/ReviewSlider";
import { getCourseReviews } from "../services/operations/courseApi";
const CourseInfoPage = () => {
  const [course, setCourse] = useState(null);
  const [reviews, setReviews] = useState(null);

  const loacation = useLocation();
  const courseId = loacation.pathname.split("/").at(-1);
  const loading = useSelector((state) => state.course.loading);
  const authLoading = useSelector((state) => state.auth.loading);
  const user = useSelector((state) => state.profile.user);
    const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseDetails = async () => {
      const response = await getFullCourseDetails({ courseId }, dispatch);
      if (response) {
        setCourse(response);
      } else {
        console.error("Failed to fetch course details");
      }
    };
    fetchCourseDetails();
  }, []);

  useEffect(() => {
    const getReviews = async () => {
      const reviews = await getCourseReviews(courseId);
      if (reviews) setReviews(reviews);
    };

    getReviews();
  }, []);

  const goToCourseHandler = () => {
    navigate(
      `/view-course/${courseId}/sectionId/${course?.courseContent[0]?._id}/sub-sectionId/${course?.courseContent[0]?.subSections[0]?._id}`
    );
  };

  const addToCart = () => {
    if (!user) {
      toast.error("Please login to add items to cart");
      return;
    }
    if (user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("Instructors cannot buy courses");
      return;
    }
    dispatch(addItem(course));
  };

  const handleBuyCourse = async () => {
    if (!user) {
      toast.error("Please login to buy courses");
      return;
    }
    if (user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("Instructors cannot buy courses");
      return;
    }
    await buyCourse(token,user?._id,[courseId],dispatch);
  };

  const isStudentEnrolled = () => {
    return course?.studentsEnrolled?.some((student) => student === user?._id);
  };

  return (
    <div>
      <NavBar />
      {loading || authLoading ? (
        <Spinner />
      ) : (
        <div className=" flex mx-auto">
          {/* <YellowBtn clickHandler={handleBuyCourse} text={'Buy'}/> */}

          {/* courseInfo section */}
          <div className="w-full flex flex-col gap-10 pb-20">
            <div className="w-full bg-richblack-800">
              <div className=" max-w-maxContent w-11/12 relative py-8 flex md:flex-row flex-col gap-6  mx-auto">
                <div className="md:w-[73%]">
                  <CourseIntro course={course} />
                </div>
                <div className="md:absolute right-0 ">
                  <CourseBuyCard
                    thumbnail={course?.thumbnail}
                    buyHandler={handleBuyCourse}
                    isBought={isStudentEnrolled()}
                    course={course}
                    price={course?.price}
                    instructions={course?.instructions}
                    addToCart={addToCart}
                    goToCourseHandler={goToCourseHandler}
                  />
                </div>
              </div>
              <div className="w-1 h- full"></div>
            </div>

            <div className="w-full">
              <div className="max-w-maxContent w-11/12 flex flex-col gap-5 mx-auto ">
                {/* what you'll learn*/}
                <div className="md:w-[73%] p-8 flex flex-col gap-3 border-richblack-700 border-[1px]">
                  <p className="text-3xl text-richblack-5 font-medium">
                    What you'll learn
                  </p>
                  <p className="text-richblack-50 texto=-sm font-medium">{course?.whatYouWillLearn}</p>
                </div>

                {/* course content */}
                <div className="md:w-[73%] mt-5">
                  <CourseContent content={course?.courseContent} />
                </div>

                {/*author section*/}
                <div className="md:w-[73%] flex flex-col gap-4">
                  <h4 className="font-semibold text-2xl text-richblack-5">
                    Author
                  </h4>
                  <div className="flex gap-4 items-center">
                    <img
                      className="rounded-full h-[52px]"
                      src={course?.instructor?.image}
                      alt=""
                    />
                    <p className="text-richblack-5 font-medium">
                      {course?.instructor?.firstName}{" "}
                      {course?.instructor?.lastName}
                    </p>
                  </div>
                  <p className="text-richblack-50 text-sm">
                    {course?.instructor?.additionalDetails?.about}
                  </p>
                </div>
              </div>

              {/* review Slider */}
              <div className="max-w-maxContent mt-20 w-11/12 mx-auto">
                <ReviewSlider reviews={reviews} />
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default CourseInfoPage;
