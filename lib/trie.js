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
    let currNode = this.root.children[string[0]];
    let count = 0;

    while (count + 1 < string.length) {
      if(currNode.value !== string[count]) {
        return;
      }
      currNode = currNode.children[string[count +1]];
      count++;
    }

    const allWords = [];
    //RECURSION
    const getWord = (node, string) => {
    //BASE CASE
      if (node.wordEnd) { //DOES NOT CHECK IF THIS NODE HAS CHILDREN
        allWords.push(string);
      }

      let allOtherBranches = Object.keys(node.children);

      allOtherBranches.forEach((branch) => {
        // let newString = string + branch;
        getWord(node.children[branch], string + branch);
      });
    }

    getWord(currNode, string);
    return allWords;
  }

}