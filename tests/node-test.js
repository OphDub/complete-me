import { expect } from 'chai';
import Node from '../lib/node';

describe('NODE', () => {
  let node;

  beforeEach(() => {
    node = new Node('pizza')
  })

  it('should be a thing', () => {
    expect(node).to.exist
  })

  it('should default left and right to null', () => {
    expect(node.left).to.eq(null);
    expect(node.right).to.eq(null);
  });

  it('should not be a word by default', () => {
    expect(node.isWord).to.eq(false);
  });

  it('should take data and assign it to data prop', () => {
    expect(node.data).to.equal('pizza')
  })

});
