import React, { useState } from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Bar } from "react-chartjs-2";

Chart.register(CategoryScale);

const Graph = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [chartData, setChartData] = useState([]);

  const fetchWeatherData = async (city) => {
    const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Ville non trouvée");
      }
      const data = await res.json();
      setWeatherData({
        city: data.name,
        degree: data.main.temp,
        weather: data.weather[0].description,
      });

      setChartData((prevChartData) => [
        ...prevChartData,
        { city: data.name, degree: data.main.temp },
      ]);

      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() === "") {
      setError("Veuillez entrer une ville.");
      return;
    }
    fetchWeatherData(city);
    setCity("");
  };

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Météo par Ville</h1>

      {}
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Entrez une ville"
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          Obtenir la météo
        </button>
      </form>

      {}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {}
      {weatherData && (
        <div className="w-full flex flex-col items-start mb-8">
          <div className="flex items-center mb-4">
            <h2 className="text-4xl font-bold mr-4">{weatherData.city}</h2>
            <span className="text-xl">{weatherData.degree}°C</span>
          </div>
          <p className="text-lg">Temps : {weatherData.weather}</p>
        </div>
      )}

      {}
      <div className="w-full" style={{ maxWidth: "600px" }}>
        <Bar
          data={{
            labels: chartData.map((data) => data.city),
            datasets: [
              {
                label: "Température (°C)",
                data: chartData.map((data) => data.degree),
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
    </div>
  );
};

export default Graph;