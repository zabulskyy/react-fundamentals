import { combineReducers } from 'redux';
// import authReducer from './authReducer';
import { reducer as authReducer } from '../modules/Auth';
import { reducer as todoListReducer} from '../modules/TodoList';


const rootReducer = combineReducers({
  auth: authReducer,
  todo: todoListReducer
});

export default rootReducer;
