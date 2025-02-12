import React from "react";
import { IoMdArrowRoundForward } from "react-icons/io";
import CustomButton from "../components/home/CustomButton";
import { Link } from "react-router-dom";
import HighlightedText from "../components/home/HighlightedText";
import banner from "../assets/Images/banner.mp4";
import CodeSection from "../components/home/CodeSection";
const Home = () => {
  return (
    <div className="w-full flex flex-col items-center">
      {/* section1 */}
      <div className="w-11/12 flex flex-col gap-20">
        <div className=" flex flex-col pt-[124px] gap-4 items-center ">
          <Link
            to={"/signUp"}
            className="hover:bg-richblack-900 bg-richblack-800 rounded-full w-fit self-center
                         flex items-center gap-2 text-bold mb-4 border-b-2 text-richblack-200 transition hover:scale-95  py-3 px-6 "
          >
            Become An Instructor
            <IoMdArrowRoundForward />
          </Link>
          <h2 className="text-white text-3xl">
            Empower Your Future with <HighlightedText text={"Coding Skills"} />
          </h2>
          <p className="text-richblack-300 font-semibold text-center w-5/6">
            With our online coding courses, you can learn at your own pace, from
            anywhere in the world, and get access to a wealth of resources,
            including hands-on projects, quizzes, and personalized feedback from
            instructors.{" "}
          </p>
          <div className="flex gap-4 mt-5">
            <CustomButton linkTo={"/"} active={true}>
              Learn More <IoMdArrowRoundForward />
            </CustomButton>
            <CustomButton linkTo={"/"} active={false}>
              Book a Demo
            </CustomButton>
          </div>
        </div>

        <div className="w-[75%] self-center shadow-[19px_19px_#FFFFFF] relative">
          <div
            className={`box1 backdrop-blur-2xl  shadow-[1px_1px_300px_90px_#61b3fa] absolute top-20 left-[50%] h-1 w-1 rounded-full`}
          ></div>
          <div className="z-10 relative">
            <video muted autoPlay className="bg-blue">
              <source src={banner} type="video/mp4" />
            </video>
          </div>
        </div>

        <div className="w-[85%] mx-auto flex flex-col gap-14">
          <CodeSection
            flex={"flex-row"}
            heading={{
              text1: "Unlock your",
              text2: "coding potential",
              text3: "with our online courses",
            }}
            para="Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            btn1={"Try it yourself"}
            btn2={"Learn More"}
            linkTo1={"/"}
            linkTo2={"/"}
            codeColor={"pink"}
            codeBlock={
              '<html>\n<head><title>Exampe</\ntitle>\n<linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1/">Header</a>\n</h1>\n<nav><ah ref= " one / " >One< two/ " > Two</three/" >Three</a>\n</nav>'
            }
          />

          <CodeSection
            flex={"flex-row-reverse"}
            heading={{ text1: "Start", text2: "coding in seconds" }}
            para="Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            btn1={"Continue Lesson"}
            btn2={"Learn More"}
            linkTo1={"/"}
            linkTo2={"/"}
            codeColor={"yellow"}
            codeBlock={
              '<html>\n<head><title>Exampe</\ntitle>\n<linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1/">Header</a>\n</h1>\n<nav><ah ref= " one / " >One< two/ " > Two</three/" >Three</a>\n</nav>'
            }
          />
        </div>
      </div>
      {/* section2 */}

      {/* section3 */}

      {/* footersection */}
    </div>
  );
};

export default Home;
