import withAuth from '../HoCs/withAuth';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { register } from '../../actions';

class Register extends Component {

  setRefEmail = (email) => {
    this.email = email;
  }
  setRefPassword = (password) => {
    this.password = password;
  }


  onClickRegister = () => {
    const { onRegister } = this.props;
    const email = this.email.value;
    const password = this.password.value;

    onRegister(email, password);

  }

  render() {
    const {
      onClickRegister,
      setRefEmail,
      setRefPassword,
      props: {
        registerInProgress,
        registerError,
        user,
      }
    } = this;
    return (
      <div className="row">
        {user && <div><h2>Hello, {user.email}</h2></div>}
        {!user &&
        <div>
          <h1 className="header-text">Register</h1>
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

          {registerInProgress && <span>register in progress...</span>}
          <br/>
          {registerError && <span>{registerError.message}</span>}
          {registerError && <div>{registerError.message}</div>}
          <button onClick={onClickRegister} type="button" id="btnRegister" className='bttn bttn-primary'>Register</button>
        </div>}
      </div>
    );
  }
}

Register.propTypes = {
  registerError: PropTypes.any.isRequired,
  registerInProgress: PropTypes.bool.isRequired,
  onRegister: PropTypes.func.isRequired,

  user: PropTypes.object,
};

const mapStateToProps = state => ({
  registerError: state.auth.registerError,
  registerInProgress: state.auth.registerInProgress,

  // user: state.auth.user,
})

const mapDispatchToProps = dispatch => ({
  onRegister(email, password) {
    dispatch(register(email, password));
  },
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(Register));
// export default AuthHoC;


// export default Login;
// mapDispatchToProps
