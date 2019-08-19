import React, { useEffect } from "react";
import Spinner from "../utilities/Spinner";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserLocation,
  getWeatherByLocation1,
  getWeatherByLocation2
} from "../actions/weatherActions";

const Weather = ({ calCelcius, today }) => {
  // get state from store
  const city = useSelector(state => state.openWeather.cityName);
  const description = useSelector(state => state.openWeather.description);
  const temp1 = useSelector(state => calCelcius(state.openWeather.temp));
  const temp2 = useSelector(state => state.apixuWeather.temp);
  const isLoading = useSelector(state => state.isLoading);
  const lat = useSelector(state => state.cordinates.lat);
  const lon = useSelector(state => state.cordinates.lon);
  const locationName = useSelector(state => state.cordinates.locationName);

  // dispatch functions
  const dispatch = useDispatch();
  const location = () => dispatch(getUserLocation());
  const getWeatherForLocation2 = name => dispatch(getWeatherByLocation2(name));
  const getWeatherForLocation = (lat, lon) =>
    dispatch(getWeatherByLocation1(lat, lon));

  useEffect(() => {
    location();
    getWeather();
  }, [lat]);

  // initial to get weather on app load
  const getWeather = () => {
    getWeatherForLocation(lat, lon);
    getWeatherForLocation2(locationName);
  };

  return (
    <div className="container text-center py-4 landing">
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="bg-transparent text-white">
          <div className=" text-white py-4 ">
            <h1>
              {city}
              <span>
                <button
                  type="button"
                  className="btn btn-secondary ml-4 "
                  data-toggle="modal"
                  data-target="#formModal"
                >
                  Change location
                </button>
              </span>
            </h1>

            <h4 className=""> {description}</h4>
            <h6>{today}</h6>
          </div>
          <div className="">
            {/* <i className="wi wi-day-sunny display-3" /> */}

            <h1>
              <span className="px-4 ">{temp1}&deg;</span>
              <span className="px-4 ">{temp2}&deg;</span>
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};

// min and max tem
const minMaxTemp = (min, max) => {
  return (
    <div className="py-4">
      <h6>Average Temperature</h6>
      <h3>
        <span className="px-4">{min}&deg;</span>
        <span className="px-4">{max}&deg;</span>
      </h3>
    </div>
  );
};

export default Weather;
