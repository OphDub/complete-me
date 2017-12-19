import { expect } from 'chai';
import Node from '../lib/node';
import Trie from '../lib/trie';

describe('Trie', () => {
  let trie;

  beforeEach(() => {
    trie = new Trie();
  });

  it('should start with zero nodes', () => {
    expect(trie.count).to.eq(0);
  });

  it('should start with a root as null', () => {
    expect(trie.root.value).to.eq(null);
  });

  describe('INSERT', () => {
    it('should add items', () => {
      trie.insert('pizza');
      expect(trie.count).to.equal(1);
      trie.insert('thing');
      expect(trie.count).to.equal(2);
    });
  });
});
