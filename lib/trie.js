import Node from '../lib/node';
export default class Trie {
  constructor () {
    this._count = 0;
    this.root = new Node (null);
    this.suggestions = [];
  }

  get count() {
    return this._count;
  }

  insert(string) {
    let currNode = this.root;

    this.insertHelper(string, currNode);
  }

  insertHelper(string, node) {
    let newString;

    if (string.length === 0) {
      if (!node.wordEnd) {
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

  suggest(string) {
    //BRUCE'S WAY
    currNode = this.children[string[0]];

    for (let i = 0; i < string.length; i++) {
      currNode = currNode[string[i]];
    }

    const allWords = [];
    //RECURSION
    const getWord = (node, string) => {
    //BASE CASE
      if (node.WordEnd) {
        allWords.push(string + node.value);
      }

      let allOtherBranches = Object.keys(node.children);
      allOtherBranches.forEach((branch) => {
        getWord(node.children[branch], string + branch);
      });
    }

    getWord(currNode, string);
    return allWords;
  }

}