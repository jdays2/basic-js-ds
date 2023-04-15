const { NotImplementedError } = require("../extensions/index.js");

// const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class Node {
	constructor(data) {
		this.data = data;
		this.left = null;
		this.right = null;
	}
}

class BinarySearchTree {
	constructor() {
		this._root = null;
	}
	add(value) {
		let newItem = new Node(value);
		if (!this._root) {
			this._root = newItem;
			return;
		}
		let currentItem = this._root;
		while (currentItem) {
			if (newItem.data < currentItem.data) {
				if (!currentItem.left) {
					currentItem.left = newItem;
					return;
				}
				currentItem = currentItem.left;
			} else {
				if (!currentItem.right) {
					currentItem.right = newItem;
					return;
				}
				currentItem = currentItem.right;
			}
		}
	}

	root() {
		if (this._root !== null) {
			return this._root;
		}
		return null;
	}

	has(value, node = this._root) {
		let k = value;
		if (!node) {
			return false;
		}
		if (node.data === value) {
			return true;
		}

		return this.has(k, node.left) || this.has(k, node.right);
	}

	find(value, node = this._root) {
		if (!value) {
			return null;
		}
		let k = value;
		if (!node) {
			return null;
		}
		if (node.data === value) {
			return node;
		}

		return this.find(k, node.left) || this.find(k, node.right);
	}

	min() {
		let currentItem = this._root;
		while (currentItem) {
			if (currentItem.left) {
				currentItem = currentItem.left;
			} else {
				return currentItem.data;
			}
		}
	}

	max() {
		let currentItem = this._root;
		while (currentItem) {
			if (currentItem.right) {
				currentItem = currentItem.right;
			} else {
				return currentItem.data;
			}
		}
	}

	remove(data) {
		this._root = this.tryRemove(this._root, data);
	}

	//сложнейшая шляпа:
	tryRemove(currentNode, data) {
		if (!currentNode) {
			return null;
		}

		if (data === currentNode.data) {
			if (!currentNode.left && !currentNode.right) {
				//Лист
				return null;
			}
			if (!currentNode.left) {
				//левого
				return currentNode.right;
			}
			if (!currentNode.right) {
				//нет правого
				return currentNode.left;
			}

			//два дочерних узла
			const tempNode = this.getMinimum(currentNode.right);
			currentNode.data = tempNode.data;
			currentNode.right = this.tryRemove(currentNode.right, tempNode.data);
			return currentNode;
		}

		if (data < currentNode.data) {
			//ищем в левом поддереве
			currentNode.left = this.tryRemove(currentNode.left, data);
			return currentNode;
		}

		//ищем в правом поддереве
		currentNode.right = this.tryRemove(currentNode.right, data);
		return currentNode;
	}

	getMinimum(currentNode) {
		while (currentNode.left) {
			currentNode = currentNode.left;
		}
		return currentNode;
	}
}

module.exports = {
	BinarySearchTree,
};
