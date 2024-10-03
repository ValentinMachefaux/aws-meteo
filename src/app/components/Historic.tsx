import React from "react";
import Image from "next/image";

interface CityWeather {
  city: string;
  degree: number;
  weather: string;
  icon: string;
}

interface CityListProps {
  cities: CityWeather[];
  onDeleteCity: (city: string) => void;
}

const CityList: React.FC<CityListProps> = ({ cities, onDeleteCity }) => {
  if (cities.length === 0) return null;

  return (
    <div className="w-full mb-8">
      <h2 className="text-2xl font-bold mb-4">Villes enregistrées :</h2>
      <ul className="list-disc pl-6">
        {cities.map((city, index) => (
          <li key={index} className="mb-2 flex justify-between items-center">
            <span>
              <strong>{city.city}</strong> : {city.degree}°C, {city.weather}
              <img
                src={`http://openweathermap.org/img/wn/${city.icon}@2x.png`}
                alt={city.weather}
                className="inline-block w-10 h-10 ml-4"
              />
            </span>
            <button
              onClick={() => onDeleteCity(city.city)}
              className="ml-4 bg-red-500 text-white p-1 rounded"
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CityList;
