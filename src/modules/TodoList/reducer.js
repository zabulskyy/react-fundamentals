import {
  PUSH,
  PUSH_FAILURE,
  PUSH_SUCCESS,

  REMOVE,
  REMOVE_FAILURE,
  REMOVE_SUCCESS,

  UPDATE,
  UPDATE_FAILURE,
  UPDATE_SUCCESS,

  GET_TODOLIST,
  GET_TODOLIST_FAILURE,
  GET_TODOLIST_SUCCESS,
} from './constants.js';

const initialState = {

  pushInProgress: false,
  pushError: false,

  removeInProgress: false,
  removeError: false,

  updateInProgress: false,
  updateError: false,

  gettingTodoListInProgress: false,
  gettingTodoListError: false,

  todoList: [],
};

const todoListReducer = (state = initialState, action) => {
  switch (action.type) {

    case PUSH:
      return Object.assign({}, state, { pushInProgress: true, pushError: false });

    case PUSH_FAILURE:
      return Object.assign({}, state, { pushInProgress: false, pushError: action.payload });

    case PUSH_SUCCESS:
      return Object.assign({}, state, { pushInProgress: false });


    case REMOVE:
      return Object.assign({}, state, { removeInProgress: true, logoutError: false });

    case REMOVE_FAILURE:
      return Object.assign({}, state, { removeInProgress: false, logoutError: action.payload });

    case REMOVE_SUCCESS:
      return Object.assign({}, state, { removeInProgress: false });


    case UPDATE:
      return Object.assign({}, state, { updateInProgress: true, updateError: false });

    case UPDATE_FAILURE:
      return Object.assign({}, state, { updateInProgress: false, updateError: action.payload });

    case UPDATE_SUCCESS:
      return Object.assign({}, state, { updateInProgress: false });


    case GET_TODOLIST:
      return Object.assign({}, state, { gettingTodoListInProgress: true})

    case GET_TODOLIST_FAILURE:
      return Object.assign({}, state, { gettingTodoListInProgress: false, gettingTodoListError: true })

    case GET_TODOLIST_SUCCESS:
      return Object.assign({}, state, { gettingTodoListInProgress: false, todoList: action.payload  })

    default:
      return state;
  }
}

export default todoListReducer;
