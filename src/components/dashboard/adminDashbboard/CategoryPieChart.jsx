import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

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
const options = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: "top",
      labels: {
        padding: 20,
        color: "#AFB2BF", // richblack-300
      },
    },
  },
};
const CategoryPieChart = ({ categoryData }) => {
  const data = {
    labels: categoryData?.map((category) => category.name),
    datasets: [
      {
        label: "students",
        data: categoryData?.map((category) => category.totalStudents),
        backgroundColor: randomColors(categoryData?.length),
        hoverOffset: 20,
        borderWidth:1
      },

    ],
  };
  return (
    <div className="h-fit">
      <h2>Student's favourite category</h2>
      <div>
        <Pie
          options={{
            offset: 0,
            maintainAspectRatio: false,
          }}
          height={"300"}
          data={data}
        />
      </div>
    </div>
  );
};

export default CategoryPieChart;
