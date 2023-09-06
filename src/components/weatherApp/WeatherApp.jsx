import React, { useEffect, useState } from "react";
import "./WeatherApp.css";
import Search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import driizle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";
const WeatherApp = () => {
  // https://api.openweathermap.org/data/2.5/weather?q={city name}&units=Matric&appid={API key}

  const API_KEY = "096034f798ee1e1741a4adc253e57a7e";
  const [searchCity, setSearchCity] = useState("");
  const [search, setSearch] = useState(false);
  const [weatherData, setWeatherData] = useState({});
  const [weatherIcon, setWeatherIcon] = useState(cloud_icon);
  useEffect(
    function () {
      async function fetWeather() {
        if (!searchCity || !search) return;
        try {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=metric&appid=${API_KEY}`
          );
          const data = await res.json();
          setWeatherData(data);
          handleWeatherIcon(data);
        } catch (err) {
          console.error(err);
        } finally {
          setSearch(false);
        }
      }

      fetWeather();
    },
    [searchCity, search, weatherData]
  );

  function handleWeatherIcon(weatherData) {
    const icon = weatherData.weather[0].icon.slice(0, 2);
    const icons = {
      "02": cloud_icon,
      "03": driizle_icon,
      "04": driizle_icon,
      "09": rain_icon,
    };
    setWeatherIcon(icons[icon] || clear_icon);
  }

  return (
    <>
      {Object.keys(weatherData).length > 0 ? (
        <div className="container">
          <div className="top-bar">
            <input
              value={searchCity}
              type="text"
              className="cityInput"
              placeholder="search"
              onChange={(e) => setSearchCity(e.target.value)}
            />
            <div onClick={() => setSearch(!search)} className="search-icon">
              <img src={Search_icon} alt="search-icon" />
            </div>
          </div>
          <div className="weather-image">
            <img src={weatherIcon} alt="cloud" />
          </div>
          <div className="weather-temp">{weatherData.main.temp}°c</div>
          <div className="weather-location">{weatherData.name}</div>
          <div className="data-container">
            <div className="element">
              <img className="icon" src={humidity_icon} alt="humidity" />
              <div className="data">
                <div className="humidty-percent">
                  {weatherData.main.humidity} %
                </div>
                <div className="text">Humidity</div>
              </div>
            </div>
            <div className="element">
              <img className="icon" src={wind_icon} alt="wind" />
              <div className="data">
                <div className="humidty-percent">
                  {weatherData.wind.speed} Km/h
                </div>
                <div className="text">Wind speed</div>
              </div>
            </div>
          </div>
          <div className="copy-right">
            &copy; R10 {new Date().getFullYear()}
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="top-bar">
            <input
              value={searchCity}
              type="text"
              className="cityInput"
              placeholder="search"
              onChange={(e) => setSearchCity(e.target.value)}
            />
            <div onClick={() => setSearch(!search)} className="search-icon">
              <img src={Search_icon} alt="search-icon" />
            </div>
          </div>
          <div className="weather-image">
            <img src={weatherIcon} alt="cloud" />
          </div>

          {/* <div className="wlc-note"> */}
          {/* Search your city and learn about its today's weather forcast! */}
          {/* </div>  */}

          <div className="copy-right">
            &copy; R10 {new Date().getFullYear()}
          </div>
        </div>
      )}
    </>
  );
};

export default WeatherApp;
