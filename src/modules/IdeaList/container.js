
import React, { Component, PropTypes } from 'react';

class IdeaList extends Component {


  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default IdeaList;
