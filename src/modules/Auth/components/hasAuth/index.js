import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, withRouter } from 'react-router';
import withAuthHoC from '../../HoCs/withAuth';

const hasAuth = WrappedComponent => class hasAuth extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    user: PropTypes.object,
  }

  render() {
    const { match, location, history, user } = this.props

    return (
      <Route exact path="/" render={() => (
        user ? (
          <WrappedComponent {...this.props} user={this.props.user} />;
        ) : (
          <Redirect to="/login"/>
        )
      )}/>
    )
  }
}

hasAuth.propTypes = {
  user: PropTypes.object,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withAuthHoC(hasAuth)));
