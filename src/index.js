import React, {Component} from 'react'

import PropTypes from 'prop-types';

import CryptoJS from 'crypto-js';

export default class ReactEncryptProvider extends Component{


  static propTypes = {
    encryptKey: PropTypes.string.isRequired,
  };


  static childContextTypes = {
    encrypt: PropTypes.func,
    decrypt: PropTypes.func,
  }


  getChildContext(){

    return {
      encrypt: (text) => this.encrypt(text),
      decrypt: (text) => this.decrypt(text),
    };

  }


  encrypt(text){

    const {
      encryptKey,
    } = this.props;

    let ciphertext;

    if(text && encryptKey){

      try{
  
        ciphertext = CryptoJS.AES.encrypt(text, encryptKey);
  
      }
      catch(e){
        
        console.error(e);

      };

    }

    return ciphertext;
  }


  decrypt(text, encoding = CryptoJS.enc.Utf8){

    const {
      encryptKey,
    } = this.props;

    let plaintext;

    if(text){

      try{

        const bytes = CryptoJS.AES.decrypt(text.toString(), encryptKey);
        plaintext = bytes.toString(encoding);
  
      }
      catch(e){
        
        console.error(e);

      };

    }

    return plaintext;

  }


  render() {

    const {
      encryptKey,
      children,
      ...other
    } = this.props;

    return children 
      ? 
        <children.type
          {...children.props}
          {...other}
        /> 
      : 
    null;
  }

}
