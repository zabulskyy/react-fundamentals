import React from 'react';
import { Link } from 'react-router';

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <h1 className="header-text"> #Share your ideas </h1>
        <h3 className="header-subtext"> Create, save and share your ideas</h3>
        <br/>
        <Link to="about" className="header-info">Learn more</Link>.
        <br/>
        <br/>
        <Link to="login" className="header-info">Login</Link>
        or
        <Link to="register" className="header-info">create account</Link>
      </div>

    );
  }
}

export default HomePage;
