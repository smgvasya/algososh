import { QueueType } from "../../types/types";

export class Queue<T> implements QueueType<T> {
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Превышена максимальная длина");
    }

    this.container[this.tail % this.size] = item;
    this.tail++;
    this.length++;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("В очереди нет элементов");
    }

    this.container[this.head % this.size] = null;
    this.head++;
    this.length--;
  };

  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("В очереди нет элементов");
    }

    return this.container[this.head % this.size];
  };

  isEmpty = () => this.length === 0;
}
