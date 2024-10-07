const WeeklyForecast = ({ forecast }) => {
    return (
      <div className="flex flex-col items-center justify-center mt-8">
        <h2 className="text-2xl font-bold text-white mb-4">7-Day Forecast</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {forecast.map((day) => (
            <div key={day.date} className="p-4 bg-white dark:bg-gray-700 dark:text-white rounded-md shadow">
              <h3>{day.date}</h3>
              <p>Temp: {day.day.avgtemp_c} °C</p>
              <p>{day.day.condition.text}</p>
              <img src={day.day.condition.icon} alt={day.day.condition.text} />
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default WeeklyForecast;
  