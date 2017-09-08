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

  GET_IDEALIST,
  GET_IDEALIST_FAILURE,
  GET_IDEALIST_SUCCESS,
} from './constants.js';

// hierarchy:
/*
users : {
  unikey1 : {
    name : 'kek',
    idealist : {
      unikeyidea1,
      unikeyidea2,
      unikeyidea3,
      ...
    },
    else : { ... }
  },
  unikey2 : {...},
  ...
}

idea : {
  unikeyidea1 : {
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
  idea = {
    text,
    date,
    ...
}
*/


// PUSH
const push = (idea) => {
  return (dispatch) => {
    dispatch({ type: PUSH });

    const database = firebase.database();
    const userKey = firebase.auth().currentUser.uid;
    const text = idea.text;
    const ideaRef = database.ref('/idea/').push();

    const ideaObject = {
      user : userKey,
      text : text.trim(),
      removed : false,
      likes : 0,
    };

    ideaRef.set(ideaObject);

    const ideaKey = ideaRef.key;
    const ideaRefInUser = database.ref('/users/' + userKey + '/idealist/' + ideaKey);
    ideaRefInUser.set(ideaObject);

    dispatch(getIdeaList());
  }
}

const pushFailure = error => ({ type: PUSH_FAILURE, payload: error });

const pushSuccess = () => ({ type: PUSH_SUCCESS });


// REMOVE
const remove = (ideaKey) => {
  return (dispatch) => {
    dispatch({ type: REMOVE });
    const database = firebase.database();
    const userKey = firebase.auth().currentUser.uid;
    const ideaRef = database.ref('/idea/' + ideaKey);
    const ideaRefInUser = database.ref('/users/' + userKey + '/idealist/' + ideaKey);

    var updates = {};
    updates["removed"] = true;
    ideaRef.update(updates);
    ideaRefInUser.update(updates);

    dispatch(getIdeaList());
  }
}

const removeFailure = error => ({ type: REMOVE_FAILURE, payload: error });

const removeSuccess = () => ({ type: REMOVE_SUCCESS });


// UPDATE
const update = (ideaKey, what) => {
  return (dispatch) => {
    dispatch({ type: UPDATE });
    const database = firebase.database();
    const userKey = firebase.auth().currentUser.uid;
    const ideaRef = database.ref('/idea/' + ideaKey);

    ideaRef.once('value').then(snapshot => {
      const oldIdea = snapshot.val();

      ideaRef.set(
        Object.assign(oldIdea, what)
      )

      const ideaRefInUser = database.ref('/users/' + userKey + '/idealist/' + ideaKey);
      ideaRefInUser.set(
        Object.assign(oldIdea, what)
      )
    });

    dispatch(getIdeaList());
  }
}

const updateFailure = error => ({ type: UPDATE_FAILURE, payload: error });

const updateSuccess = () => ({ type: UPDATE_SUCCESS });


// GET DATA
const getIdeaList = () =>{

  return (dispatch) => {
    dispatch({ type: GET_IDEALIST });

    var ownerIdeas = [];
    var worldIdeas = [];
    firebase.database().ref('/idea')
      .once('value')
      .then(snapshot => {
          for (var elem in snapshot.val()){
            if (!snapshot.val()[elem]["removed"]){
              var text = snapshot.val()[elem]["text"];
              if (text){
                var key =  elem;
                var id =  elem;
                var likes = snapshot.val()[elem]["likes"];
                worldIdeas.push([key, text, likes, id]);
                if (firebase.auth().currentUser && snapshot.val()[elem]["user"] == firebase.auth().currentUser.uid){
                  ownerIdeas.push([key, text, likes, id]);
                }
              }
            }
          }
          dispatch(getIdeaListSuccess({ownerIdeas, worldIdeas}));
       })
      .catch(e => dispatch(getIdeaListFailure(e)));

  }
}

const getIdeaListFailure = error => ({ type: GET_IDEALIST_FAILURE, payload: error });

const getIdeaListSuccess = ({ownerIdeas, worldIdeas}) => ({ type: GET_IDEALIST_SUCCESS, payload: {ownerIdeas, worldIdeas} });

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

  getIdeaList,
  getIdeaListFailure,
  getIdeaListSuccess,
};
