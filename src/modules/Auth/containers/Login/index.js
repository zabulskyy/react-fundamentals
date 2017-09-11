import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import withAuth from '../HoCs/withAuth';
import { login, logout, lookForUser } from '../../actions';

class Login extends Component {

  componentWillMount() {
    const { onLook } = this.props;
    onLook();
  }

  setRefEmail = (email) => {
    this.email = email;
  };
  setRefPassword = (password) => {
    this.password = password;
  };


  onClickLogin = () => {
    const { onLogin } = this.props;
    const email = this.email.value;
    const password = this.password.value;

    onLogin(email, password);

  };

  render() {
    const {
      onClickLogin,
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
              <input className="form-control" type="email" id="txtEmail" ref={setRefEmail}/>
            </label>
          </div>
          <div className="form-group">
            <label>Password
              <br/>
              <input className="form-control" type="password" id="txtPassword" ref={setRefPassword}/>
            </label>
          </div>

          {loginInProgress && <span>login in progress...</span>}
          <br/>
          {loginError && <span>{loginError.message}</span>}
          {logoutError && <span>{logoutError.message}</span>}
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
  onLook: PropTypes.func,

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

  // user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  onLogin(email, password) {
    dispatch(login(email, password));
  },
  onLogout() {
    dispatch(logout());
  },

  onLook() {
    dispatch(lookForUser());
  },

  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(Login));
// export default AuthHoC;


// export default Login;
// mapDispatchToProps
