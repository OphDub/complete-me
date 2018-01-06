const Node = require('../lib/node');

class Trie {
  constructor () {
    this._count = 0;
    this.root = new Node (null);
  }

  get count() {
    return this._count;
  }

  insert(string) {
    let currNode = this.root;
    let validation = Number.isInteger(string);

    if (validation) {
      return null;
    }

    this.insertHelper(string, currNode);
  }

  insertHelper(string, node) {
    let newString;

    if (string.length === 0) {
      if (!node.wordEnd) {
        node.wordEnd = true;
        this._count++;
      }

      return;
    }

    if (!node.children[string[0]]) {
      let newNode = new Node(string[0]);

      node.children[string[0]] = newNode;
    }

    newString = string.slice(1);
    node = node.children[string[0]];

    this.insertHelper(newString, node);
  }

  traverse(string) {
    let currNode = this.root.children[string[0]];
    let stringArray = [...string];

    if (!currNode) {
      return null;
    }

    for (let i = 1; i < stringArray.length; i++) {
      if (currNode.value !== string[ i - 1 ]) {
        return;
      }

      currNode = currNode.children[stringArray[i]];
    }

    return currNode;
  }

  suggest(string) {
    let currNode = this.traverse(string);

    if (!currNode) {
      return null;
    }

    let wordArray = this.getWord(currNode, string, []);

    return this.sortSuggestions(wordArray);
  }

  getWord(node, string, array) {
    if (node.wordEnd) {
      array.push({word: string, count: node.selectCount});
    }

    let allChildBranches = Object.keys(node.children);

    allChildBranches.forEach((branch) => {
      this.getWord(node.children[branch], string + branch, array);
    });

    return array;
  }

  populate(array) {
    array.forEach((word) => {
      this.insert(word);
    });
  }

  select(string) {
    let currNode = this.traverse(string);

    if (!currNode) {
      return null;
    }

    currNode.selectCount++;
  }

  sortSuggestions(array) {
    array.sort((a, b) => b.count - a.count);

    return array.map(item => item.word);
  }

  delete(string) {
    let currNode = this.traverse(string);

    if (!currNode) {
      return null;
    }

    currNode.wordEnd = null;
  }
}

module.exports = Trie