import { compose } from 'redux';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';

const hasAuth = WrappedComponent => class hasAuth extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.user)
      browserHistory.push('/register');

    return (<WrappedComponent {...this.props} />);
  }
};


hasAuth.propTypes = {
  user: PropTypes.object
};


const mapStateToProps = state => ({
  user: state.auth.user
});


export default compose(
  connect(mapStateToProps),
  hasAuth
);
