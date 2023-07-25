const swap = (arr: number[], a: number, b: number): void => {
  const temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
};

const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
};

const defaultCompare = (a: any, b: any): number => {
  if (a === b) {
    return 0;
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
};

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export { swap, defaultCompare, delay };
