import { connect } from 'react-redux';
import { getTodoList, remove, update } from '../../actions';
import React, { Component, PropTypes } from 'react';

class TodoItem extends Component {

  onClickRemove = () => {
    const { onRemove } = this.props;
    const key = this.props.id;
    onRemove(key);
    // this.props.onGetTodoList();
  }

  onClickDone = () => {
    const { onDone } = this.props;
    const key = this.props.id;
    onDone(key, this.props.done);
    // this.props.onGetTodoList();
  }

  onClickUpdateItem = () => {
    const key = this.props.id;
    const { onUpdateItem } = this.props;
    const text = prompt("Edit task", this.props.text);
    this.props.onUpdateItem(key, text);
    // this.props.onGetTodoList();
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
          <div className={done ? "todo-done todo-item" : "todo-undone todo-item"}>
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
  user: state.auth.user,
  todoList: state.todo.todoList,
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
  onGetTodoList(){
    dispatch(getTodoList());
  },
  dispatch,
});

TodoItem.propTypes = {
  done: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired,
  onUpdateItem: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);
