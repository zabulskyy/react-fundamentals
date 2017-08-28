import * as firebase from 'firebase';

import {
  PUSH,
  PUSH_SUCCESS,
  PUSH_FAILURE,

  REMOVE,
  REMOVE_SUCCESS,
  REMOVE_FAILURE,

  UPDATE,
  UPDATE_SUCCESS,
  UPDATE_FAILURE,
} from './constants.js';

// hierarchy:
/*
users : {
  unikey1 : {
    name : 'kek',
    todolist : {
      unikeytodo1,
      unikeytodo2,
      unikeytodo3,
      ...
    },
    else : { ... }
  },
  unikey2 : {...},
  ...
}

todo : {
  unikeytodo1 : {
    user : unikey1,
    text : 'buy milk',
    done : false,
    anydata : ...
  },
  ...
}
*/



// PUSH ACTIONS
/*
  todo = {
    text,
    date,
    ...
}
*/

// PUSH
const push = (todo) => {
  return (dispatch) => {
    dispatch({ type: PUSH });

    const database = firebase.database();
    const userKey = firebase.auth().currentUser.uid;
    const text = todo.text;
    const todoRef = database.ref('/todo/').push();
    todoRef.set({
      user : userKey,
      text : text,
      done : false,
      removed : false,
    })
  }
}

const pushFailure = error => ({ type: PUSH_FAILURE, payload: error });

const pushSuccess = () => ({ type: PUSH_SUCCESS });


// REMOVE
const remove = (todoKey) => {
  return (dispatch) => {
    dispatch({ type: REMOVE });

    const database = firebase.database();
    const userKey = firebase.auth().currentUser.uid;
    const todoRef = database.ref('/todo/' + todoKey);
    todoRef.set({
      removed : true,
    })

    const todoRefInUser = database.ref('/users/' + userKey + '/todolist/' + todoKey);
    todoRefInUser.set({
      removed : true,
    })
  }
}

const removeFailure = error => ({ type: REMOVE_FAILURE, payload: error });

const removeSuccess = () => ({ type: REMOVE_SUCCESS });


// UPDATE
const update = (todoKey, what) => {
  return (dispatch) => {
    dispatch({ type: UPDATE });

    const database = firebase.database();
    const userKey = firebase.auth().currentUser.uid;
    const todoRef = database.ref('/todo/' + todoKey);

    todoRef.once('value').then(snapshot => {
      const oldTodo = snapshot.val();
    })
    todoRef.set(
      Object.assign(oldTodo, what)
    )

    const todoRefInUser = database.ref('/users/' + userKey + '/todolist/' + todoKey);
    todoRefInUser.set(
      Object.assign(oldTodo, what)
    )
  }
}

const updateFailure = error => ({ type: UPDATE_FAILURE, payload: error });

const updateSuccess = () => ({ type: UPDATE_SUCCESS });


export {
  push,
  pushSuccess,
  pushFailure,

  remove,
  removeSuccess,
  removeFailure,

  update,
  updateSuccess,
  updateFailure,
};
