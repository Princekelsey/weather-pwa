import { GET_WEATHER_BY_LOCATION1 } from "../actions/types";
import reducer from "./weatherReducer";
import { initialState } from "./weatherReducer";

describe("Weather Reducer", () => {
  it("Should return default state ", () => {
    const newState = reducer(undefined, {});
    expect(newState).toEqual(initialState);
  });

  it("Should return new state if received a type", () => {
    const file = {
      cityName: "test",
      description: "rain",
      temp: "24",
      icon: "df"
    };
    const response = {
      ...initialState,
      isLoading: false,
      openWeather: file
    };
    const newState = reducer(undefined, {
      type: GET_WEATHER_BY_LOCATION1,
      payload: file
    });
    expect(newState).toEqual(response);
  });
});
