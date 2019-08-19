import React from "react";
import Spinner from "../../utilities/Spinner";
import { useSelector } from "react-redux";

const Details = ({ calCelcius }) => {
  const weatherIcon = useSelector(state => state.openWeather.icon);
  const feelsLike = useSelector(state => state.apixuWeather.feel);
  const humidity = useSelector(state => state.apixuWeather.humidity);
  const visibility = useSelector(state => state.apixuWeather.visibility);
  const temp1 = useSelector(state => calCelcius(state.openWeather.temp));
  const temp2 = useSelector(state => state.apixuWeather.temp);
  const forecast = useSelector(state => state.apixuWeather.forecast);
  const isLoading = useSelector(state => state.isLoading);
  const description = useSelector(state => state.openWeather.description);

  return (
    <div>
      {forecast.length === 0 && !isLoading ? (
        <Spinner />
      ) : (
        <div className=" card-deck ">
          <div className="card bg-transparent shadow-lg">
            <div className="card-body">
              <h5 className="card-title  text-warning ">Details</h5>
              <hr className="hr-ab" />
              <div className="d-flex justify-content-center">
                <div>
                  <img
                    src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
                    className=""
                    alt="..."
                  />
                </div>

                <div className="ml-4 text-center">
                  <p className="card-text text-white ">
                    Feels like : {feelsLike}&deg;
                  </p>
                  <p className="card-text text-white ">Humdity : {humidity}%</p>
                  <p className="card-text text-white ">
                    Visibility : {visibility} km
                  </p>
                </div>
                <div />
              </div>

              <p className="card-text py-4 text-white">
                Today - {description} currently, it's {temp1}&deg; and {temp2}
                &deg; from two weather forecast
              </p>
            </div>
          </div>
          <div className="card bg-transparent shadow-lg ">
            <div className="card-body">
              <h5 className="card-title text-warning">Forecast</h5>
              <hr className="hr-ab" />
              <div className="d-flex justify-content-between align-items-center text-center text-white">
                {forecast.map(day => {
                  return (
                    <div key={day.day.uv}>
                      <div className="py-4">{day.date}</div>
                      <div>
                        <img
                          src={day.day.condition.icon}
                          className=""
                          alt="..."
                        />
                      </div>

                      <div className="">
                        {Math.floor(day.day.avgtemp_c)}&deg;
                      </div>
                      <p>{day.day.condition.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
