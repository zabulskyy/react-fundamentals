import {
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
} from './constants.js';

const initialState = {
  user: undefined,
  loginInProgress: false,
  loginError: false,
  loginOutProgress: false,
  logoutError: false,
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
      return Object.assign({}, state, { loginOutProgress: false, logoutError: action.payload });

    case LOGOUT_SUCCESS:
      return Object.assign({}, state, { loginOutProgress: false, user: undefined });

    default:
      return state;
  }
}

export default authReducer;
