import { combineReducers } from 'redux';
// import authReducer from './authReducer';
import { reducer as authReducer } from '../modules/Auth';
import { reducer as ideaListReducer } from '../modules/IdeaList';


const rootReducer = combineReducers({
  auth: authReducer,
  idea: ideaListReducer
});

export default rootReducer;
