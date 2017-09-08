import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getIdeaList, push, remove, update } from '../../actions';
import Idea  from '../../components/Idea';
import hasAuth from '../../../Auth/components/hasAuth';
import * as firebase from 'firebase';


class WorldIdeas extends Component {

  componentWillMount(){
    this.props.onGetIdeaList();
  }

  render() {
    const {
      props : {
        worldIdeas,
        user,
      },
    } = this;
    return (
      <div className="row">
        <h1 className="header-text">Ideas of the world</h1>
        <h3 className="header-subtext">Watch them, like them, discuss them</h3>
        <br/>
        <div>
          <div className="idea-place-holder">
              {worldIdeas.map(i => <Idea key={i[0]} text={i[1]} likes={i[2]} id={i[3]} editable={false}/>)}
          </div>
        </div>
      </div>
    );
  }
}

WorldIdeas.propTypes = {
  worldIdeas: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
   user: state.auth.user,
   worldIdeas: state.idea.worldIdeas
})

const mapDispatchToProps = dispatch => ({
  onGetIdeaList(){
    dispatch(getIdeaList());
  },
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(WorldIdeas);