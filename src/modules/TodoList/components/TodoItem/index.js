import { connect } from 'react-redux';
import { getTodoList, remove, update } from '../../actions';
import React, { Component, PropTypes } from 'react';

class TodoItem extends Component {

  onClickRemove = () => {
    const { onRemove } = this.props;
    var key = this.props.id;
    onRemove(key);
    this.props.onGetTodoList();
  }

  onClickDone = () => {
    const { onDone } = this.props;
    var key = this.props.id;
    onDone(key, this.props.done);
    this.props.onGetTodoList();
  }

  render() {
    const{
      onClickRemove,
      onClickDone,
      props : {
        done,
        text,
        id,
    }} = this;


    return (/*
      <div className="todo-item">
        { !this.editMode &&
          <div>
            <button onClick={onClickDone} className={done ? "done-mark done-mark-done" : "done-mark done-mark-undone"}>&#10004;</button>
            <span   className={done ? "todo-done" : "todo-undone"}>{this.props.text}</span>
            <button className="x-mark" onClick={onClickRemove}>&#10008;</button>
            <button className="edit-mark" onClick={this.editMode = !this.editMode}>&#10000;</button>
          </div>
        }

        { this.editMode &&
          <div>
            <input type="text"> </input>
            <button className="edit-mark">&#9989;</button>
          </div>
        }
      </div>*/

      <div>
        <button onClick={onClickDone} className={done ? "done-mark done-mark-done" : "done-mark done-mark-undone"}>&#10004;</button>
        <span   className={done ? "todo-done" : "todo-undone"}>{this.props.text}</span>
        <button className="x-mark" onClick={onClickRemove}>&#10008;</button>
        <button className="edit-mark" /*onClick={this.editMode = !this.editMode}*/>&#10000;</button>
      </div>

    )
  }
}

const mapStateToProps = state => ({
   onGetTodoList: PropTypes.func.isRequired,
   user: state.auth.user,
   todoList: state.todo.todoList,
})

const mapDispatchToProps = dispatch => ({
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
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);
