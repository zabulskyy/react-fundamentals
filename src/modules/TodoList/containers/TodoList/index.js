import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push, remove, update } from '../../actions';
import TodoItem  from '../../components/TodoItem';
import * as firebase from 'firebase';

class TodoList extends Component {

  constructor(props){
    super(props);
    this.state = {
      todoList: { },
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
  }

  createTaskWithKey = (key) => {
    if (key === 13)
      this.createTask();
  }

  getTodoItems = () => {
        firebase.database().ref('/users/' + firebase.auth().currentUser.uid + '/todolist')
          .once('value')
          .then(snapshot => {
            this.setState({ todoList : snapshot.val() })
          })
          .catch(e => alert(e.message))
        }

  renderTodoItem = (text, done, index) => {
      return <TodoItem key={index} text={text} done={done} />
    }

  objTodoToArrTodo = (objTodo) => {
    var newArr = []
    for (var key in objTodo){
      newArr.push([objTodo[key].text, objTodo[key].done]);
    }
    this.setState({ arrTodoList : newArr });
  }


  log = () => {
    this.objTodoToArrTodo(this.state.todoList);
    console.log(this.state.arrTodoList);
    console.log(this.state.todoList);
  }

  render() {
    var todoList;
    const {
      createTask,
      createTaskWithKey,
      setRefInput,
      setRefSubmit,
      renderTodoItem,
      getTodoItems,
      log,
      objTodoToArrTodo,
      props : {
        user
      },
    } = this;
    return (
      <div className="row">
        { user &&
        <div>
          <div>
            <input onKeyDown={e => createTaskWithKey(e.keyCode)} placeholder="type your task here..." type="text" ref={setRefInput}></input>
            <button onClick={createTask} className="bttn bttn-plus" ref={setRefSubmit}>+</button>
          </div>
          <div id="todoPlaceHolder">
            <button onClick={getTodoItems}>READ</button>
            <button onClick={log}>SHOW</button>
          </div>
          {this.state.arrTodoList.map((i, index) => renderTodoItem(i[0], i[1], index))}
        </div>
        }
      </div>
    );
  }
}

TodoList.propTypes = {
  onPush: PropTypes.func.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
   user: state.auth.user,
})

const mapDispatchToProps = dispatch => ({
  onPush(text){
    dispatch(push(text));
  },
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
