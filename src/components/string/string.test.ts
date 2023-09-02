import { reverseTestStr } from "./utils";

describe("Алгоритм разворота строки", () => {
  it("Корректно с четным количеством символов", () => {
    expect(reverseTestStr("qwerty")).toEqual(["y", "t", "r", "e", "w", "q"]);
  });

  it("Корректно с нечетным количеством символов", () => {
    expect(reverseTestStr("world")).toEqual(["d", "l", "r", "o", "w"]);
  });

  it("Корректно с одним символом", () => {
    expect(reverseTestStr("H")).toEqual(["H"]);
  });

  it("Корректно при пустой строке", () => {
    expect(reverseTestStr("")).toEqual([]);
  });
});
