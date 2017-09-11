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

  LIKE_IDEA,
  LIKE_IDEA_SUCCESS,
  LIKE_IDEA_FAILURE,

  GET_IDEALIST,
  GET_IDEALIST_FAILURE,
  GET_IDEALIST_SUCCESS,
} from './constants.js';


// PUSH
const push = (idea) => {
  return (dispatch) => {
    dispatch({ type: PUSH });

    const database = firebase.database();
    const userKey = firebase.auth().currentUser.uid;
    const text = idea.text;
    const ideaRef = database.ref('/idea/').push();

    const ideaObject = {
      user: userKey,
      text: text.trim(),
      removed: false,
      likes: 0,
      whoLiked: [userKey]
    };

    ideaRef.set(ideaObject);

    const ideaKey = ideaRef.key;

    const ideaRefInUser = database.ref('/users/' + userKey + '/idealist/' + ideaKey);
    ideaRefInUser.set(ideaObject);


    dispatch(getIdeaList());
  };
};

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

    let updates = {};
    updates["removed"] = true;
    ideaRef.update(updates);
    ideaRefInUser.update(updates);

    dispatch(getIdeaList());
  };
};

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
      );

      const ideaRefInUser = database.ref('/users/' + userKey + '/idealist/' + ideaKey);
      ideaRefInUser.set(
        Object.assign(oldIdea, what)
      );
    });

    dispatch(getIdeaList());
  };
};

const updateFailure = error => ({ type: UPDATE_FAILURE, payload: error });

const updateSuccess = () => ({ type: UPDATE_SUCCESS });


// LIKE_IDEA
const likeIdea = (ideaKey) => {
  return (dispatch) => {

    dispatch({ type: LIKE_IDEA });
    const database = firebase.database();
    const userKey = firebase.auth().currentUser.uid;
    const ideaRef = database.ref('/idea/' + ideaKey);

    ideaRef.once('value').then(snapshot => {

      const currentIdea = snapshot.val();

      if (userKey === currentIdea["user"]) {
        return;
      }

      let currentAmountOfLikes = currentIdea["likes"];
      let currentPeopleWhoLiked = currentIdea["whoLiked"];

      const index = currentIdea["whoLiked"].indexOf(userKey);

      if (index === -1) {
        currentAmountOfLikes++;
        currentPeopleWhoLiked.push(userKey);
      } else {
        currentAmountOfLikes--;
        currentPeopleWhoLiked.splice(index, 1);
      }

      ideaRef.set(
        Object.assign(currentIdea, { likes: currentAmountOfLikes, whoLiked: currentPeopleWhoLiked })
      );

      const ideaRefInUser = database.ref('/users/' + userKey + '/idealist/' + ideaKey);
      ideaRefInUser.set(
        Object.assign(currentIdea, { likes: currentAmountOfLikes, whoLiked: currentPeopleWhoLiked })
      );
    });

    dispatch(getIdeaList());
  };
};

const likeIdeaFailure = error => ({ type: LIKE_IDEA_FAILURE, payload: error });

const likeIdeaSuccess = () => ({ type: LIKE_IDEA_SUCCESS });


// GET DATA
const getIdeaList = () => {

  return (dispatch) => {
    dispatch({ type: GET_IDEALIST });

    let ownerIdeas = [];
    let worldIdeas = [];
    firebase.database().ref('/idea')
      .once('value')
      .then(snapshot => {

        for (let elementKey in snapshot.val()) {
          let element = snapshot.val()[elementKey];
          element.key = elementKey;


          if (!element["removed"] && element["text"]) {
            worldIdeas.push(element);

            if (firebase.auth().currentUser && element["user"] === firebase.auth().currentUser.uid) {
              ownerIdeas.push(element);
            }
          }
        }

        const sortByLikes = (a, b) => b.likes - a.likes;

        ownerIdeas = ownerIdeas.sort(sortByLikes);
        worldIdeas = worldIdeas.sort(sortByLikes);

        dispatch(getIdeaListSuccess({ ownerIdeas, worldIdeas }));
      })
      .catch(e => dispatch(getIdeaListFailure(e)));
  };
};

const getIdeaListFailure = error => ({ type: GET_IDEALIST_FAILURE, payload: error });

const getIdeaListSuccess = ({ ownerIdeas, worldIdeas }) => ({
  type: GET_IDEALIST_SUCCESS,
  payload: { ownerIdeas, worldIdeas }
});

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

  likeIdea,
  likeIdeaSuccess,
  likeIdeaFailure,

  getIdeaList,
  getIdeaListFailure,
  getIdeaListSuccess,
};
