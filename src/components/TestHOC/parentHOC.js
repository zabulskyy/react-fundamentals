import testHOC1 from './components/TestHOC/testHOC1'
import testHOC2 from './components/TestHOC/testHOC2'

import React from 'react';

const parentHOC = WrappedComponent => class parent extends React.Component{
  this.state = {
    paramX: 'lol',
    paramZ: 'kek'
  }

  componentWillMount() {
    this.setState({ paramZ: Date.now() });
  }

  render() {
    return <WrappedComponent {...this.props} paramX={this.state.paramX} paramZ={this.state.paramZ} />;
  }
}

export default parentHOC;
