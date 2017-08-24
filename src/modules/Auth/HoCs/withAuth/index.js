import React, { Component} from 'react';
import { connect } from 'react-redux';


const withAuthHoC = WrappedComponent => class withAuthHoC extends Component{
  constructor(props) {
    super(props);

    this.state = {
      user :
    }
  }

  render() {
    return <WrappedComponent {...this.props} user={this.state.user} />;

  }
};

const mapStateToProps = state => ({
  user: state.auth.user,
})

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(withAuthHoC);
