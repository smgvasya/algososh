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
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
  clear: () => void;
  getElements: () => (T | null)[];
  getHead: () => number;
  getTail: () => number;
  isEmpty: () => boolean;
};
