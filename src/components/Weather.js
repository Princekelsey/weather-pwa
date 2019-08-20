import React, { useEffect, useState } from "react";
import Spinner from "../utilities/Spinner";
import { useDispatch, useSelector } from "react-redux";
import Error from "../components/error/Error";
import {
  getUserLocation,
  getWeatherByLocation1,
  getWeatherByLocation2
} from "../actions/weatherActions";

const Weather = ({ calCelcius, today }) => {
  const [coordinates, setCoordinates] = useState({ lati: 0, long: 0 });
  const [error, setError] = useState(false);

  // get state from store
  const city = useSelector(state => state.openWeather.cityName);
  const errorLoad = useSelector(state => state.error);
  const description = useSelector(state => state.openWeather.description);
  const temp1 = useSelector(state => calCelcius(state.openWeather.temp));
  const temp2 = useSelector(state => state.apixuWeather.temp);
  const isLoading = useSelector(state => state.isLoading);
  const locationName = useSelector(state => state.cordinates.locationName);
  const weatherIcon = useSelector(state => state.apixuWeather.icon);

  // dispatch functions
  const dispatch = useDispatch();
  const location = () => dispatch(getUserLocation());
  const getWeatherForLocation2 = name => dispatch(getWeatherByLocation2(name));
  const getWeatherForLocation = (lat, lon) =>
    dispatch(getWeatherByLocation1(lat, lon));

  useEffect(() => {
    getLocation();
    location();
    getWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coordinates.lati]);

  // initial to get weather on app load
  const getWeather = () => {
    getWeatherForLocation(coordinates.lati, coordinates.long);
    getWeatherForLocation2(locationName);
  };

  // get location coordinates
  const getLocation = () => {
    const navigation = navigator.geolocation;
    if (navigation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      setError(true);
    }
  };

  const showPosition = position => {
    setCoordinates({
      ...coordinates,
      lati: position.coords.latitude,
      long: position.coords.longitude
    });
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

          <img
            src={weatherIcon}
            className="image"
            alt="icon"
          />

          <div className="">
            

            <h1>
              {temp1 ? <span className="px-4 ">{temp1}&deg;</span> : null}
              {temp2 ?  <span className="px-4 ">{temp2}&deg;</span>: null}
              
            
            </h1>
          </div>
        </div>
      )}
      {error || errorLoad ? <Error /> : null}
    </div>
  );
};

export default Weather;
