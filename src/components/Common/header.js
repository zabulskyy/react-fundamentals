import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';

const Header = () => {
  return(
    <nav className="header">
      <IndexLink to="/" className="header-link" activeClassName="active">Home</IndexLink>
      <Link to="/courses" className="header-link" activeClassName="active">Courses</Link>
      <Link to="/about" className="header-link" activeClassName="active">About</Link>
      <Link to="/login" className="header-link header-link-right" activeClassName="active">Login</Link>
      <Link to="/register" className="header-link header-link-right" activeClassName="active">Register</Link>
    </nav>
  );
};

export default Header;
