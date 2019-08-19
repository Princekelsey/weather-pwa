import {
  GET_LOCATION,
  GET_WEATHER_BY_LOCATION1,
  GET_WEATHER_BY_LOCATION2,
  GET_WEATHER_BY_CITY1,
  GET_WEATHER_BY_CITY2,
  SET_ERROR,
  SET_LOADING
} from "../actions/types";

export const initialState = {
  openWeather: {
    cityName: "",
    description: "",
    temp: "",
    icon: ""
  },
  apixuWeather: {
    temp: "",
    feel: "",
    icon: "",
    humidity: "",
    visibility: "",
    forecast: []
  },
  isLoading: false,
  error: null,
  cordinates: { lat: 0, lon: 0, locationName: "Tallinn" }
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: true
      };

    case GET_LOCATION:
      return {
        ...state,
        cordinates: payload
      };

    case GET_WEATHER_BY_LOCATION1:
      return {
        ...state,
        isLoading: false,
        openWeather: payload
      };

    case GET_WEATHER_BY_LOCATION2:
      return {
        ...state,
        isLoading: false,
        apixuWeather: payload
      };

    case GET_WEATHER_BY_CITY1:
      return {
        ...state,
        isLoading: false,
        openWeather: payload
      };

    case GET_WEATHER_BY_CITY2:
      return {
        ...state,
        isLoading: false,
        apixuWeather: payload
      };

    case SET_ERROR:
      return {
        ...state,
        isLoading: false,
        error: payload
      };

    default:
      return state;
  }
}
