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
    // let stringArray = [...string];

    this._count++;

    for (let i = 0; i < string.length; i++) {
      let data = string[i];
      let child = new Node (data);

      currNode.children[data] = child;
      currNode = currNode.children[data];
    };

    currNode.wordEnd = true;
    // console.log(JSON.stringify(this.root, null, '\t'));
  }
}