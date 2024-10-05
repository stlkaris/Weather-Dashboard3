const WeatherCard = ({ data }) => {
    const { current, location } = data;
    
    return (
      <div className="bg-pink-400 p-6 rounded-lg shadow-md text-center font-bold text-white">
        <h2 className="text-2xl font-bold mb-2">{location.name}, {location.country}</h2>
        <img
          src={current.condition.icon}
          alt={current.condition.text}
          className="mx-auto mb-4"
        />
        <p className="text-xl">Temperature: {current.temp_c}°C</p>
       <div className="flex justify-between mt-8">
        <p>Humidity: {current.humidity}%</p>
        <p>Wind Speed: {current.wind_kph} km/h</p>
        </div>
        <p className="mt-8 text-gray-500">Condition: {current.condition.text}</p>
      </div>
    );
  };
  
  export default WeatherCard;