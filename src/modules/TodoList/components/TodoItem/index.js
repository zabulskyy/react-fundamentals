import { connect } from 'react-redux';
import { getTodoList, remove, update } from '../../actions';
import React, { Component, PropTypes } from 'react';

class TodoItem extends Component {

  onClickRemove = () =>{
    const { onRemove } = this.props;
    var key = this.props.id;
    onRemove(key);
    this.props.onGetTodoList();
  }


  render() {
    const{
      onClickRemove,
      props : {
        done,
        text,
        id,
    }} = this;

    return (
      <div className="todo-item">
        <span className={done ? "todo-done" : "todo-undone"}>{this.props.text}</span>
        <button className="x-mark" onClick={onClickRemove}>X</button>
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
  onGetTodoList(){
    dispatch(getTodoList());
  },
  dispatch,
});

TodoItem.propTypes = {
  done: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);
