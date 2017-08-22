import React from 'react';
import parentHOC from './parentHOC'

class testComponent2 extends React.Component{
  constructor(props){
    this.state = {
      param1: 'onesentence',
      param2: 'texttexttext'
    }
  }
}

const testComponent_2_WithSubscription = withSubscription(
  testComponent1,
  (parentHOC) => {
    DataSource.state.paramZ,
    DataSource.state.paramX
  }
);

export default testComponent2;
