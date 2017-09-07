 // app template used on every page
import Header from './Common/header';
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { lookForUser } from '../modules/Auth/actions';

class App extends React.Component{

  componentWillMount(){
    const { onLook } = this.props;
    onLook();
  }

  render(){
    return (
      <div className="container-fluid">
        <Header />
        <div className="field">
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  onLook: PropTypes.func,
  children: PropTypes.object,
};

const mapDispatchToProps = dispatch => ({
  onLook(){
    dispatch(lookForUser());
  },

  dispatch,
});

export default connect(null, mapDispatchToProps)(App);
