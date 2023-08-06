import { StrReversType } from "../types/types";
import { ElementStates } from "../types/element-states";

const swap = (arr: StrReversType[] | number[], a: number, b: number): void => {
  const temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
};

const swapIndexState = (indexes: StrReversType[], state: ElementStates) => {
  indexes.forEach((index) => (index.state = state));
};

const delay = (ms: number) => {
  return new Promise((res) => setTimeout(res, ms));
};

const randomArr = (minLen: number, maxLen: number, maxNum: number) => {
  const arr = [];
  const arrLen = new Array(
    Math.floor(Math.random() * (maxLen - minLen)) + minLen
  );

  for (let i = 0; i < arrLen.length; i++) {
    arr.push(Math.floor(Math.random() * (maxNum + 1)));
  }

  const columns = arr.map((value) => ({
    value,
    state: ElementStates.Default,
  }));

  return columns;
};

export { swap, delay, randomArr, swapIndexState };
