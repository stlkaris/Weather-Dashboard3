
// Example of fetching weekly weather data

const fetchWeeklyWeather = async (cityName) => {
    try {
      const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json`, {
        params: {
          key: "YOUR_API_KEY",
          q: cityName,
          days: 7,
        },
      });
      setWeeklyForecast(response.data.forecast.forecastday);
    } catch (err) {
      console.error(err);
    }
  };
  
  // Component to display weekly forecast
  const WeeklyForecast = ({ forecast }) => {
    return (
      <div>
        {forecast.map((day) => (
          <div key={day.date}>
            <p>{day.date}</p>
            <p>{day.day.avgtemp_c} °C</p>
            <p>{day.day.condition.text}</p>
          </div>
        ))}
      </div>
    );
  };

  export default fetchWeeklyWeather;
  