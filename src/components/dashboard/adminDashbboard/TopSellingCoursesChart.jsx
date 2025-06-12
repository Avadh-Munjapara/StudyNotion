import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);
const randomColors = (numColors) => {
  let colors = [];
  for (let i = 0; i < numColors; i++) {
    const randomColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)},0.5)`;
    colors.push(randomColor);
  }
  return colors;
};
const TopSellingCoursesChart = ({ courseData }) => {
  const data = {
    labels: courseData?.map((course) => course.name),
    datasets: [
      {
        label: "students",
        data: courseData?.map((course) => course?.studentsEnrolled),
        backgroundColor: randomColors(1),
        borderColor:randomColors(1),
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="relative">
          <div
            className={`box1 backdrop-blur-2xl shadow-[1px_1px_300px_90px_rgba(71,165,197,1)] absolute top-56 left-24 h-1 w-1 rounded-full`}
          ></div>
          <div className="">
      
              <Radar data={data} />
          </div>
        </div>
  );
};

export default TopSellingCoursesChart;
