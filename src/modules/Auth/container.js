
import React, { Component, PropTypes } from 'react';

class Auth extends Component {


  render() {
    return (
      <div>
        <h1>Auth</h1>
        {this.props.children}
        </div>
    );
  }
}

export default Auth;
