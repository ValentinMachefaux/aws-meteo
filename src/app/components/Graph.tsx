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
  const [cityList, setCityList] = useState([]);

  // Objet pour traduire les descriptions météo
  const weatherTranslations = {
    "clear sky": "ciel dégagé",
    "few clouds": "quelques nuages",
    "scattered clouds": "nuages épars",
    "broken clouds": "nuages fragmentés",
    "shower rain": "averse de pluie",
    "rain": "pluie",
    "thunderstorm": "orage",
    "snow": "neige",
    "mist": "brume",
    "overcast clouds": "nuages couverts",
    "thunderstorm with light rain": "orage avec pluie légère",
    "thunderstorm with rain": "orage avec pluie",
    "thunderstorm with heavy rain": "orage avec forte pluie",
    "light thunderstorm": "orage léger",
    "heavy thunderstorm": "orage violent",
    "ragged thunderstorm": "orage déchiqueté",
    "thunderstorm with light drizzle": "orage avec légère bruine",
    "thunderstorm with drizzle": "orage avec bruine",
    "thunderstorm with heavy drizzle": "orage avec forte bruine",
    "light intensity drizzle": "bruine légère",
    "drizzle": "bruine",
    "heavy intensity drizzle": "bruine forte",
    "light intensity drizzle rain": "pluie et bruine légère",
    "drizzle rain": "pluie et bruine",
    "heavy intensity drizzle rain": "forte pluie et bruine",
    "shower rain and drizzle": "averse de pluie et bruine",
    "heavy shower rain and drizzle": "forte averse de pluie et bruine",
    "shower drizzle": "averse de bruine",
    "light rain": "pluie légère",
    "moderate rain": "pluie modérée",
    "heavy intensity rain": "pluie forte",
    "very heavy rain": "pluie très forte",
    "extreme rain": "pluie extrême",
    "freezing rain": "pluie verglaçante",
    "light intensity shower rain": "averse de pluie légère",
    "heavy intensity shower rain": "forte averse de pluie",
    "ragged shower rain": "averse de pluie déchiquetée",
    "light snow": "neige légère",
    "heavy snow": "forte neige",
    "sleet": "neige fondue",
    "light shower sleet": "légère averse de neige fondue",
    "shower sleet": "averse de neige fondue",
    "light rain and snow": "pluie et neige légère",
    "rain and snow": "pluie et neige",
    "light shower snow": "légère averse de neige",
    "shower snow": "averse de neige",
    "heavy shower snow": "forte averse de neige",
    "smoke": "fumée",
    "haze": "brume sèche",
    "sand/dust whirls": "tourbillons de sable/poussière",
    "fog": "brouillard",
    "sand": "sable",
    "dust": "poussière",
    "volcanic ash": "cendres volcaniques",
    "squalls": "rafales",
    "tornado": "tornade",
  };

  // A récupérer

  // Fonction pour générer un dégradé global de 0°C à 40°C pour toutes les barres
  const getGlobalGradient = (ctx) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    
    // Bleu pour les températures froides
    gradient.addColorStop(0.1, 'darkred');   // 0°C

    gradient.addColorStop(0.2, 'red');   // 0°C

    gradient.addColorStop(0.25, 'orange');   // 0°C
    // Jaune pour les températures moyennes
    gradient.addColorStop(0.3, 'green');  // 20°C

    gradient.addColorStop(0.5, 'blue');  // 20°C

    gradient.addColorStop(0.7, 'darkblue');   // 40°C

    gradient.addColorStop(1, 'black');   // 40°C

    return gradient;
  };

  // A récupérer
  
  const fetchWeatherData = async (city) => {
    const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Ville non trouvée");
      }
      const data = await res.json();
      const weatherDescription = data.weather[0].description;
      const translatedWeather = weatherTranslations[weatherDescription] || weatherDescription;
      const weatherIcon = data.weather[0].icon; // Récupérer le code d'icône

      const cityWeather = {
        city: data.name,
        degree: data.main.temp,
        weather: translatedWeather,
        icon: weatherIcon, // Ajouter l'icône récupérée
      };

      setWeatherData(cityWeather);

      setChartData((prevChartData) => [
        ...prevChartData,
        { city: data.name, degree: data.main.temp },
      ]);

      setCityList((prevCityList) => [
        ...prevCityList,
        cityWeather,
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

  const handleDeleteCity = (cityName) => {
    setCityList((prevCityList) => prevCityList.filter((city) => city.city !== cityName));
    setChartData((prevChartData) => prevChartData.filter((data) => data.city !== cityName));
  };

  const sortedChartData = [...chartData].sort((a, b) => a.degree - b.degree);

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Météo par Ville</h1>

      {/* Formulaire pour entrer une ville */}
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

      {/* Affichage des erreurs */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Affichage de la météo de la ville courante */}
      {weatherData && (
        <div className="w-full flex flex-col items-start mb-8">
          <div className="flex items-center mb-4">
            <h2 className="text-4xl font-bold mr-4">{weatherData.city}</h2>
            <span className="text-xl">{weatherData.degree}°C</span>
          </div>
          <p className="text-lg">Temps : {weatherData.weather}</p>
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} // Utilisation de l'icône OpenWeather
            alt={weatherData.weather}
            className="w-20 h-20"
          />
        </div>
      )}

      {/* Affichage de la liste des villes avec bouton de suppression */}
      <div className="w-full mb-8">
        <h2 className="text-2xl font-bold mb-4">Villes enregistrées :</h2>
        <ul className="list-disc pl-6">
          {cityList.map((city, index) => (
            <li key={index} className="mb-2 flex justify-between items-center">
              <span>
                <strong>{city.city}</strong> : {city.degree}°C, {city.weather}
                <img
                  src={`http://openweathermap.org/img/wn/${city.icon}@2x.png`} // Utilisation de l'icône OpenWeather pour chaque ville
                  alt={city.weather}
                  className="inline-block w-10 h-10 ml-4"
                />
              </span>
              <button
                onClick={() => handleDeleteCity(city.city)}
                className="ml-4 bg-red-500 text-white p-1 rounded"
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      </div> 

      {/* A récupérer */}
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
                  return getGlobalGradient(ctx); // Utilisation du même dégradé pour toutes les barres
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
                min: -50,
                max: 50, // Fixer la limite max pour correspondre à notre échelle de gradient
              },
            },
          }}
        />
      </div>
    </div>
  );
};

// A récupérer

export default Graph;