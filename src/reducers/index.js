import { combineReducers } from 'redux';
// import authReducer from './authReducer';
import { reducer as authReducer } from '../modules/Auth';


const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
