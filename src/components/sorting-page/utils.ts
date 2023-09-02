import { swap } from "../../utils/index";
import { ElementStates } from "../../types/element-states";

type SortType = {
  item: number;
  state: ElementStates;
};

export const bubbleTestSort = (arr: SortType[], direction?: string) => {
  const { length } = arr;
  if (arr.length === 0) {
    return arr;
  }
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      if (
        direction === "asc"
          ? arr[j].item > arr[j + 1].item
          : arr[j].item < arr[j + 1].item
      ) {
        swap(arr, j, j + 1);
      }
    }
  }
  return arr;
};
export const selectionTestSort = (arr: SortType[], direction?: string) => {
  const { length } = arr;
  if (length === 0) {
    return arr;
  }
  for (let i = 0; i < length; i++) {
    let minInd = i;
    for (let j = i + 1; j < length; j++) {
      if (
        direction === "asc"
          ? arr[j].item < arr[minInd].item
          : arr[j].item > arr[minInd].item
      ) {
        minInd = j;
      }
      swap(arr, i, minInd);
    }
  }
  return arr;
};

export const testArr = [
  {
    item: 3,
    state: ElementStates.Default,
  },
  {
    item: 2,
    state: ElementStates.Default,
  },
  {
    item: 4,
    state: ElementStates.Default,
  },
  {
    item: 1,
    state: ElementStates.Default,
  },
  {
    item: 5,
    state: ElementStates.Default,
  },
  {
    item: 0,
    state: ElementStates.Default,
  },
];
export const resTestArrDesc = [
  {
    item: 5,
    state: ElementStates.Default,
  },
  {
    item: 4,
    state: ElementStates.Default,
  },
  {
    item: 3,
    state: ElementStates.Default,
  },
  {
    item: 2,
    state: ElementStates.Default,
  },
  {
    item: 1,
    state: ElementStates.Default,
  },
  {
    item: 0,
    state: ElementStates.Default,
  },
];

export const resTestArrAsc = [
  {
    item: 0,
    state: ElementStates.Default,
  },
  {
    item: 1,
    state: ElementStates.Default,
  },
  {
    item: 2,
    state: ElementStates.Default,
  },
  {
    item: 3,
    state: ElementStates.Default,
  },
  {
    item: 4,
    state: ElementStates.Default,
  },
  {
    item: 5,
    state: ElementStates.Default,
  },
];
