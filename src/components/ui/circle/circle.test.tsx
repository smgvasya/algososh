import renderer from "react-test-renderer";
import { ElementStates } from "../../../types/element-states";

import { Circle } from "./circle";

describe("Компонент Circle", () => {
  it("Корректная отрисовка элемента без буквы", () => {
    const tree = renderer.create(<Circle />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Корректная отрисовка элемента с буквами", () => {
    const tree = renderer.create(<Circle letter="V" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Корректная отрисовка элемента с head", () => {
    const tree = renderer.create(<Circle head="head" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Корректная отрисовка элемента с react-элементом в head", () => {
    const tree = renderer.create(<Circle head={<Circle />} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Корректная отрисовка элемента с tail", () => {
    const tree = renderer.create(<Circle tail="tail" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Корректная отрисовка элемента с react-элементом в tail", () => {
    const tree = renderer.create(<Circle tail={<Circle />} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Корректная отрисовка элемента с index", () => {
    const tree = renderer.create(<Circle index={0} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Корректная отрисовка элемента с пропом isSmall === true", () => {
    const tree = renderer.create(<Circle isSmall={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Корректная отрисовка элемента в состоянии default", () => {
    const tree = renderer
      .create(<Circle letter="V" state={ElementStates.Default} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("Корректная отрисовка элемента в состоянии changing", () => {
    const tree = renderer
      .create(<Circle letter="V" state={ElementStates.Changing} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("Корректная отрисовка элемента в состоянии modified", () => {
    const tree = renderer
      .create(<Circle letter="V" state={ElementStates.Modified} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
