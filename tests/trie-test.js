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
    })

    it('should not accept numbers', () => {
      trie.insert(1);

      expect(trie.count).to.equal(0);

      expect(trie.root.children[1]).to.not.exist;
    })

    it('should add nodes which have values that match the string', () => {
      trie.insert('it');

      expect(trie.root.children['i']).hasOwnProperty('i');
      expect(trie.root.children['i'].children['t']).hasOwnProperty('t');
    })

    it('should not add duplicate items', () => {
      trie.insert('pizza');
      trie.insert('pizzle');

      expect(trie.count).to.equal(2);

      trie.insert('pizza');

      expect(trie.count).to.equal(2);
    })
  });

  describe('SUGGEST', () => {
    it('should return null if there are no suggestions', () => {
      let suggestion = trie.suggest('dog');

      expect(suggestion).to.eq(null);
    })

    it('should provide a suggestion in an array', () => {
      trie.insert('pizza');

      let suggestion = trie.suggest('piz');

      expect(suggestion).to.deep.eq(['pizza']);
    })

    it('should return words with the same root', () => {
      trie.insert('pizza');
      trie.insert('pizzas');
      trie.insert('pizzeria');
      trie.insert('pizzaz');

      let suggestion = trie.suggest('piz');

      expect(suggestion).to.deep.eq(['pizza', 'pizzas', 'pizzaz', 'pizzeria']);
    })
  });

  describe('POPULATE', () => {
    beforeEach(() =>{
      trie.populate(dictionary);
    })

    it('should count the words which it populates into the trie', () => {
      expect(trie.count).to.eq(235886);
    })

    it('should be able to suggest words from the array it accepted', () => {
      let suggestion = trie.suggest('piz');

      expect(suggestion).to.deep.eq(['pize', 'pizza', 'pizzeria', 'pizzicato', 'pizzle']);
    })
  });

  describe('SELECT', () => {
    beforeEach(() =>{
      trie.populate(dictionary);
    })

    it('should move selected words to the front of suggested words', () => {
      let suggestion = trie.suggest('piz');
      expect(suggestion).to.deep.eq(['pize', 'pizza', 'pizzeria', 'pizzicato', 'pizzle']);

      trie.select('pizzeria');

      suggestion = trie.suggest('piz');
      expect(suggestion).to.deep.eq([ 'pizzeria', 'pize', 'pizza', 'pizzicato', 'pizzle']);
    })

    it('should allow words to be selected multiple times', () => {
      let endNode = trie.traverse('pizzeria');
      let suggestion = trie.suggest('piz');

      expect(suggestion).to.deep.eq(['pize', 'pizza', 'pizzeria', 'pizzicato', 'pizzle']);
      expect(endNode.selectCount).to.equal(0);

      trie.select('pizzeria');
      trie.select('pizzeria');

      endNode = trie.traverse('pizzeria');
      suggestion = trie.suggest('piz');

      expect(endNode.selectCount).to.equal(2);
      expect(suggestion).to.deep.eq([ 'pizzeria', 'pize', 'pizza', 'pizzicato', 'pizzle']);
    })

    it('should allow multiple words to be selected', () => {
      let suggestion = trie.suggest('pizz');

      expect(suggestion).to.deep.equal(['pizza', 'pizzeria', 'pizzicato', 'pizzle']);

      trie.select('pizzle');
      trie.select('pizzle');
      trie.select('pizzle');
      trie.select('pizzle');

      trie.select('pizzicato');
      trie.select('pizzicato');

      suggestion = trie.suggest('pizz');

      expect(suggestion).to.deep.equal(['pizzle', 'pizzicato', 'pizza', 'pizzeria']);
    })
  });

  describe('DELETE', () => {
    beforeEach (() => {
      trie.populate(dictionary);
    })

    it('should delete words from the array of suggested words', () => {
      let suggestion = trie.suggest('piz');
      expect(suggestion).to.deep.eq(['pize', 'pizza', 'pizzeria', 'pizzicato', 'pizzle']);

      trie.delete('pizzle');

      suggestion = trie.suggest('piz');
      expect(suggestion).to.deep.eq(['pize', 'pizza', 'pizzeria', 'pizzicato']);
    })

    it('should change the wordEnd property of the node when a word is deleted', () => {
      let deletedNode = trie.traverse('pizzle');

      trie.delete('pizzle');

      expect(deletedNode.wordEnd).to.eq(null);
    })
  });
});
