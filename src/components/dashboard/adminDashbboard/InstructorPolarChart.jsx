import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);
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
const InstructorPolarChart = ({ param, insData }) => {
  const data = {
    labels:
      param === "Students"
        ? insData?.byStudents?.map(
            (ins) => `${ins?.firstName} ${ins?.lastName}`
          )
        : insData?.byIncome?.map((ins) => `${ins?.firstName} ${ins?.lastName}`),
    datasets: [
      {
        label: param === "Students" ? "Students" : "Rupees",
        data:
          param === "Students"
            ? insData?.byStudents?.map((ins) => ins?.totalStudents)
            : insData?.byIncome?.map((ins) => ins?.income),
        backgroundColor:
          param === "Students"
            ? randomColors(insData?.byStudents?.length)
            : randomColors(insData?.byIncome?.length),
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="relative">
      <div
        className={`box1 backdrop-blur-2xl shadow-[1px_1px_300px_90px_rgba(71,165,197,1)] absolute top-56 left-24 h-1 w-1 rounded-full`}
      ></div>
      <div className="glass">
  
        <PolarArea data={data} />
      </div>
    </div>
  );
};

export default InstructorPolarChart;
