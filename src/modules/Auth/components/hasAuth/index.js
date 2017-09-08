import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { compose } from 'redux';
import { Route, withRouter } from 'react-router';
// import withAuthHoC from '../../containers/HoCs/withAuth';

const hasAuth = WrappedComponent => class hasAuth extends Component {

  render() {
    return (
      <Route exact path="/" render={() => (
        this.props.user ? (
          <WrappedComponent {...this.props} />
        ) : (
          <Redirect to="/login"/>
        )
      )}/>
    )
  }
}


hasAuth.propTypes = {
    user: PropTypes.object,
}

export default hasAuth;
