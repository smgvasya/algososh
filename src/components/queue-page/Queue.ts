import { QueueType } from "../../types/types";

export class Queue<T> implements QueueType<T> {
  container: (T | null)[] = [];
  head = 0;
  tail = 0;
  private readonly size: number = 0;
  length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue(item: T) {
    if (this.length >= this.size) {
      throw new Error("Элементов сюда, ты не добавишь больше");
    }

    this.container[this.tail % this.size] = item;
    this.tail++;
    this.length++;
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error("В очереди пустоту, вижу я");
    }
    const firstElem = this.container[this.head % this.size];
    this.container[this.head % this.size] = null;

    this.head++;
    this.length--;
    return firstElem;
  }

  peak() {
    return this.container[this.head % this.size];
  }

  clear() {
    this.length = 0;
    this.head = 0;
    this.tail = 0;
    this.container = Array(this.size);
  }

  getElements() {
    return this.container;
  }

  getHead() {
    return this.head;
  }

  getTail() {
    return this.tail - 1;
  }

  isEmpty = () => this.length === 0;
}
