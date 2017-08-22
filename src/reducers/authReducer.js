export default function authReducer(state = {}, action) {
  switch (action.type) {
    case 'LOG_IN':

      // // state = user
      // state = {
      //   user: user
      // }
      return { ...state, user: action.user };

    default:
      return state;
  }
}
