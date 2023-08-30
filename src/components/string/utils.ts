import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../utils/constants/delays";
import { ElementStates } from "../../types/element-states";
import { swap, delay, swapIndexState } from "../../utils/index";
import { ReversType } from "../../types/types";

export const reverseStr = async (
  str: string,
  callback?: (arr: ReversType<string>[]) => void
) => {
  const arr = str
    .split("")
    .map((item) => ({ item, state: ElementStates.Default }));
  const { length } = arr;

  let start = 0;
  let end = length - 1;
  callback && callback([...arr]);

  while (start <= end) {
    await delay(DELAY_IN_MS);
    swapIndexState([arr[start], arr[end]], ElementStates.Changing);
    callback && callback([...arr]);
    await delay(SHORT_DELAY_IN_MS);
    swap(arr, start, end);
    swapIndexState([arr[start], arr[end]], ElementStates.Modified);
    callback && callback([...arr]);
    start++;
    end--;
  }
};

export const swapTestStr= (arr: string[], a: number, b: number): void => {
  const temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
};

export const reverseTestStr = (str: string): string[] => {
  const arr = str.split("");
  const { length } = arr;
  let start = 0;
  let end = length - 1;
  while (start <= end) {
    swapTestStr(arr, start, end);
    start++;
    end--;
  }
  return arr
};
