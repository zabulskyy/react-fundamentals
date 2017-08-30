import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

const withAuthHoC = WrappedComponent => class withAuthHoC extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    return <WrappedComponent {...this.props} />;
  }
};

withAuthHoC.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  user: state.auth.user,
});
//
// const mapDispatchToProps = dispatch => ({
//   dispatch,
// });

export default compose(
  connect(mapStateToProps),
  withAuthHoC
);
