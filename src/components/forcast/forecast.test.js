import React from "react";
import { shallow } from "enzyme";
import Details from "./Details";
import { Provider } from "react-redux";
import store from "../../../src/store";

describe("Forecast Component", () => {
  it("Should render without errors", () => {
    expect(
      shallow(
        <Provider store={store}>
          <Details />
        </Provider>
      ).contains(<Details />)
    ).toBe(true);
  });
});
