export default function authReducer(state = null, action) {
  switch (action.type) {
    case 'LOG_IN':

      // // state = user
      // state = {
      //   user: user
      // }
      return action.user;

    default:
      return state;
  }
}
