import React from "react";
import Error from "./Error";
import renderer from "react-test-renderer";

it("matches the snapshot", () => {
  const tree = renderer.create(<Error />).toJSON();
  expect(tree).toMatchSnapshot();
});
