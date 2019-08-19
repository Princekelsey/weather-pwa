import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "weather-icons/css/weather-icons.min.css";
import store from "./store";
import { Provider } from "react-redux";

import Weather from "./components/Weather";
import Details from "./components/forcast/Details";
import Form from "./components/changeLocation/Form";

function App() {
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

  const calCelcius = temp => {
    const cel = Math.floor(temp - 273.15);
    return cel;
  };

  return (
    <Provider store={store}>
      <div className="container ">
        <Weather calCelcius={calCelcius} />
        <Details calCelcius={calCelcius} />
        <Form />
      </div>
    </Provider>
  );
}

export default App;
