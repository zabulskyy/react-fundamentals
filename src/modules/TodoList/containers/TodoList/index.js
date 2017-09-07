import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getTodoList, push, remove, update } from '../../actions';
import TodoItem  from '../../components/TodoItem';
import * as firebase from 'firebase';


class TodoList extends Component {

  constructor(props){
    super(props);
    this.state = {
      arrTodoList: [],
    }
  }

  setRefInput = (input) => {
    this.input = input;
  }

  setRefSubmit = (submit) => {
    this.submit = submit;
  }

  createTask = () => {
    const task = this.input.value;
    this.input.value = '';
    const { onPush } = this.props;
    onPush({
      text : task
    });
    this.props.onGetTodoList();
  }

  createTaskWithKey = (key) => {
    if (key === 13)
      this.createTask();

  }

  componentWillMount(){
    this.props.onGetTodoList();
  }

  render() {
    const {
      createTask,
      createTaskWithKey,
      setRefInput,
      setRefSubmit,
      props : {
        user,
        todoList,
      },
    } = this;
    return (
      <div className="row">
        <h1 className="header-text">Your to-do list</h1>
        <h3 className="header-subtext">Type your task and press Enter to submit</h3>
        { user &&
        <div>
          <div>
            <input onKeyDown={e => createTaskWithKey(e.keyCode)} placeholder="Type your task here..." type="text" ref={setRefInput}></input>
          </div>
          <div className="todo-place-holder">
              {todoList.map(i => <TodoItem key={i[0]} text={i[1]} done={i[2]} id={i[3]} />)}
          </div>
        </div>
        }
      </div>
    );
  }
}

TodoList.propTypes = {
  onGetTodoList: PropTypes.func.isRequired,
  todoList: PropTypes.array.isRequired,
  onPush: PropTypes.func.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
   user: state.auth.user,
   todoList: state.todo.todoList
})

const mapDispatchToProps = dispatch => ({
  onPush(text){
    dispatch(push(text));
  },
  onGetTodoList(){
    dispatch(getTodoList());
  },
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
