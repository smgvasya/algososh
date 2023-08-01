import { ElementStates } from "../types/element-states";

export type StrReversType = {
  item: string | number;
  state?: ElementStates;
};

export type StackType<T> = {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  clear: () => void;
  getElements: () => T[];
  size: () => number;
};
