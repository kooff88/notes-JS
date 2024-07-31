class LinkedListNode {
  constructor(val, next = null) {
    this.value = val;
    this.next = next;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(val) {
    const newNode = new LinkedListNode(val);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      return this;
    }

    this.tail.next = newNode;
    this.tail = newNode;

    return this;
  }

  pop() {
    let originalHead = this.head;
    if (this.head) {
      this.head = this.head.next;
    }
    return originalHead ? originalHead.value : null;
  }

  print() {
    let curretNode = this.head;
    while (curretNode) {
      console.log(curretNode.value);
      curretNode = curretNode.next;
    }
  }
}


let myQueue = new Queue();

myQueue.append('Tony');
myQueue.append('Alice');
myQueue.append('Understading React');
myQueue.print();
console.log('------');
console.log('poped Value: ' + myQueue.pop());
console.log('poped Value: ' + myQueue.pop());
myQueue.print();