
// =================== Encapsulation (Private fields, Getters/Setters) ===================
class BankAccount {
  #balance = 0;             // private field
  #history = [];            // private field

  constructor(owner, initialDeposit) {
    this.owner = owner;
    this.#balance = initialDeposit;
    this.#addToHistory(`Initial deposit: ${initialDeposit}`);
  }

  // Getter
  get balance() {
    return this.#balance;
  }

  // Setter with validation
  set balance(amount) {
    if (amount < 0) throw new Error('Balance cannot be negative');
    this.#balance = amount;
    this.#addToHistory(`Balance set to: ${amount}`);
  }

  // Private method
  #addToHistory(entry) {
    this.#history.push({ entry, date: new Date() });
  }

  getHistory() {
    return [...this.#history]; // return copy to prevent mutation
  }

  // Static method (belongs to class, not instance)
  static transfer(from, to, amount) {
    if (from.balance < amount) throw new Error('Insufficient funds');
    from.balance -= amount;
    to.balance += amount;
  }
}

// =================== Prototypes ===================
// Parent "class" (function constructor style to demonstrate prototype chain)
function Animal(name) {
  this.name = name;
}
Animal.prototype.eat = function () {
  console.log(`${this.name} is eating`);
};

// Child "class" inheriting via prototype
function Dog(name, breed) {
  Animal.call(this, name);  // call parent constructor
  this.breed = breed;
}
// Set up prototype chain
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
// Add method to child prototype
Dog.prototype.bark = function () {
  console.log(`${this.name} says Woof!`);
};

// =================== Closures ===================
function createCounter(initial = 0) {
  let count = initial;            // variable closed over
  return {
    increment: () => ++count,
    decrement: () => --count,
    getValue: () => count,
  };
}

// =================== Stack (Data Structure) ===================
class Stack {
  #items = [];
  push(element) {
    this.#items.push(element);
    return this;
  }
  pop() {
    if (this.isEmpty()) throw new Error('Stack is empty');
    return this.#items.pop();
  }
  peek() {
    return this.#items[this.#items.length - 1];
  }
  isEmpty() {
    return this.#items.length === 0;
  }
  size() {
    return this.#items.length;
  }
}

// =================== LinkedList (Data Structure) ===================
class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(value) {
    const node = new ListNode(value);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.length++;
    return this;
  }

  prepend(value) {
    const node = new ListNode(value);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head = node;
    }
    this.length++;
    return this;
  }

  toArray() {
    const result = [];
    let current = this.head;
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    return result;
  }
}

// =================== Modules (ES6) ===================
export const PI = 3.14159;
export function add(a, b) {
  return a + b;
}
export default { PI, add };