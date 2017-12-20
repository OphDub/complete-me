import { expect } from 'chai';
import Node from '../lib/node';
import Trie from '../lib/trie';
import fs from 'fs';

const text = "/usr/share/dict/words"
const dictionary = fs.readFileSync(text).toString().trim().split('\n')

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

    it('should provide a suggestion in an array', () => {
      trie.insert('pizza');

      let suggestion = trie.suggest('piz');

      expect(suggestion).to.deep.eq(['pizza']);
    });

    it('should return words with the same root', () => {
      trie.insert('pizza');
      trie.insert('pizzas');
      trie.insert('pizzeria');
      trie.insert('pizzaz');

      let suggestion = trie.suggest('piz');

      expect(suggestion).to.deep.eq(['pizza', 'pizzas', 'pizzaz', 'pizzeria']);
    });

    describe('DICTIONARY', () => {
      it.skip('should have a populate method which can pull in an array of words', () => {
        trie.populate(dictionary);

        expect(trie.count).to.eq(235886);

        let suggestion = trie.suggest('piz');
        expect(suggestion).to.deep.eq(['pize', 'pizza', 'pizzeria', 'pizzicato', 'pizzle'])
      });
    });

    describe('SELECT', () => {
      it('should move selected words to the front of suggested words', ()=> {
        trie.populate(dictionary);

        let suggestion1 = trie.suggest('piz');
        //=> ["pize", "pizza", "pizzeria", "pizzicato", "pizzle", ...]
        expect(suggestion1).to.deep.eq(['pize', 'pizza', 'pizzeria', 'pizzicato', 'pizzle']);

        trie.select('pizzeria');

        let suggestion2 = trie.suggest('piz');
        // => ["pizzeria", "pize", "pizza", "pizzicato", "pizzle", ...]
        expect(suggestion2).to.deep.eq([ 'pizzeria', 'pize', 'pizza', 'pizzicato', 'pizzle']);
      });
    })
  });
});
