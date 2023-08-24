import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../utils/constants/delays";
import { ElementStates } from "../../types/element-states";
import { swap, delay, swapIndexState } from "../../utils/index";
import { StrReversType } from "../../types/types";

// const elementState

export const reverseStr = async (
  str: string,
  callback?: (arr: StrReversType[]) => void
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
