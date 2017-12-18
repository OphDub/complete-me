import { expect } from 'chai';
import Node from '../lib/node';
import Trie from '../lib/trie';

describe('Trie', () => {
  let trie;

  beforeEach(() => {
    trie = new Trie();
  });

  it('should start with zero nodes', () => {
    expect(trie.length).to.eq(0);
  });

  it('should start with a root as null', () => {
    expect(trie.root).to.eq(null);
  })

  describe('INSERT', () => {
    it.skip('should add items', () => {
      trie.insert('pizza');
      expect(trie.length).to.equal(1);
    });
  });
});
