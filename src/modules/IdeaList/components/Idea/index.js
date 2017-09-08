import { connect } from 'react-redux';
import { getIdeaList, remove, update } from '../../actions';
import React, { Component, PropTypes } from 'react';

class Idea extends Component {

  onClickRemove = () => {
    const { onRemove } = this.props;
    const key = this.props.id;
    onRemove(key);
    // this.props.onGetIdeaList();
  }

  // onClickLike = () => {
  //   const { onLike } = this.props;
  //   const key = this.props.id;
  //   onLike(key, this.props.liked);
  //   // this.props.onGetIdeaList();
  // }

  onClickUpdateItem = () => {
    const key = this.props.id;
    const { onUpdateItem } = this.props;
    const text = prompt("Edit task", this.props.text);
    this.props.onUpdateItem(key, text);
    // this.props.onGetIdeaList();
  }


  render() {
    const{
      onClickRemove,
      // onClickLike,
      onClickUpdateItem,
      props : {
        likes,
        text,
        id,
        editable,
    }} = this;

    return (
      <div>
        <div className="idea-item">
          <span className="like-mark">&#9899; {this.props.likes}</span>
          <span>{this.props.text}</span>
          { editable &&
            <button className="x-mark" onClick={onClickRemove}>REMOVE</button>
          }
          { editable &&
            <button onClick={onClickUpdateItem} className="edit-mark">EDIT</button>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ideaList: state.idea.ideaList,
})

const mapDispatchToProps = dispatch => ({
  onUpdateItem(key, newText){
    dispatch(update(key, {text: newText}));
  },

  onRemove(key){
    dispatch(remove(key));
  },
  // onLike(key, isLiked){
  //   dispatch(update(key, {liked: !isLiked}));
  // },
  onGetIdeaList(){
    dispatch(getIdeaList());
  },
  dispatch,
});

Idea.propTypes = {
  likes: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
  editable: PropTypes.bool.isRequired,
  onUpdateItem: PropTypes.func.isRequired,
  // onLike: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Idea);
