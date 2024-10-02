import React from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import sourceData from "../utils/data.json";
Chart.register(CategoryScale);

const Graph = () => {
  return (
    <div className="w-full flex items-center flex-col">
      <div className="dataCard revenueCard">Température par ville</div>
      <div className="dataCard customerCard w-96 h-96">
        <Bar
          data={{
            labels: sourceData.map((data) => data.city),
            datasets: [
              {
                label: "°C",
                data: sourceData.map((data) => data.degree),
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default Graph;
