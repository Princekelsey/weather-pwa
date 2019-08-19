import {
  GET_LOCATION,
  GET_WEATHER_BY_LOCATION1,
  GET_WEATHER_BY_LOCATION2,
  GET_WEATHER_BY_CITY1,
  GET_WEATHER_BY_CITY2,
  SET_ERROR,
  SET_LOADING
} from "./types";
import { API_KEY, APIXU_KEY } from "../utilities/index";
import axios from "axios";

export const getWeatherByLocation1 = (lat, lon) => async dispatch => {
  const URL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  dispatch(setLoading());
  await axios
    .get(URL)
    .then(res => {
      const file = {
        cityName: res.data.name,
        description: res.data.weather[0].description,
        temp: res.data.main.temp,
        icon: res.data.weather[0].icon
      };
      dispatch({
        type: GET_WEATHER_BY_LOCATION1,
        payload: file
      });
    })
    .catch(err => {
      dispatch({
        type: SET_ERROR,
        payload: err
      });
    });
};

export const getWeatherByLocation2 = locationName => async dispatch => {
  const URL = `http://api.apixu.com/v1/forecast.json?key=${APIXU_KEY}&q=${locationName} &days=3`;
  dispatch(setLoading());
  await axios
    .get(URL)
    .then(res => {
      const file = {
        temp: Math.floor(res.data.current.temp_c),
        feel: Math.floor(res.data.current.feelslike_c),
        icon: res.data.current.condition.icon,
        humidity: res.data.current.humidity,
        visibility: res.data.current.vis_km,
        forecast: res.data.forecast.forecastday
      };
      dispatch({
        type: GET_WEATHER_BY_LOCATION2,
        payload: file
      });
    })
    .catch(err => {
      dispatch({
        type: SET_ERROR,
        payload: err
      });
    });
};

export const setLoading = () => ({
  type: SET_LOADING
});

export const getWeatherByCity = cityName => async dispatch => {
  const URL = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;
  dispatch(setLoading());
  await axios
    .get(URL)
    .then(res => {
      dispatch({
        type: GET_WEATHER_BY_CITY1,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: SET_ERROR,
        payload: err
      });
    });
};

export const getWeatherByCity2 = cityName => async dispatch => {
  const URL = `http://api.apixu.com/v1/forecast.json?key=${APIXU_KEY}&q=${cityName} &days=3`;
  dispatch(setLoading());
  await axios
    .get(URL)
    .then(res => {
      dispatch({
        type: GET_WEATHER_BY_CITY2,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: SET_ERROR,
        payload: err
      });
    });
};

export const getUserLocation = () => async dispatch => {
  const URL = "https://api.ip2loc.com/IxHtXPOBATWj1ktY7QjZGO6NYTBghl8J/detect";
  dispatch(setLoading());
  await axios
    .get(URL)
    .then(res => {
      const file = {
        lat: res.data.location.latitude,
        lon: res.data.location.longitude,
        locationName: res.data.location.city
      };
      dispatch({
        type: GET_LOCATION,
        payload: file
      });
    })
    .catch(err => {
      dispatch({
        type: SET_ERROR,
        payload: err
      });
    });
};
