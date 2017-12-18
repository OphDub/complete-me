import { expect } from 'chai';
import Node from '../lib/node';
import Trie from '../lib/trie';

describe('Trie', () => {
  let trie;

  beforeEach(() => {
    trie = new Trie();
  });

  it('should start with zero nodes', () => {
    expect(completeMe.length).to.eq(0);
  });
});
