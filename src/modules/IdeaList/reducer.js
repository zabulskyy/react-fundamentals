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

  LIKE_IDEA,
  LIKE_IDEA_SUCCESS,
  LIKE_IDEA_FAILURE,

  GET_IDEALIST,
  GET_IDEALIST_FAILURE,
  GET_IDEALIST_SUCCESS,

  COMMENT_IDEA,
  COMMENT_IDEA_SUCCESS,
  COMMENT_IDEA_FAILURE
} from './constants.js';

const initialState = {

  pushInProgress: false,
  pushError: false,

  removeInProgress: false,
  removeError: false,

  updateInProgress: false,
  updateError: false,

  gettingIdeaListInProgress: false,
  gettingIdeaListError: false,

  ownerIdeas: [],
  worldIdeas: [],
};

const ideaListReducer = (state = initialState, action) => {
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


    case LIKE_IDEA:
      return Object.assign({}, state, { updateInProgress: true, updateError: false });

    case LIKE_IDEA_FAILURE:
      return Object.assign({}, state, { updateInProgress: false, updateError: action.payload });

    case LIKE_IDEA_SUCCESS:
      return Object.assign({}, state, { updateInProgress: false });


    case GET_IDEALIST:
      return Object.assign({}, state, { gettingIdeaListInProgress: true });


    case GET_IDEALIST_FAILURE:
      return Object.assign({}, state, { gettingIdeaListInProgress: false, gettingIdeaListError: true });

    case GET_IDEALIST_SUCCESS:
      return Object.assign({}, state, {
        gettingIdeaListInProgress: false,
        ownerIdeas: action.payload.ownerIdeas,
        worldIdeas: action.payload.worldIdeas
      });


    case COMMENT_IDEA:
      return Object.assign({}, state, { updateInProgress: true, updateError: false });

    case COMMENT_IDEA_FAILURE:
      return Object.assign({}, state, { updateInProgress: false, updateError: action.payload });

    case COMMENT_IDEA_SUCCESS:
      return Object.assign({}, state, { updateInProgress: false });

    default:
      return state;
  }
};

export default ideaListReducer;
