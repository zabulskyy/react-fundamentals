import React from 'react';
import currentUser from  '../../store/userStore';

const AuthHoC = WrappedComponent => class AuthHoC extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firebaseUser: currentUser
    };
  }

  render() {
    return <WrappedComponent {...this.props } firebaseUser = { this.state.firebaseUser }/>;
  }
};

export default AuthHoC;
