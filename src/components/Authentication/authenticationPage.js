import AuthHoC from '../Authentication/AuthHoC.js';
import * as firebase from 'firebase';
import React, { PropTypes } from 'react';
import authReducer from '../../reducers/authReducer';
import { connect } from 'react-redux';
import { authActionsSetUser } from '../../actions/authActions';

class AuthenticationPage extends React.Component {

  setRefEmail = (email) => {
    this.email = email;
  }
  setRefPassword = (password) => {
    this.password = password;
  }
  onClickLogin = () => {
    const email = this.email.value;
    const pass = this.password.value;
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise
      .then((user) => {
        // console.log(user);
        this.props.dispatch(authActionsSetUser({ email: user.email }));
      })
      .catch(e => alert(e.message));
  }
  onClickRegister = () => {
    const email = this.email.value;
    const pass = this.password.value;
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise
      .then((user) => {
        this.props.dispatch(authActionsSetUser({ email: user.email }));
      })
      .catch(e => alert(e.message));
  }
  onClickLogout = () => {
      const promise = firebase.auth().signOut();
      promise
        .then(() => {
          this.props.dispatch(authActionsSetUser(null));
        })
        .catch(e => alert(e.message));
  }

  render() {
    const { firebaseUser } = this.props;
    const {
      onClickLogin,
      onClickRegister,
      onClickLogout,
      setRefEmail,
      setRefPassword,
    } = this;
    return (
      <div className="row">
        <div className={!firebaseUser || true ? '' : 'hide' }>
          <h1 className="header-text">Login / Register</h1>
          <br/>
          {firebaseUser && <h2>{firebaseUser.email}</h2>}
          <div className="form-group">
            <label>Email
              <br/>
              <input className="form-control" type="email" id="txtEmail" ref={setRefEmail}></input>
            </label>
          </div>
          <div className="form-group">
            <label>Password
              <br/>
              <input className="form-control" type="password" id="txtPassword" ref={setRefPassword}></input>
            </label>
          </div>
        </div>
        <button onClick={onClickLogin} type="button"  id="btnLogin">Login</button>
        <button onClick={onClickRegister} type="button" id="btnRegister">Register</button>
        <button onClick={onClickLogout} type="button" id="btnLogout" className={!firebaseUser ? 'hide' : 'bttn'}>Logout</button>
      </div>

    );
  }
}

AuthenticationPage.propTypes = {
    firebaseUser: PropTypes.object.isRequired,
    // TODO WTF? func?? not obj
    dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state, ownProps){
  return {
    user: state.authReducer
  };
}

// function mapDispatchToProps(){}

export default connect(mapStateToProps)(AuthHoC(AuthenticationPage));
