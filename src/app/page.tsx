"use client";
import { useState } from "react";
import Form from "./components/Form";
import WeatherDisplay from "./components/Display";
import WeatherChart from "./components/WeatherChart";
import CityList from "./components/Historic";

interface CityWeather {
  city: string;
  degree: number;
  weather: string;
  icon: string;
}

export default function Page() {
  const [weatherData, setWeatherData] = useState<CityWeather | null>(null);
  const [chartData, setChartData] = useState<CityWeather[]>([]);
  const [cities, setCities] = useState<CityWeather[]>([]); // Ajout de l'état pour gérer les villes

  const handleCitySubmit = async (city: string) => {
    const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Ville non trouvée");
      }
      const data = await res.json();

      const cityWeather: CityWeather = {
        city: data.name,
        degree: data.main.temp,
        weather: data.weather[0].description,
        icon: data.weather[0].icon,
      };

      setWeatherData(cityWeather);
      setChartData((prevData) => [...prevData, cityWeather]); // Ajouter les données au graphique
      setCities((prevCities) => [...prevCities, cityWeather]); // Ajouter les villes à l'historique
    } catch (error) {
      console.error("Erreur lors de la récupération des données météo :", error);
    }
  };

  const handleDeleteCity = (cityName: string) => {
    setCities((prevCities) => prevCities.filter((city) => city.city !== cityName));
    setChartData((prevChartData) => prevChartData.filter((data) => data.city !== cityName)); // Supprimer aussi du graphique
  };

  return (
    <div>
      <Form onCitySubmit={handleCitySubmit} />
      <WeatherDisplay weatherData={weatherData} />
      <WeatherChart chartData={chartData} />
      <CityList cities={cities} onDeleteCity={handleDeleteCity} />
    </div>
  );
}
