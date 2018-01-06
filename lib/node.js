class Node {
  constructor (value) {
    this.value = value;
    this.children = {};
    this.wordEnd = null;
    this.selectCount = 0;
  }
}

module.exports = Node;