import { expect } from 'chai';
import Node from '../lib/node';
import Trie from '../lib/trie';

describe('Trie', () => {
  let trie;

  beforeEach(() => {
    trie = new Trie();
  });

  it('should exist', () => {
    expect(trie).to.exist;
  });

  it('should start with a count of zero', () => {
    expect(trie.count).to.eq(0);
  });

  it('should start with a root with the value of null', () => {
    expect(trie.root.value).to.eq(null);
  });

  describe('INSERT', () => {
    it('should add items and increment the count', () => {
      trie.insert('pizza');
      expect(trie.count).to.equal(1);
      trie.insert('thing');
      expect(trie.count).to.equal(2);
    });

    it('should not add duplicate items', () => {
      trie.insert('pizza');
      expect(trie.count).to.equal(1);
      trie.insert('pizzle');
      expect(trie.count).to.equal(2);
      trie.insert('pizza');
      expect(trie.count).to.equal(2);
    });
  });
});
