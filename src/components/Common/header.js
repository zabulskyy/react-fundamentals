import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';

const Header = () => {
  return(
    <nav className="header">
      <IndexLink to="/" className="header-link" activeClassName="active">Home</IndexLink>
      <Link to="/courses" className="header-link" activeClassName="active">Courses</Link>
      <Link to="/about" className="header-link" activeClassName="active">About</Link>
      <Link to="/login" className="header-link header-link-right" activeClassName="active">Login / Register</Link>
    </nav>
  );
};

 // TODO disable ^ and show profile when logged in
export default Header;
