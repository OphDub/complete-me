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
    //In order to reach our child nodes of the root we need to declare some variables
    //currNode is set to the children object that matches the string at index 0
    let currNode = this.root.children[string[0]];
    let count = 0;
    let allWords = [];

    //Our while loop, is essentially like a for loop, iterates the count for as long as the length of the string
    while (count + 1 < string.length) {
      //if the value of the current node is not equal to the string at the index with the same value of count
      //then return out of the entire function
      if(currNode.value !== string[count]) {
        return;
      }
      currNode = currNode.children[string[count +1]];
      count++;
    }

    //RECURSION
    const getWord = (node, string) => {
      if (node.wordEnd) { //DOES NOT CHECK IF THIS NODE HAS CHILDREN
        allWords.push({word: string, count: node.selectCount});
      }

      let allOtherBranches = Object.keys(node.children);

      allOtherBranches.forEach((branch) => {
        getWord(node.children[branch], string + branch);
      });
    }

    getWord(currNode, string);
    let sortedWords = this.sortSuggestions(allWords);
    return sortedWords;
  }

  populate(dictionary) {
    dictionary.forEach((word) => {
      this.insert(word);
    });
  }

  select(string) {
    let currNode = this.root.children[string[0]];
    let count = 0;

    while (count + 1 < string.length) {
      if(currNode.value !== string[count]) {
        return;
      }
      currNode = currNode.children[string[count +1]];
      count++;
    }

    currNode.selectCount++;
  }

  sortSuggestions(array) {
    array.sort((a,b) => b.count - a.count);

    return array.map(item => item.word);
  }
}