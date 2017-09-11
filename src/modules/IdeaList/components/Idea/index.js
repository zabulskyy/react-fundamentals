import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { getIdeaList, remove, update, likeIdea } from '../../actions';
import React, { Component, PropTypes } from 'react';

class Idea extends Component {

  onClickRemove = () => {
    if (!confirm("Are you sure you want to delete " + this.props.text + " ?")) {
      return;
    }
    const { onRemove } = this.props;
    const key = this.props.id;
    onRemove(key);
  };

  onClickUpdateItem = () => {
    const key = this.props.id;
    const { onUpdateItem } = this.props;
    const text = prompt("Edit task", this.props.text);
    onUpdateItem(key, text);
  };

  onClickLikeIdea = () => {
    const key = this.props.id;
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

    const userIsOwner = this.props.user === firebase.auth().currentUser.uid;
    const likedByCurrentUser = this.props.likedByCurrentUser;

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
      <div>
        <div className={ideaClass}>
          <span className={heartClass}>{this.props.likes} &#10084;</span>
          <span>{this.props.text}</span>
          {userIsOwner &&
          <button className="x-mark" onClick={onClickRemove}>REMOVE</button>
          }
          {userIsOwner &&
          <button onClick={onClickUpdateItem} className="edit-mark">EDIT</button>
          }
          {!userIsOwner &&
          <button onClick={onClickLikeIdea} className="like-mark">{likedByCurrentUser ? "UNLIKE" : "LIKE"}</button>
          }
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
  likes: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
  onUpdateItem: PropTypes.func.isRequired,
  onLikeIdea: PropTypes.func.isRequired,
  likedByCurrentUser: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Idea);
