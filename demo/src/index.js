import React, {Component} from 'react'
import {render} from 'react-dom'

import PropTypes from 'prop-types';

import ReactEncrypt from '../../src'


class Renderer extends Component{

  static contextTypes = {
    encrypt: PropTypes.func.isRequired,
    decrypt: PropTypes.func.isRequired,
  }


  state = {
    pureText: "",
  };


  onChange = event => {

    const {
      name,
      value,
    } = event.target;

    this.setState({
      [name]: value,
    });

  }

  render(){


    const {
      pureText,
    } = this.state;


    const {
      encrypt,
      decrypt,
    } = this.context;


    let encryptedText
    let decryptedText


    encryptedText = encrypt(pureText);
    decryptedText = decrypt(encryptedText);


    return <div>

      <div>

        <h3>
          Pure text
        </h3>

        <textarea
          style={{
            width: "100%",
            height: 100,
          }}
          name="pureText"
          value={pureText}
          onChange={this.onChange}
        />

      </div>

      <div>

        <h3>
          Encrypted text
        </h3>

        <textarea
          style={{
            width: "100%",
            height: 100,
          }}
          value={encryptedText}
        />

      </div>

      <div>

        <h3>
          Decrypted text
        </h3>

        <textarea
          style={{
            width: "100%",
            height: 100,
          }}
          value={decryptedText}
        />

      </div>
 

    </div>

  }
}

class Demo extends Component {



  render() {
    return <div>
      <h1>react-encrypt demo</h1>
      
      <ReactEncrypt
        encryptKey="ewfWE@#%$rfdsefgdsf"
      >
        <Renderer />
      </ReactEncrypt>

    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
