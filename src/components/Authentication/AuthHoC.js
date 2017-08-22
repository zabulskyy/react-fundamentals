import React from 'react';

import { compose } from 'redux';
import { connect } from 'react-redux';

const AuthHoC = WrappedComponent => class AuthHoC extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.user);
  }

  render() {
    return <WrappedComponent {...this.props } firebaseUser = { this.props.user }/>;
  }
};

function mapStateToProps(state, ownProps){
  return {
    user: state
  };
}

export default compose(connect(mapStateToProps), AuthHoC);
// export default AuthHoC;
