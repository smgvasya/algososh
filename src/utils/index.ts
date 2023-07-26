import { StrReversType } from "../types/types";

const swap = (arr: StrReversType[] | number[], a: number, b: number): void => {
  const temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
};

const defaultCompare = (a: number, b: number): number | boolean => {
  if (a === b) {
    return 0;
  }
  return a > b && -1;
}

const delay = (ms: number) => {
  return new Promise((res) => setTimeout(res, ms));
};

export { swap, defaultCompare, delay };

