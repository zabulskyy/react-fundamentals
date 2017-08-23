import * as firebase from 'firebase';

import {
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
} from './constants.js';

// firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//     // User is signed in.
//     var displayName = user.displayName;
//     var email = user.email;
//     var emailVerified = user.emailVerified;
//     var photoURL = user.photoURL;
//     var isAnonymous = user.isAnonymous;
//     var uid = user.uid;
//     var providerData = user.providerData;
//     // ...
//   } else {
//     // User is signed out.
//     // ...
//   }
// });


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

const logoutSuccess = () => ({ type: LOGOUT_SUCCESS });

export {
  login,
  loginFailure,
  loginSuccess,

  logout,
  logoutFailure,
  logoutSuccess
};
