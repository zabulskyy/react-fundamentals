import AuthHoC from '../Authentication/AuthHoC.js';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../actions/courseActions';
import { bindActionCreators } from 'redux';
import { Link, IndexLink } from 'react-router';

class CoursePage extends React.Component {
  // constructor(props, context) {
  //   super(props, context);
  // }

  render() {
    const { firebaseUser } = this.props;
    return (
      <div>
        <h1 className="header-text">Courses</h1>
        <h3 className={firebaseUser ? "hide" : ""}>
          Only logged users can view Courses
           <br/>
        </h3>
          <Link to="/authentication" className={firebaseUser ? "hide" : ""} activeClassName="active">
            Login or Register to view Courses
          </Link>
      </div>
    );
  }
}

CoursePage.propTypes = {
  firebaseUser: PropTypes.object,
};

function mapStateToProps(state, ownProps){
  return {
    courses: state.courses
  };
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthHoC(CoursePage));
