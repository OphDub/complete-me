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

  suggest(word) {
    let currNode = this.root.children;
    let string = [...word];

    //string at index 0 matches one of root children
    //continue traversing trie
    while (string.length) {
      if (currNode[string[0]].value === string[0]) {
        console.log('match', currNode[string[0]].value);

        this.suggestions.push(string[0]);

        console.log(this.suggestions);
        console.log(currNode);

        currNode = currNode[string[0]].children;
        string.shift();
        //Update node to currNode.children
        //Check if node matches next letter in string
        //Continue checking down trie until last letter of string
        //Return all substrings
      } else {
        //string at index 0 does not match any root children
        return null;
      }
    }
    return this.suggestions;
  }

}