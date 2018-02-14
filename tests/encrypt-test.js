import expect from 'expect'
import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'
import PropTypes from 'prop-types';

import ReactEncrypt from 'src/'

class TextField extends React.Component{


  static contextTypes = {
    encrypt: PropTypes.func.isRequired,
    decrypt: PropTypes.func.isRequired,
  }

  render(){

    const {
      text,
    } = this.props;

    const {
      encrypt,
      decrypt,
    } = this.context;

    const encodedText = encrypt(text);

    return decrypt(encodedText);
  }
}


describe('Component', () => {
  let node

  let TestText = "My test text";

  beforeEach(() => {
    node = document.createElement('div')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })

  it('Encrypt/decrypt text', () => {
    render(<ReactEncrypt
      encryptKey="ergER@%$#%3fdsf"
    >
      <TextField 
        text={TestText}
      />
    </ReactEncrypt>, node, () => {
      console.log("node", node);
      expect(node.innerText).toContain(TestText)
      return true;
    })
  })
})
