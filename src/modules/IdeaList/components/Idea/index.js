import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { getIdeaList, remove, update, likeIdea, commentIdea } from '../../actions';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';


class Idea extends Component {

  setRefComment = (comment) => {
    this.comment = comment;
  };

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

  createCommentWithKey = (key) => {
    if (key === 13) {
      const comment = this.comment.value;
      this.comment.value = '';
      const { onPushComment } = this.props;
      onPushComment(
        this.props.ideaObject.key,
        comment
    );
      this.props.onGetIdeaList();
    }

  };

  showComment = () => {
    document.getElementById("comments" + this.props.ideaObject.key).classList.toggle("hide");
  };


  render() {
    const {
      onClickRemove,
      onClickUpdateItem,
      onClickLikeIdea,
      showComment,
      setRefComment,
      createCommentWithKey,
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
      <div>
        <div className={ideaClass}>
          <div className="idea-actions">
            <button onClick={onClickLikeIdea} className={heartClass}>{this.props.ideaObject.likes} &#10084;</button>
            {userIsOwner &&
            <button className="x-mark" onClick={onClickRemove}>REMOVE</button>
            }
            {userIsOwner &&
            <button onClick={onClickUpdateItem} className="edit-mark">EDIT</button>
            }
            {!userIsOwner && user &&
            <button onClick={onClickLikeIdea} className="like-mark">{likedByCurrentUser ? "UNLIKE" : "LIKE"}</button>
            }
            <button onClick={showComment}
                    className="comments-mark">{this.props.ideaObject.comments.length} &#10078;</button>
          </div>
          <div className="idea-place-holder">
            <span>{this.props.ideaObject.text}</span>
          </div>
          <div className="comments-container hide" id={"comments" + this.props.ideaObject.key}>
            <h3>Comments</h3>

            {this.props.ideaObject.comments.map((i, unikey) =>
              <div className="comment" key={this.props.ideaObject.key + unikey}>
                <h4>{i.user}</h4>
                <p>{i.text}</p>
              </div>
            )}

            {user &&
            <div>
              <h5 className="comment-text">Leave your opinion</h5>
              <input onKeyDown={e => createCommentWithKey(e.keyCode)} placeholder="press Enter to submit" type="text"
                     className="comment-input" ref={setRefComment}/>
            </div>
            }
            {!user && <h5><Link to="/login">login </Link>to leave your comment</h5>}
          </div>
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

  onPushComment(key, comment) {
    dispatch(commentIdea(key, comment))
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
