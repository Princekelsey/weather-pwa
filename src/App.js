import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "weather-icons/css/weather-icons.min.css";
import { API_KEY, APIXU_KEY } from "../src/utilities";

import Weather from "./components/Weather";

function App() {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [weatherIcon, setIcon] = useState(null);
  const [main, setMain] = useState("");
  const [celcius, setCelcius] = useState("");
  const [temp, setTemp] = useState({ minTemp: "", maxTemp: "" });
  const [description, setDesc] = useState("");
  const [error, setError] = useState(false);
  const [temp2, setTemp2] = useState("");
  const [icon2, setIcon2] = useState("");
  const [region, setRegion] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getWeatherByCity();
    weatherAPI2();
  }, []);

  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let month = today.getMonth();
  let day = today.getDay();
  today = `${weekdays[day]}, ${dd}   ${months[month]} `;

  const weatherAPI2 = async () => {
    setLoading(true);
    const URL = `https://api.apixu.com/v1/forecast.json?key=${APIXU_KEY}&q=Tallinn &days=5`;
    const api_call = await fetch(URL);
    const response = await api_call.json();
    console.log(response);
    setLoading(false);
    setCountry(response.location.country);
    setTemp2(response.current.temp_c);
    setIcon2(response.current.condition.icon);
  };

  const getWeatherByCity = async () => {
    setLoading(true);
    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=Tallinn,est&appid=${API_KEY}`
    );
    const response = await api_call.json();
    console.log(response);
    setLoading(false);
    setCity(response.name);
    // setCountry(response.sys.country);
    setCelcius(calCelcius(response.main.temp));
    setTemp({
      ...temp,
      minTemp: calCelcius(response.main.temp_min),
      maxTemp: calCelcius(response.main.temp_max)
    });
    setDesc(response.weather[0].description);
    setIcon(response.weather[0].icon);
  };
  // http://openweathermap.org/img/wn/10d@2x.png
  const calCelcius = temp => {
    const cel = Math.floor(temp - 273.15);
    return cel;
  };

  return (
    <div className="container text-center set ">
      <Weather
        city={city}
        country={country}
        celcius={celcius}
        temp={temp}
        description={description}
        weatherIcon={weatherIcon}
        temp2={temp2}
        icon2={icon2}
        isLoading={isLoading}
        today={today}
      />
    </div>
  );
}

export default App;
