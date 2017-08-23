import AuthHoC from '../Authentication/AuthHoC.js';
import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';


class Header extends React.Component{
  constructor(props) {
    super(props);
  }
  static propTypes = {
   firebaseUser: PropTypes.object,
  };

  render(){
    const { firebaseUser } = this.props;

    return (
      <nav className="header">
        <IndexLink to="/"          className="header-link" activeClassName="active">Home</IndexLink>
        <Link to="/courses"        className="header-link" activeClassName="active">Courses</Link>
        <Link to="/about"          className="header-link" activeClassName="active">About</Link>
        <Link to="/authentication" className={firebaseUser ? "hide" : "header-link header-link-right"} activeClassName="active">Login / Register</Link>
        <Link to="/profile"        className={firebaseUser ? "header-link header-link-right" : "hide"} activeClassName="active">Profile</Link>
      </nav>
  );}
}

export default AuthHoC(Header);
