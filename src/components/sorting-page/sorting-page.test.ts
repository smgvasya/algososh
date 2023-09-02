import {
  bubbleTestSort,
  selectionTestSort,
  testArr,
  resTestArrDesc,
  resTestArrAsc,
} from "./utils";

describe("Sorting component testing", () => {
  it("Корректно для пустого массива. Bubble", () => {
    expect(bubbleTestSort([])).toEqual([]);
  });

  it("Корректно для пустого массива. Selection", () => {
    expect(selectionTestSort([])).toEqual([]);
  });

  it("Корректно для массива из одного элемента. Bubble", () => {
    expect(bubbleTestSort([testArr[0]])).toEqual([resTestArrAsc[3]]);
  });

  it("Корректно для массива из одного элемента. Selection", () => {
    expect(selectionTestSort([testArr[0]])).toEqual([resTestArrAsc[3]]);
  });

  it("Корректно для массива из нескольких элементов. Bubble. Возрастание", () => {
    expect(bubbleTestSort(testArr, "asc")).toEqual(resTestArrAsc);
  });

  it("Корректно для массива из нескольких элементов. Selection. Возрастание", () => {
    expect(selectionTestSort(testArr, "asc")).toEqual(resTestArrAsc);
  });

  it("Корректно для массива из нескольких элементов. Bubble. Убывание", () => {
    expect(bubbleTestSort(testArr, "desc")).toEqual(resTestArrDesc);
  });

  it("Корректно для массива из нескольких элементов. Selection. Убывание", () => {
    expect(selectionTestSort(testArr, "desc")).toEqual(resTestArrDesc);
  });
});
