const { NotImplementedError } = require("../extensions/index.js");

// const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class Node {
	constructor(somthng) {
		this.value = somthng;
		this.next = null;
	}
}

class Queue {
	constructor() {
		this.head = null;
		this.tail = null;
	}

	getUnderlyingList() {
		return this.head;
	}

	enqueue(element) {
		const newElement = new Node(element);
		if (this.head === null) {
			this.head = newElement;
			this.tail = newElement;
		} else {
			this.tail.next = newElement;
			this.tail = newElement;
		}
	}

	dequeue() {
		if (this.head === null && this.tail === null) {
			return undefined;
		} else {
			const currentHead = this.head;
			this.head = this.head.next;
			currentHead.next = null;
			if (this.head === null) {
				this.tail = null;
			}
			return currentHead.value;
		}
	}
}

module.exports = {
	Queue,
};
