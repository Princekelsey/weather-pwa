import * as actions from "../actions/weatherActions";
import {
  SET_LOADING,
  SET_ERROR
} from "../actions/types";

import configurestore from "redux-mock-store";
import thunkMiddleware from "redux-thunk";
import fetchMock from "fetch-mock";

export const mockStore = configurestore([thunkMiddleware]);

export const API_KEY = "30f2e970b268622a6f540af7de8dff1b";

it("handles api request", () => {
  const store = mockStore();
  store.dispatch(actions.getWeatherByLocation1());
  const action = store.getActions();
  const expectedAction = {
    type: SET_LOADING
  };

  expect(action[0]).toEqual(expectedAction);
});

describe("Test thunk action creator", () => {

    let store;

    beforeEach(() => {
        store = mockStore();
    });

    afterEach(() => {
        fetchMock.reset();
        fetchMock.restore();
    });

    


  it("expected actions should be dispatched on failed request", () => {
    const store = mockStore({});
    const expectedActions = [SET_LOADING, SET_ERROR];
    // Mock the fetch() global to always return the same value for GET
    // requests to all URLs.
    fetchMock.get("*", { response: 404 });

    return store.dispatch(actions.getWeatherByLocation1()).then(() => {
      const actualActions = store.getActions().map(action => action.type);
      expect(actualActions).toEqual(expectedActions);
    });
  });
});
