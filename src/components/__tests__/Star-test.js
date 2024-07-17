import React from "react";
import renderer from "react-test-renderer";
import { Star } from "@/components/Star";

jest.mock("@expo/vector-icons/AntDesign", () =>
  jest.requireActual("react-native-vector-icons/AntDesign")
);

describe("Star Component", () => {
  it("renders the favorite star", async () => {
    const tree = renderer.create(<Star isFavorite size={24} />);
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(tree.toJSON()).toMatchSnapshot();

    const icon = tree.root.findByType("Text");
    expect(icon.props.style[0].fontSize).toEqual(24);
  });

  it("renders the non-favorite star", async () => {
    const tree = renderer.create(<Star isFavorite={false} size={50} />);
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(tree.toJSON()).toMatchSnapshot();

    const icon = tree.root.findByType("Text");
    expect(icon.props.style[0].fontSize).toEqual(50);
  });
});
