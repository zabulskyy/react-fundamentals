 // app template used on every page

import Header from './Common/header';
import React, {PropTypes} from 'react';

class App extends React.Component{
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
  children: PropTypes.object.isRequired
};

export default App;
