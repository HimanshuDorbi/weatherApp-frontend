import React, { useEffect, useState } from "react";
import "./Forcast.css";

const Forecast = ({ city }) => {
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    // Replace 'YOUR_API_KEY' with your OpenWeatherMap API key
    const apiKey = "d36d1a9684497f5c9e2ffe7d69c197ed";
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=5&appid=${apiKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const forecastDays = data.list.map((item) => ({
          date: item.dt_txt,
          weather_state_name: item.weather[0].main,
          max_temp: item.main.temp_max,
          min_temp: item.main.temp_min,
          humidity: item.main.humidity,
        }));
        setForecastData(forecastDays);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, [city]);

  return (
    <div className="location-style">
      <h4>{city}</h4>
      <ul>
        {forecastData.map((day, index) => (
          <li key={index}>
            <h3>{day.date}</h3>
            <h4>{day.weather_state_name}</h4>
            <h4>Max: {day.max_temp}°C</h4>
            <h4>Min: {day.min_temp}°C</h4>
            <h4>Humidity: {day.humidity}%</h4>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Forecast;
