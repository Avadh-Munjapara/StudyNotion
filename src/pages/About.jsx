import React from "react";
import NavBar from "../components/comman/NavBar";
import HighlightedText from "../components/home/HighlightedText";
import about1img from "../assets/Images/aboutus1.webp";
import about2img from "../assets/Images/aboutus2.webp";
import about3img from "../assets/Images/aboutus3.webp";
import foundingImg from '../assets/Images/FoundingStory.png';
import BluredSphere from "../components/comman/BluredSphere";
import NumberInfo from "../components/about/NumberInfo";
import LearningGrid from "../components/about/LearningGrid";
import ContactForm from "../components/about/ContactForm";
import Footer from '../components/comman/Footer';
const About = () => {
  return (
    <div>
      <NavBar />

      <div className="bg-[#161D29]">
        <div className="flex flex-col w-11/12 items-center mx-auto  px-40 pt-20">
          <h1 className="text-[#999DAA] font-medium mb-10">About Us</h1>
          <div className="flex flex-col gap-5">
            <p className="text-4xl text-[#F1F2FF] font-semibold text-center">
              Driving Innovation in Online Education for a <br />{" "}
              <HighlightedText text={"Brighter Future"} />
            </p>
            <p className="text-[#838894] font-medium text-center">
              Studynotion is at the forefront of driving innovation in online
              education. We're passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community.
            </p>
          </div>
          <div className="flex gap-5 justify-center relative -bottom-20">
            <BluredSphere color1={"rgba(230,92,0,1)"} color2={"rgba(249,212,35,1)"}/>
            <img src={about1img} className="w-96 z-10 h-72" alt="aboutimage1" />
            <img src={about2img} className="w-96 z-10 h-72" alt="aboutimage2" />
            <img src={about3img} className="w-96 z-10 h-72" alt="aboutimage3" />
          </div>
        </div>
      </div>

      <div className="w-11/12  mx-auto pb-24">
        <div className="w-full py-28  mt-16">
          <p className="font-semibold text-[#AFB2BF] text-center px-12 text-4xl">
            <span className="text-[#424854]">“</span> We are passionate about
            revolutionizing the way we learn. Our innovative platform{" "}
            {<HighlightedText text={"combines technology"} />},
            {
              <HighlightedText
                color1="#FF512F"
                color2="#FF512F"
                color3="#F09819"
                text={"expertise"}
              />
            }
            ,and community to create an{" "}
            {
              <HighlightedText
                color1="#F09819"
                color2="#F09819"
                color3="#FF512F"
                text={"unparalleled educational experience"}
              />
            }
            .<span className="text-[#424854]">“</span>
          </p>
        </div>


        <div className="grid grid-cols-2 gap-y-40 gap-x-32 ">
            <div className="flex flex-col gap-7">
              <h2><HighlightedText text={"Our Founding Story"} color1="#833AB4" color2="#FD1D1D" color3="#FCB045"/></h2>
              <div className="flex flex-col gap-4">
              <p className="text-[#838894] font-medium ">Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
              <p className="text-[#838894] font-medium">As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
              </div>
            </div>

            <div className="self-center relative">
            <BluredSphere color1={"#EC008C"} color2={"#EC008C"} height={"150px"} top={"30px"} left={"40px"}/>
              <img src={foundingImg} className="z-10 relative h-[255px] w-[450px]" alt="Our Founding Story" />
            </div>

            <div className="flex flex-col gap-7">
            <h2><HighlightedText text={"Our Vision"} color1="#E65C00" color2="#F9D423" color3="#F9D423"/></h2>
            <p className="text-[#838894] font-medium">With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
            </div>

            <div className="flex flex-col gap-7">
            <h2><HighlightedText text={"Our Mission"}/></h2>
            <p className="text-[#838894] font-medium">our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
            </div>
        </div>
      </div>

      <div className="bg-[#161D29]">
        <div className="flex gap-10 py-16 w-11/12 mx-auto justify-around">
          <NumberInfo number={"5K"} info={"Active Students"}/>
          <NumberInfo number={"10+"} info={"Mentors"}/>
          <NumberInfo number={"200+"} info={"Courses"}/>
          <NumberInfo number={"50+"} info={"Awards"}/>
        </div>
      </div>
          

      <LearningGrid/>

      <div className="flex flex-col gap-5 pb-40 items-center">
        <div className="flex flex-col items-center gap-2">
        <h2 className="text-richblack-5 text-4xl font-semibold">Get in Touch</h2>
        <p className="text-richblack-300 font-medium">We’d love to here for you, Please fill out this form.</p>
        </div>
        <ContactForm/>
      </div>
      
      {/* review slider */}


      <Footer/>
    </div>
  );
};

export default About;
