import React from "react";
import { shallow } from "enzyme";
import Weather from './Weather'
import { Provider } from "react-redux";
import store from "../store";


  describe("Weather Component", () => {
    it("Should render without errors", () => {
      expect(
        shallow(
          <Provider store={store}>
            <Weather/>
          </Provider>
        ).contains(<Weather />)
      ).toBe(true);
    });
  });

