import Node from '../lib/node';
export default class Trie {
  constructor () {
    this._count = 0;
    this.root = new Node (null);
  }

  get count() {
    return this._count;
  }

  insert(string) {
    let currNode = this.root;

    this.insertHelper(string, currNode);
  }

  insertHelper(string, node) {
    // let currNode = node;
    let newString;

    if (string.length === 0) {
      if (node.wordEnd) {
        // console.log('REPEAT WORD');
        // console.log(JSON.stringify(this.root, null, '\t'));
      } else {
        node.wordEnd = true;
        this._count++;
      // console.log(JSON.stringify(this.root, null, '\t'));
      // console.log('-------');
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
}