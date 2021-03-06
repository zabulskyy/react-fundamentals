import { connect } from 'react-redux';
import { logout } from '../../modules/Auth/actions';
import * as firebase from 'firebase';
import hasAuth from '../../modules/Auth/components/hasAuth'
import React, { Component, PropTypes } from 'react';

class Profile extends Component {

  constructor(props) {
    super(props);
  }

  onClickLogout = () => {
    const promise = firebase.auth().signOut();
    promise
      .then(() => {
        this.props.dispatch(authActionsSetUser(null));
      })
      .catch(e => alert(e.message));
  };

  render() {
    const {
      props: {
        user,
        onLogout,
        logoutInProgress,
        logoutError,
      }
    } = this;

    const {
      onClickLogout,
    } = this;


    return (
      <div>
        <div className={user ? '' : 'hide'}>
          <h1 className="header-text">Your profile</h1>
          {user && <h3 className="header-subtext">Hello, {user.email}</h3>}
          {logoutError && <div>{logoutError.message}</div>}
          <button onClick={onLogout} type="button" id="btnLogout" className={!user ? 'hide' : 'bttn bttn-primary'}>
            Logout
          </button>
        </div>
      </div>
    );
  }
}


Profile.propTypes = {
  logoutError: PropTypes.any.isRequired,
  logoutInProgress: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,

  user: PropTypes.object,
};

const mapDispatchToProps = dispatch => ({
  onLogout() {
    dispatch(logout());
  },

  dispatch,
});

const mapStateToProps = state => ({
  logoutError: state.auth.logoutError,
  logoutInProgress: state.auth.logoutInProgress,

});

export default connect(mapStateToProps, mapDispatchToProps)(hasAuth(Profile));
