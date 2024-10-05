import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
import WeeklyForecast from "./components/WeeklyForecast"; 

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [weeklyForecast, setWeeklyForecast] = useState(null); 
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false); 

  const getRecentSearches = () => JSON.parse(localStorage.getItem("recentSearches")) || [];

  const saveToLocalStorage = (cityName) => {
    const searches = getRecentSearches();
    if (!searches.includes(cityName)) {
      searches.unshift(cityName);
      if (searches.length > 5) searches.pop(); 
      localStorage.setItem("recentSearches", JSON.stringify(searches));
    }
  };

  const fetchWeatherData = async (cityName) => {
    try {
      const response = await axios.get("https://api.weatherapi.com/v1/current.json", { 
        params: {
          key: "9a54a0b6585443e1bfb182245240410",
          q: cityName,
        },
      });
      setWeatherData(response.data);
      fetchWeeklyWeather(cityName);
      setError(null);
      saveToLocalStorage(cityName);
    } catch (err) {
      setError("City not found or network issue.");
      setWeatherData(null);
    }
  };
  
  const fetchWeeklyWeather = async (cityName) => {
    try {
      const response = await axios.get("https://api.weatherapi.com/v1/forecast.json", { 
        params: {
          key: "9a54a0b6585443e1bfb182245240410",
          q: cityName,
          days: 7,
        },
      });
      setWeeklyForecast(response.data.forecast.forecastday);
    } catch (err) {
      console.error("Error fetching weekly forecast", err);
    }
  };
  
  const fetchWeatherForCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const response = await axios.get("https://api.weatherapi.com/v1/current.json", { 
            params: {
              key: "9a54a0b6585443e1bfb182245240410",
              q: `${latitude},${longitude}`,
            },
          });
          setWeatherData(response.data);
          fetchWeeklyWeather(`${latitude},${longitude}`);
          setError(null);
        },
        () => {
          setError("Unable to retrieve your location.");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    fetchWeatherForCurrentLocation();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (city) fetchWeatherData(city);
  };

 
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="flex justify-center align-center flex-col bg-blue-200 dark:bg-gray-800 transition-all min-h-screen">
        <div className="flex justify-end p-4">
          {/* Dark mode toggle button */}
          <button
            onClick={toggleDarkMode}
            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <h1 className="text-4xl text-center font-bold mb-8 text-blue-700 dark:text-white">
          Weather Dashboard
        </h1>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="flex space-x-2 mb-6 justify-center">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="p-3 rounded-l-md rounded-border outline-none dark:bg-gray-600 dark:text-white"
          />
          <button
            type="submit"
            className="p-3 bg-blue-500 text-white rounded-r-md hover:bg-blue-700"
          >
            Search
          </button>
        </form>

        {/* Recent searches */}
        <div className="flex justify-center space-x-4 mb-6">
          {getRecentSearches().map((city) => (
            <button
              key={city}
              onClick={() => fetchWeatherData(city)}
              className="p-2 bg-gray-300 dark:bg-gray-700 dark:text-white rounded-md"
            >
              {city}
            </button>
          ))}
        </div>

        {/* Error handling */}
        {error && <div className="text-red-500 dark:text-red-400 mb-4">{error}</div>}

        {/* Weather card */}
        {weatherData && <WeatherCard data={weatherData} />}

        {/* Weekly forecast */}
        {weeklyForecast && <WeeklyForecast forecast={weeklyForecast} />}
      </div>
    </div>
  );
};

export default App;
