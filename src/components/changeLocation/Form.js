import React from "react";

const Form = ({ handleChange, handleSubmit, cityName }) => {
  return (
    <div
      className="modal fade"
      id="formModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              City Name
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="input-group input-group-sm mb-3">
              <div className="input-group-prepend" />
              <input
                type="text"
                className="form-control"
                placeholder="City Name"
                onChange={handleChange}
                value={cityName}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-dismiss="modal"
              onClick={handleSubmit}
            >
              Get Weather
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
