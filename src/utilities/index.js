import { createStore, applyMiddleware } from "redux";
import weatherReducer from "../reducer/weatherReducer";
import { middleware } from "../store";
// import {initialState} from '../reducer/weatherReducer'

export const API_KEY = "30f2e970b268622a6f540af7de8dff1b";
export const WORLDWEATHER = "d77a9693cc4941448ce202449191708";
export const APIXU_KEY = "28eebc0ec56a40d6a59190936191708";

export const testStore = initialState => {
  const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
  return createStoreWithMiddleware(weatherReducer, initialState);
};
