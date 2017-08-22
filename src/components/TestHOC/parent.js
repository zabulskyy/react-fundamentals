import React from 'react';

const parent = WrappedComponent => class parent extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      paramX: 'lol',
      paramZ: 'kek'
    };
  }

  componentWillMount() {
    this.setState({ paramZ: Date.now() });
  }

  render() {
    return <WrappedComponent {...this.props} paramX={this.state.paramX} paramZ={this.state.paramZ} />;

  }
};

export default parent;
