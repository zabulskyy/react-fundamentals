import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { login, logout } from '../../actions';

class Login extends Component {

  setRefEmail = (email) => {
    this.email = email;
  }
  setRefPassword = (password) => {
    this.password = password;
  }


  onClickLogin = () => {
    const { onLogin } = this.props;
    const email = this.email.value;
    const password = this.password.value;

    onLogin(email, password);

  }

  // onClickLogout = () => {
  //   const { onLogout } = this.props;
  //
  //   onLogout();
  //
  // }

  render() {
    const {
      onClickLogin,
      // onClickLogout,
      setRefEmail,
      setRefPassword,
      props: {
        loginInProgress,
        loginError,

        logoutInProgress,
        logoutError,
        onLogout,

        user,
      }
    } = this;
    return (
      <div className="row">
        {user && <div><h2>Hello, {user.email}</h2></div>}
        {!user &&
        <div>
          <h1 className="header-text">Login</h1>
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

          {loginInProgress && <span>login in progress...</span>}
          <br/>
          {loginError && <span>{loginError.message}</span>}
          {logoutError && <div>{logoutError.message}</div>}
          <button onClick={onClickLogin} type="button" id="btnLogin" className='bttn bttn-primary'>Login</button>
        </div>}
        {user && <button onClick={onLogout} type="button" id="btnLogout" className='bttn bttn-primary'>Logout</button>}
      </div>
    );
  }
}

Login.propTypes = {
  loginError: PropTypes.any.isRequired,
  loginInProgress: PropTypes.bool.isRequired,
  onLogin: PropTypes.func.isRequired,

  logoutError: PropTypes.any.isRequired,
  logoutInProgress: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,

  user: PropTypes.object,
};

const mapStateToProps = state => ({
  loginError: state.auth.loginError,
  loginInProgress: state.auth.loginInProgress,

  logoutError: state.auth.logoutError,
  logoutInProgress: state.auth.logoutInProgress,

  user: state.auth.user,
})

const mapDispatchToProps = dispatch => ({
  onLogin(email, password) {
    dispatch(login(email, password));
  },
  onLogout() {
      dispatch(logout());
  },
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
// export default AuthHoC;


// export default Login;
// mapDispatchToProps
