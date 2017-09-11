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

const initialState = {
  user: undefined,

  loginInProgress: false,
  loginError: false,

  logoutInProgress: false,
  logoutError: false,

  registerInProgress: false,
  registerError: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {

    case LOGIN:
      return Object.assign({}, state, { loginInProgress: true, loginError: false });

    case LOGIN_FAILURE:
      return Object.assign({}, state, { loginInProgress: false, loginError: action.payload });

    case LOGIN_SUCCESS:
      return Object.assign({}, state, { loginInProgress: false, user: { email: action.payload.email } });


    case LOGOUT:
      return Object.assign({}, state, { logoutInProgress: true, logoutError: false });

    case LOGOUT_FAILURE:
      return Object.assign({}, state, { logoutInProgress: false, logoutError: action.payload });

    case LOGOUT_SUCCESS:
      return Object.assign({}, state, { logoutInProgress: false, user: undefined });


    case REGISTER:
      return Object.assign({}, state, { registerInProgress: true, registerError: false });

    case REGISTER_FAILURE:
      return Object.assign({}, state, { registerInProgress: false, registerError: action.payload });

    case REGISTER_SUCCESS:
      return Object.assign({}, state, { registerInProgress: false, user: { email: action.payload.email } });


    default:
      return state;
  }
};

export default authReducer;
