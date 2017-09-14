import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { getIdeaList, remove, update, likeIdea } from '../../actions';
import React, { Component, PropTypes } from 'react';

class Idea extends Component {

  onClickRemove = () => {
    if (!confirm("Are you sure you want to delete " + this.props.ideaObject.text + " ?")) {
      return;
    }
    const { onRemove } = this.props;
    const key = this.props.ideaObject.key;
    onRemove(key);
  };

  onClickUpdateItem = () => {
    const key = this.props.ideaObject.key;
    const { onUpdateItem } = this.props;
    const text = prompt("Edit task", this.props.ideaObject.text);
    onUpdateItem(key, text);
  };

  onClickLikeIdea = () => {
    const key = this.props.ideaObject.key;
    const { onLikeIdea } = this.props;
    onLikeIdea(key);

  };


  render() {
    const {
      onClickRemove,
      onClickUpdateItem,
      onClickLikeIdea,
      props: {}
    } = this;

    let userIsOwner = false;
    let user = undefined;
    let likedByCurrentUser = false;

    if (firebase.auth().currentUser) {
      user = firebase.auth().currentUser.uid;
      userIsOwner = this.props.ideaObject.user === user;
      likedByCurrentUser = this.props.ideaObject.whoLiked.indexOf(user) !== -1;
    }

    let ideaClass = "idea-item";
    let heartClass = "heart-mark";

    if (userIsOwner) {
      heartClass += " heart-mark-owner";
      ideaClass += " idea-item-owner";
    } else if (likedByCurrentUser) {
      heartClass += " heart-mark-liked";
      ideaClass += " idea-item-liked";
    }

    return (
      <div className={ideaClass}>
        <div className="idea-actions">
          <span className={heartClass}>{this.props.ideaObject.likes} &#10084;</span>
          {userIsOwner &&
          <button className="x-mark" onClick={onClickRemove}>REMOVE</button>
          }
          {userIsOwner &&
          <button onClick={onClickUpdateItem} className="edit-mark">EDIT</button>
          }
          {!userIsOwner && user &&
          <button onClick={onClickLikeIdea} className="like-mark">{likedByCurrentUser ? "UNLIKE" : "LIKE"}</button>
          }
        </div>
        <div className="idea-container">
          <span>{this.props.ideaObject.text}</span>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ideaList: state.idea.ideaList,
});

const mapDispatchToProps = dispatch => ({
  onUpdateItem(key, newText) {
    dispatch(update(key, { text: newText }));
  },

  onRemove(key) {
    dispatch(remove(key));
  },
  onGetIdeaList() {
    dispatch(getIdeaList());
  },
  onLikeIdea(key) {
    dispatch(likeIdea(key));
  },

  dispatch,
});

Idea.propTypes = {
  ideaObject: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
  onUpdateItem: PropTypes.func.isRequired,
  onLikeIdea: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Idea);
