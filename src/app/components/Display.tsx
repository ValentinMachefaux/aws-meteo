import React from "react";
// import Image from "next/image";

interface CityWeather {
  city: string;
  degree: number;
  weather: string;
  icon: string;
}

interface WeatherDisplayProps {
  weatherData: CityWeather | null;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weatherData }) => {
  if (!weatherData) return null;

  return (
    <div className="w-full flex flex-col items-start mb-8">
      <div className="flex items-center mb-4">
        <h2 className="text-4xl font-bold mr-4">{weatherData.city}</h2>
        <span className="text-xl">{weatherData.degree}°C</span>
      </div>
      <p className="text-lg">Temps : {weatherData.weather}</p>
      <img
  src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
  alt={weatherData.weather}
  width={100}
  height={100} 
  className="w-20 h-20"
/>
    </div>
  );
};

export default WeatherDisplay;
