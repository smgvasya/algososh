import { StackType } from "../../types/types";

export class Stack<T> implements StackType<T> {
  private container: T[] = [];
  size = () => this.container.length;

  push(item: T) {
    this.container.push(item);
  };

  pop(){
    if (this.size() !== 0) {
      this.container.pop();
    }
  };

  peak() {
    if (this.size()) {
      return this.container[this.size() - 1];
    }
    return null;
  };

  clear() {
    this.container = [];
  }

  getElements(){
    return this.container;
  };
}
