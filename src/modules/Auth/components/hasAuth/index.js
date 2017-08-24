import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, withRouter } from 'react-router';
import withAuthHoC from '../../HoCs/withAuth';

const hasAuth = WrappedComponent => class hasAuth extends Component {
  static propTypes = {
    user: PropTypes.object,
  }

  render() {
    return (
      <Route exact path="/" render={() => (
        this.props.user ? (
          <WrappedComponent {...this.props} />;
        ) : (
          <Redirect to="/login"/>
        )
      )}/>
    )
  }
}

export default withAuthHoC(hasAuth);
