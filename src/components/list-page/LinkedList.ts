import { LinkedListType } from "../../types/types";

export class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

export class LinkedList<T> implements LinkedListType<T> {
  private head: Node<T> | null;
  private size: number;
  constructor() {
    this.head = null;
    this.size = 0;
  }

  insertAt(element: T, index: number) {
    if (index < 0 || index > this.size) {
      console.log("Enter a valid index");
      return;
    } else if (this.head) {
      const node = new Node(element);
      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let curr = this.head;
        let currIndex = 0;

        while (currIndex + 1 < index && curr.next) {
          curr = curr.next;
          currIndex += 1;
        }

        const trav = curr.next;
        curr.next = node;
        node.next = trav;
      }

      this.size++;
    }
  }

  append(element: T) {
    const node = new Node(element);
    let current;

    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }

      current.next = node;
    }
    this.size++;
  }

  getSize() {
    return this.size;
  }

  print() {
    let curr = this.head;
    let res = "";
    while (curr) {
      res += `${curr.value} `;
      curr = curr.next;
    }
    console.log(res);
  }

  removeAt(index: number) {
    if (index < 0 || index > this.size) {
      throw new Error("Enter a valid index");
    }

    let curr = this.head;

    if (curr && index === 0) {
      this.head = curr.next;
    } else {
      for (let i = 0; curr != null && i < index - 1; i += 1) {
        curr = curr.next;
      }

      if (curr == null || curr.next == null) {
        return null;
      }

      const { next } = curr.next;

      curr.next = next;
    }

    this.size -= 1;
  }
}
