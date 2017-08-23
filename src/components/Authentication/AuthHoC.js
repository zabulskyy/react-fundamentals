import React from 'react';
import { Router } from 'react-router'
import { compose } from 'redux';
import { connect } from 'react-redux';

const AuthHoC = WrappedComponent => class AuthHoC extends React.Component {
  constructor(props) {
    super(props);
    this.redirect = false;
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.user) {
      // TODO redirect to authentication page
    }
  }

  render() {
    return <WrappedComponent {...this.props} firebaseUser={ this.props.user }/>;
  }
};

function mapStateToProps(state, ownProps){
  return {
    user: state.authReducer
  };
}

export default compose(connect(mapStateToProps), AuthHoC);
// export default AuthHoC;
