import React from "react";

const Weather = ({
  city,
  country,
  celcius,
  temp,
  description,
  weatherIcon,
  isLoading,
  temp2,
  icon2,
  today
}) => {
  return (
    <div className="container  py-4 ">
      {isLoading && <h1>Loading --</h1>}
      {!isLoading && (
        <div className="bg-transparent text-white">
          <div className=" text-white py-4 ">
            <h1>
              {city}, {country}
            </h1>
            <h4 className="">{description}</h4>
            <h6>{today}</h6>
          </div>
          <div className="">
            {/* <i className="wi wi-day-sunny display-3" /> */}
            <img
              src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
              alt="Weather icon"
            />
            <img className="image" src={icon2} alt="Weather icon2" />

            <h1>
              <span className="px-4 ">{celcius}&deg;</span>
              <span className="px-4 ">{temp2}&deg;</span>
            </h1>
            <hr className="hr-ab " />
            {minMaxTemp(temp.minTemp, temp.maxTemp)}
            <hr className="hr-ab " />
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
