import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement } from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement);

interface CityWeather {
  city: string;
  degree: number;
}

interface WeatherChartProps {
  chartData: CityWeather[];
}

const getGlobalGradient = (ctx: CanvasRenderingContext2D) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  
  gradient.addColorStop(0.1, 'darkred');
  gradient.addColorStop(0.2, 'red');
  gradient.addColorStop(0.25, 'orange');
  gradient.addColorStop(0.3, 'green');
  gradient.addColorStop(0.5, 'blue');
  gradient.addColorStop(0.7, 'darkblue');
  gradient.addColorStop(1, 'black');
  
  return gradient;
};

const WeatherChart: React.FC<WeatherChartProps> = ({ chartData }) => {
  if (chartData.length === 0) return null;

  const sortedChartData = [...chartData].sort((a, b) => a.degree - b.degree);

  return (
    <div className="w-full" style={{ maxWidth: "600px" }}>
      <Bar
        data={{
          labels: sortedChartData.map((data) => data.city),
          datasets: [
            {
              label: "Température (°C)",
              data: sortedChartData.map((data) => data.degree),
              backgroundColor: (context) => {
                const chart = context.chart;
                const { ctx } = chart;
                return getGlobalGradient(ctx);
              },
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: true,
          scales: {
            y: {
              beginAtZero: true,
              min: -20,
              max: 50,
            },
          },
        }}
      />
    </div>
  );
};

export default WeatherChart;
