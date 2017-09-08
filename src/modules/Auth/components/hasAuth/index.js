import { compose } from 'redux';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { compose } from 'redux';
import { Route, withRouter, browserHistory } from 'react-router';
import withAuthHoC from '../../containers/HoCs/withAuth';

const hasAuth = WrappedComponent => class hasAuth extends Component {


  componentWillMount(){
      if (!this.props.user)
        browserHistory.push('/login');
  }

  render() {
    return (<WrappedComponent {...this.props} />)
  }
}


hasAuth.propTypes = {
    user: PropTypes.object,
}


const mapStateToProps = state => ({
  user: state.auth.user,
});


export default compose(
  connect(mapStateToProps),
  hasAuth
);
