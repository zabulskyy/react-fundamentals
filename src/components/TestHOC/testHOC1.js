import React, { PropTypes } from 'react';
//import PropTypes from 'p'
import parentHOC from './parentHOC'

class testComponent extends React.Component {
  static propTypes = {
   paramX: PropTypes.string.isRequired,
   paramZ: PropTypes.string,
 };
  render () {
    const { paramX, paramZ } = this.props;

    return <div>{paramX} {paramZ}</div>;
  }
}

export default parentHOC(testComponent);
