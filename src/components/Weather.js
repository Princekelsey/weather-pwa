import React from "react";

const Weather = () => {
  return (
    <div className="container">
      <div className="card">
        <h1>London</h1>
        <h4 className="py-2">Slow Rain</h4>
        <h5 className="py-4">
          <i className="wi wi-day-sunny display-3" />
        </h5>

        <h5>Currrent Temp</h5>
        <h2>
          <span className="px-4 ">25&deg;</span>
          <span className="px-4 ">35&deg;</span>
        </h2>
        {minMaxTemp(25, 19)}
      </div>
    </div>
  );
};

// min and max tem
const minMaxTemp = (min, max) => {
  return (
    <div className="py-4">
      <h5>Average Temp</h5>
      <h3>
        <span className="px-4">{min}&deg;</span>
        <span className="px-4">{max}&deg;</span>
      </h3>
    </div>
  );
};

export default Weather;
