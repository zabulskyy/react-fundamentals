import React, { Component, PropTypes } from 'react';

class Auth extends Component {


  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default Auth;
