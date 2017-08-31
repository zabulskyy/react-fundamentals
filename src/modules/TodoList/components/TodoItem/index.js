import { connect } from 'react-redux';
import { remove, update } from '../../actions';
import React, { Component, PropTypes } from 'react';

class TodoItem extends Component {

  onClickRemove = (key) =>{
    const { onRemove } = this.props;
    onRemove(key);
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
        <button className="x-mark" onclick={onClickRemove(this.props.id)}>X</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
   user: state.auth.user,
   todoList: state.todo.todoList
})

const mapDispatchToProps = dispatch => ({
  onRemove(key){
    alert("FUCK");
    dispatch(remove(key));
  },
  dispatch,
});

TodoItem.propTypes = {
  done: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);
