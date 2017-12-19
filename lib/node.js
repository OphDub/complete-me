export default class Node {
  constructor (value) {
    this.value = value;
    this.children = {};
    this.wordEnd = null;
  }
}
