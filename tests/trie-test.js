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

  describe('SUGGEST', () => {
    it('should return null if there are no suggestions', () => {
      let suggestion = trie.suggest('dog');

      expect(suggestion).to.eq(null);
    });

    it.only('should provide a suggestion in an array', () => {
      trie.insert('amp');
      let suggestion = trie.suggest('a');
      expect(suggestion).to.deep.eq(['amp']);

      // trie.insert('pizza');
      // let suggestion = trie.suggest('piz');

      // expect(suggestion).to.deep.eq(['pizza']);

      // trie.insert('pizzeria');

      // expect(suggestion).to.deep.eq(['pizza', 'pizzeria']);
    });
  });
});
