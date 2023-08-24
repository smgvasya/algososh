import { reverseStr } from "./utils";
import { ElementStates } from "../../types/element-states";

// describe("Алгоритм разворота строки", () => {
//   it("Все тесты успешно пройдены", () => {
//     expect(reverseStr('world')).toBe('dlrow');
//     expect(reverseStr('hello')).toBe('olleh');
//     expect(reverseStr('')).toBe('');
//     expect(reverseStr('h')).toBe('h');
//   });
// });
const mock = jest.fn();


describe("Алгоритм разворота строки", () => {
  it("Корректно с четным количеством символов", () => {
    expect(reverseStr("qw", mock)).toEqual([
      { item: "q", state: ElementStates.Modified },
      { item: "w", state: ElementStates.Modified },
    ]);
  });

  it("Корректно с нечетным количеством символов", () => {
    expect(reverseStr("world", mock)).toEqual("dlrow");
  });

  it("Корректно с одним символом", () => {
    expect(reverseStr("h", mock)).toEqual("h");
  });
  it("Корректно при пустой строке", () => {
    expect(reverseStr("", mock)).toEqual("");
  });
});
