import * as firebase from 'firebase';
import React from 'react';

class AuthenticationPage extends React.Component {

  state = {
    firebaseUser: null,
  };

  setRefEmail = (email) => {
    this.email = email;
  }

  setRefPassword = (password) => {
    this.password = password;
  }

  setRefBtnLogin = (btnLogin) => {
    this.btnLogin = btnLogin;
  }

  setRefBtnLogout = (btnLogout) => {
    this.btnLogout = btnLogout;
  }

  onClickLogin = () => {
    const email = this.email.value;
    const pass = this.password.value;
    const auth = firebase.auth();

    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise
      .then((user) => {
        this.setState({ firebaseUser: user });
      })
      .catch(e => alert(e.message));

  }

  onClickRegister = () => {
    const email = this.email.value;
    const pass = this.password.value;
    const auth = firebase.auth();

    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise
      .then(() => {
        this.setState({ firebaseUser: user });
      })
      .catch(e => alert(e.message));

  }

  onClickLogout = () => {
      const promise = firebase.auth().signOut();
      promise
        .then(() => {
          this.setState({ firebaseUser: null });
        })
        .catch(e => alert(e.message));

  }

  render() {
    const {
      onClickLogin,
      onClickRegister,
      onClickLogout,
      setRefEmail,
      setRefPassword,
      state: {
        firebaseUser,
      },
    } = this;
    return (
      <div className="row">
        <div className={!firebaseUser ? '' : 'hide' }>
          <h1 className="header-text">Login / Register</h1>
          <br/>
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
        <button onClick={onClickLogin} type="button"  id="btnLogin" className={!firebaseUser ? 'bttn' : 'hide' }>Login</button>
        <button onClick={onClickRegister} type="button" id="btnRegister" className={!firebaseUser ? 'bttn bttn-primary' : 'hide' }>Register</button>
        <button onClick={onClickLogout} type="button" id="btnLogout" className={!firebaseUser ? 'hide' : 'bttn'}>Logout</button>
      </div>

    );
  }
}

export default AuthenticationPage;
