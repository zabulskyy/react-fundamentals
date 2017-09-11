import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getIdeaList, push, remove, update } from '../../actions';
import Idea from '../../components/Idea';
import hasAuth from '../../../Auth/components/hasAuth';
import * as firebase from 'firebase';


class IdeaList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      arrIdeaList: [],
    }
  }

  setRefInput = (input) => {
    this.input = input;
  };

  setRefSubmit = (submit) => {
    this.submit = submit;
  };

  createTask = () => {
    const task = this.input.value;
    this.input.value = '';
    const { onPush } = this.props;
    onPush({
      text: task
    });
    this.props.onGetIdeaList();
  };

  createTaskWithKey = (key) => {
    if (key === 13)
      this.createTask();

  };

  componentWillMount() {
    this.props.onGetIdeaList();
  }

  render() {
    const {
      createTaskWithKey,
      setRefInput,
      props: {
        user,
        ideaList,
      },
    } = this;
    return (
      <div className="row">
        <h1 className="header-text">Your ideas</h1>
        <h3 className="header-subtext">Type your task and press Enter to submit</h3>
        {user &&
        <div>
          <div>
            <input onKeyDown={e => createTaskWithKey(e.keyCode)} placeholder="Type your task here..." type="text"
                   ref={setRefInput}></input>
          </div>
          <div className="idea-place-holder">
            {ideaList.map(i => <Idea key={i[0]} text={i[1]} likes={i[2]} id={i[3]} user={i[4]}/>)}
          </div>
        </div>
        }
      </div>
    );
  }
}

IdeaList.propTypes = {
  onGetIdeaList: PropTypes.func.isRequired,
  ideaList: PropTypes.array.isRequired,
  onPush: PropTypes.func.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  ideaList: state.idea.ownerIdeas
});

const mapDispatchToProps = dispatch => ({
  onPush(text) {
    dispatch(push(text));
  },
  onGetIdeaList() {
    dispatch(getIdeaList());
  },
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(hasAuth(IdeaList));
