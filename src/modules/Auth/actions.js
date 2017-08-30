import * as firebase from 'firebase';

import {
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,

  LOGOUT,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,

  REGISTER,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
} from './constants.js';


// LOGIN ACTIONS
const login = (email, password) => {
  return (dispatch) => {
    
    dispatch({ type: LOGIN });

    const auth = firebase.auth();
    auth.signInWithEmailAndPassword(email, password)
      .then(user => dispatch(loginSuccess(user)))
      .catch(e => dispatch(loginFailure(e)));
  }
}

const loginFailure = error => ({ type: LOGIN_FAILURE, payload: error });

const loginSuccess = user => ({ type: LOGIN_SUCCESS, payload: user });

// LOGOUT ACTIONS
const logout = () => {
  return (dispatch) => {
    dispatch({ type: LOGOUT });
    const auth = firebase.auth();
    auth.signOut()
      .then( () => dispatch(logoutSuccess()))
      .catch(e => dispatch(logoutFailure(e)));
  }
}

const logoutFailure = error => ({ type: LOGOUT_FAILURE, payload: error });

const logoutSuccess = user => ({ type: LOGOUT_SUCCESS });


// REGISTER ACTIONS
const register = (email, password) => {
  return (dispatch) => {
    dispatch({ type: REGISTER });
    const auth = firebase.auth();
    auth.createUserWithEmailAndPassword(email, password)
      .then(user => dispatch(registerSuccess(user)))
      .catch(e => dispatch(registerFailure(e)));
  }
}

const registerFailure = error => ({ type: REGISTER_FAILURE, payload: error });

const registerSuccess = user => ({ type: REGISTER_SUCCESS, payload: user });

export {
  login,
  loginFailure,
  loginSuccess,

  logout,
  logoutFailure,
  logoutSuccess,

  register,
  registerFailure,
  registerSuccess,
};
