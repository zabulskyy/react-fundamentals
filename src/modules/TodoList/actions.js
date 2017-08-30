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

  GET_TODOLIST
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

    const todoObject = {
      user : userKey,
      text : text,
      done : false,
      removed : false,
    };

    todoRef.set(todoObject);

    const todoKey = todoRef.key;
    const todoRefInUser = database.ref('/users/' + userKey + '/todolist/' + todoKey);
    todoRefInUser.set(todoObject);

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


// // GET DATA
// const getTodolist = () => {
//   return dispatch => {
//     dispatch({ type: GET_TODOLIST });
//
//     const database = firebase.database();
//     firebase.database().ref('/users/' + firebase.auth().currentUser.uid + '/todolist').once('value')
//       .then
//
//     // renderTodoItem = (element) => {
//     //   return <TodoItem done={element.done} text={element.text}/>
//     // }
//
//     // getTodoItems = () => {
//     //   firebase.database().ref('/users/' + firebase.auth().currentUser.uid + '/todolist')
//     //     .once('value')
//     //     .then(snapshot => {
//     //       this.todoList = snapshot.val()
//     //     })
//     //     .catch(e => alert(e.message))
//     //   }
//   }
// }

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
