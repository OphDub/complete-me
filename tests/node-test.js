import { expect } from 'chai';
import Node from '../lib/node';

describe('NODE', () => {
  let node;

  beforeEach(() => {
    node = new Node('pizza')
  })

  it('should exist', () => {
    expect(node).to.exist;
  });

  it('should start with no children by default', () => {
    expect(node.children).to.deep.equal({});
  });

  it('should not be a word by default', () => {
    expect(node.wordEnd).to.eq(null);
  });

  it('should have a value', () => {
    expect(node.value).to.equal('pizza');
  });

  it('should not be selected by default', () => {
    expect(node.selectCount).to.equal(0);
  });
});