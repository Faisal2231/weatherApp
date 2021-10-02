import React from "react";
import "./Weather.css";
import { useState, useEffect } from "react";
const Weather = () => {
  const sunRiseAndSunSet = (timeStamp) => {
    return `${new Date(timeStamp * 1000).getHours()} : ${new Date(
      timeStamp * 1000
    ).getMinutes()}`;
  };
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("");
  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&APPID=e42246c73b82267b7b4bfae7cfe08991`
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not fetch data");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        console.log("Data has been fetch");
        setCity(data);
      })
      .catch((err) => {
        setCity(null);
      });
  }, [search]);

  return (
    <div className="parent-box">
      <h2>Weather App</h2>
      <div className="search-box">
        <input
          type="search"
          placeholder="Enter the city"
          className="search-input"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      {!city ? (
        <p>This city doesn't exist.</p>
      ) : (
        <div>
          <div className="location-box">
            <h1 className="country-name">
              {search.toUpperCase()}-{city.sys.country}
            </h1>
            <h2>Date: {new Date().toLocaleDateString()}</h2>
          </div>
          <div className="temp-parent-box">
            <div className="main-tempreture-box">
              <div className="main-tempreture-child-box1">
                <img
                  src={`https://api.openweathermap.org/img/w/${city.weather[0].icon}`}
                  alt="icons"
                  className="icons"
                />
              </div>
              <div className="main-tempreture-child-box2">
                <h1 className="tempreture">{Math.floor(city.main.temp)}°C</h1>
                <h2 className="weather-description">
                  {city.weather[0].description}
                </h2>
              </div>
            </div>
            <div className="tempreture-details">
              <div className="tempreture-details-child-box">
                <h2>{Math.floor(city.main.feels_like)}°C</h2>
                <h2>Feels Like</h2>
              </div>
              <div className="tempreture-details-child-box">
                <h2>{Math.floor(city.main.temp_max)}°C</h2>
                <h2>Max Temp </h2>
              </div>
              <div className="tempreture-details-child-box">
                <h2>{Math.floor(city.main.temp_min)}°C</h2>
                <h2>Min Temp </h2>
              </div>
              <div className="tempreture-details-child-box">
                <h2>{Math.floor(city.main.humidity)}</h2>
                <h2>Humidity</h2>
              </div>
            </div>
          </div>
          <h3 className="other-details">Other details</h3>
          <div className="other-details-box">
            <div className="other-details-child-boxes">
              <h2>{city.coord.lon}</h2>
              <h2>Longtitude</h2>
            </div>
            <div className="other-details-child-boxes">
              <h2>{city.coord.lat}</h2>
              <h2>Latitude </h2>
            </div>
            <div className="other-details-child-boxes">
              <h2>{city.wind.speed} mph</h2>
              <h2>Wind Speed </h2>
            </div>
            <div className="other-details-child-boxes">
              <h2>{city.wind.deg}</h2>
              <h2>Degree </h2>
            </div>
            <div className="other-details-child-boxes">
              <h2>{sunRiseAndSunSet(city.sys.sunrise)}</h2>
              <h2>Sun Rise</h2>
            </div>
            <div className="other-details-child-boxes">
              <h2>{sunRiseAndSunSet(city.sys.sunset)}</h2>
              <h2>Sun Set </h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
