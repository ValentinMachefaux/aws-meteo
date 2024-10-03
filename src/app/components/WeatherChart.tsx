import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement } from "chart.js"; // Ajout de BarElement

Chart.register(CategoryScale, LinearScale, BarElement);

interface CityWeather {
  city: string;
  degree: number;
}

interface WeatherChartProps {
  chartData: CityWeather[];
}

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
              backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default WeatherChart;
