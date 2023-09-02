import renderer from "react-test-renderer";
import { Button } from "./button";

describe("Компонент Button", () => {
  it("Корректная отрисовка кнопки с текстом", () => {
    const tree = renderer.create(<Button text="Test" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Корректная отрисовка кнопки без текста", () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Корректная отрисовки заблокированной кнопки", () => {
    const tree = renderer.create(<Button disabled />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Корректная отрисовки кнопки с индикацией загрузки", () => {
    const tree = renderer.create(<Button isLoader />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
