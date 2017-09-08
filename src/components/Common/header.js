import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {Link, IndexLink} from 'react-router';


class Header extends Component{
  constructor(props) {
    super(props);
  }

  render(){
    const { props : {user} } = this;

    return (
      <nav className="header">
        <IndexLink to="/"          className="header-link" activeClassName="active">Home</IndexLink>
        <Link to="/worldideas"     className="header-link" activeClassName="active">World ideas</Link>
        <Link to="/myideas"        className={user ? "header-link" : "hide"} activeClassName="active">My ideas</Link>
        <Link to="/about"          className="header-link" activeClassName="active">About</Link>
        <Link to="/profile"        className={user ? "header-link header-link-right" : "hide"} activeClassName="active">Profile</Link>
        <Link to="/register"       className={user ? "hide" : "header-link header-link-right"} activeClassName="active">Register</Link>
        <Link to="/login"          className={user ? "hide" : "header-link header-link-right"} activeClassName="active">Login</Link>
      </nav>
  );}
}

Header.propTypes = {
  user: PropTypes.object,
};

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mapStateToProps = state => ({
  user: state.auth.user,
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);
