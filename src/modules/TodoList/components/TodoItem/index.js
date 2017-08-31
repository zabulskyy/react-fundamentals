import React, { Component, PropTypes } from 'react';

class TodoItem extends Component {
  render() {
    const{
      props : {
        done,
        text,
    }} = this


    return (
      <div className="todo-item">
        <span className={done ? "todo-done" : "todo-undone"}>{this.props.text}</span>
      </div>
    )
  }
}

TodoItem.propTypes = {
  done: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};

export default TodoItem;
