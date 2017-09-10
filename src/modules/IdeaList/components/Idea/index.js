import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { getIdeaList, remove, update } from '../../actions';
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


  render() {
    const {
      onClickRemove,
      onClickUpdateItem,
      props: {
        editable
      }
    } = this;

    return (
      <div>
        <div className="idea-item">
          <span className="like-mark">&#9899; {this.props.likes}</span>
          <span>{this.props.text}</span>
          {editable &&
          <button className="x-mark" onClick={onClickRemove}>REMOVE</button>
          }
          {editable &&
          <button onClick={onClickUpdateItem} className="edit-mark">EDIT</button>
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
  dispatch,
});

Idea.propTypes = {
  likes: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
  editable: PropTypes.bool.isRequired,
  onUpdateItem: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Idea);
