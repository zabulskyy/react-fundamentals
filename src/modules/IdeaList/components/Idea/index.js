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

  onClickDone = () => {
    const { onDone } = this.props;
    const key = this.props.id;
    onDone(key, this.props.done);
    // this.props.onGetIdeaList();
  }

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
      onClickDone,
      onClickUpdateItem,
      props : {
        done,
        text,
        id,
    }} = this;

    return (
      <div>
          <div className={done ? "idea-done idea-item" : "idea-undone idea-item"}>
            <div onClick={onClickDone} style={{cursor: "pointer"}}>

              <button onClick={onClickDone} className={done ? "done-mark done-mark-done" : "done-mark done-mark-undone"}>CHECK</button>
              <span>{this.props.text}</span>

              <button className="x-mark" onClick={onClickRemove}>REMOVE</button>
              <button onClick={onClickUpdateItem} className="edit-mark">EDIT</button>

            </div>
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
  onDone(key, isDone){
    dispatch(update(key, {done: !isDone}));
  },
  onGetIdeaList(){
    dispatch(getIdeaList());
  },
  dispatch,
});

Idea.propTypes = {
  done: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired,
  onUpdateItem: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Idea);
