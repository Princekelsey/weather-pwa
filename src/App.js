import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "weather-icons/css/weather-icons.min.css";
import { API_KEY, APIXU_KEY } from "../src/utilities";
import store from "./store";
import { Provider } from "react-redux";

import Weather from "./components/Weather";
import Details from "./components/forcast/Details";
import Form from "./components/changeLocation/Form";

function App() {
  const [city, setCity] = useState("");
  const [weatherIcon, setIcon] = useState(null);
  const [humidity, setHumidity] = useState("");
  const [celcius, setCelcius] = useState("");
  const [temp, setTemp] = useState({ minTemp: "", maxTemp: "" });
  const [description, setDesc] = useState("");
  const [loaded2, setLoaded2] = useState(false);
  const [temp2, setTemp2] = useState("");
  const [icon2, setIcon2] = useState("");
  const [feelsLike, setFeel] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [visibility, setVisibility] = useState("");
  const [forecast, setForecast] = useState([]);
  const [cityName, setCityName] = useState("");
  const [cordinates, setCordinates] = useState({ lat: 0, long: 0 });
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [locationName, setLocationName] = useState("Tallinn");

  const handleChange = e => {
    setCityName(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = () => {
    getWeatherByCity2();
    weatherAPI3();
    setCityName("");
  };

  useEffect(() => {
    getCor();

    getWeather();
  }, [lat]);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getPosition);
    }
  };

  const getCor = () => {
    fetch("https://api.ip2loc.com/IxHtXPOBATWj1ktY7QjZGO6NYTBghl8J/detect")
      .then(response => response.json())
      .then(response => {
        if (response.success) {
          console.log(response.location.latitude);
          console.log(response.location.longitude);
          console.log(response.location.city);
          setLocationName(response.location.city);
          setLat(response.location.latitude);
          setLon(response.location.longitude);
        }
      });
  };

  const round = (value, decimals) => {
    return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
  };

  const getPosition = position => {
    setCordinates({
      ...cordinates,
      lat: position.coords.latitude,
      long: position.coords.longitude
    });
    console.log("Lat", position.coords.latitude);
    console.log("long", position.coords.longitude);
  };

  const getWeatherByLocation = () => {};

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

  const getWeather = () => {
    // getWeatherByPosition();
    getByLocation2();
    getLocation();
    // getWeather3();
  };

  const getByLocation2 = () => {
    setLoading(true);
    const URL = `http://api.apixu.com/v1/forecast.json?key=${APIXU_KEY}&q=${locationName} &days=3`;
    fetch(URL)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        setLoading(false);
        setLoaded2(true);
        setTemp2(Math.floor(response.current.temp_c));
        setFeel(Math.floor(response.current.feelslike_c));
        setIcon2(response.current.condition.icon);
        setHumidity(response.current.humidity);
        setVisibility(response.current.vis_km);
        setForecast(response.forecast.forecastday);
      });
  };

  const weatherAPI3 = async () => {
    setLoading(true);
    const URL = `http://api.apixu.com/v1/forecast.json?key=${APIXU_KEY}&q=${cityName} &days=3`;
    const api_call = await fetch(URL);
    const response = await api_call.json();
    console.log(response);
    setLoading(false);
    setLoaded2(true);
    setTemp2(Math.floor(response.current.temp_c));
    setFeel(Math.floor(response.current.feelslike_c));
    setIcon2(response.current.condition.icon);
    setHumidity(response.current.humidity);
    setVisibility(response.current.vis_km);
    setForecast(response.forecast.forecastday);
  };

  const getWeatherByPosition = () => {
    setLoading(true);
    const URL = `http://api.openweathermap.org/data/2.5/weather?lat=${
      cordinates.lat
    }&lon=${cordinates.long}&appid=${API_KEY}`;

    fetch(URL)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        setLoading(false);
        // setLoaded1(true);
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
      });
  };

  const getWeatherByCity2 = async () => {
    // setLoading(true);
    const URL = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;
    const api_call = await fetch(URL);
    const response = await api_call.json();
    console.log(response);
    // setLoading(false);
    // setLoaded1(true);
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

  const calCelcius = temp => {
    const cel = Math.floor(temp - 273.15);
    return cel;
  };

  return (
    <Provider store={store}>
      <div className="container ">
        <Weather
          city={city}
          celcius={celcius}
          temp={temp}
          description={description}
          weatherIcon={weatherIcon}
          temp2={temp2}
          icon2={icon2}
          isLoading={isLoading}
          today={today}
          loaded2={loaded2}
          calCelcius={calCelcius}
        />
        <Details
          weatherIcon={weatherIcon}
          feelsLike={feelsLike}
          humidity={humidity}
          visibility={visibility}
          temp={temp}
          temp2={temp2}
          celcius={celcius}
          description={description}
          isLoading={isLoading}
          forecast={forecast}
        />
        <Form
          handleChange={handleChange}
          cityName={cityName}
          handleSubmit={handleSubmit}
        />
      </div>
    </Provider>
  );
}

export default App;
