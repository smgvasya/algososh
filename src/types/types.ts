import { ElementStates } from "../types/element-states";

export type StrReversType = {
  item?: string | number;
  state?: ElementStates;
};

// export type ReversType<T> = {
//   item: T;
//   state: ElementStates;
// };

export type StackType<T> = {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  clear: () => void;
  getElements: () => T[];
  size: () => number;
};

export type QueueType<T> = {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
  clear: () => void;
  getElements: () => (T | null)[];
  getHead: () => number;
  getTail: () => number;
  isEmpty: () => boolean;
};

export type LinkedListType<T> = {
  append: (element: T) => void;
  insertAt: (element: T, position: number) => void;
  print: () => void;
  removeAt: (index: number) => void;
  removeHead: () => void;
  removeTail: () => void;
  removeByIndex: (index: number) => void;
  getSize: () => number;
};
