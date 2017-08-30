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
  }

  createTaskWithKey = (key) => {
    if (key === 13)
      this.createTask();

  }
  //
  // getTodoItems = () => {
  //     var newArr = [];
  //     firebase.database().ref('/users/' + firebase.auth().currentUser.uid + '/todolist')
  //       .once('value')
  //       .then(snapshot => {
  //           for (var elem in snapshot.val()){
  //             var text = snapshot.val()[elem].text;
  //             var done = snapshot.val()[elem].done;
  //             var key =  elem;
  //             newArr.push(<TodoItem key={key} text={text} done={done} />)
  //           }
  //        })
  //       .catch(e => alert(e.message))
  //     this.setState({ arrTodoList : newArr })  //TODO
  //   }

  render() {
    const {
      createTask,
      createTaskWithKey,
      setRefInput,
      setRefSubmit,
      // getTodoItems,
      props : {
        user,
        todoList,
        onGetTodoList,
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
          <button onClick={onGetTodoList}>PRESS ME</button>
          <div id="todoPlaceHolder">
              {todoList.map(i => <TodoItem key={i[0]} text={i[1]} done={i[2]} />)}
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
