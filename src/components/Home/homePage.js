import React from 'react';
import {Link} from 'react-router';

class HomePage extends React.Component{
  render(){
    return (
      <div>
        <h1 className="header-text"> A simple to-do application </h1>
        <h3 className="header-subtext"> Create, save and share your tasks</h3>
        <br/>
        <Link to="about" className="header-info">Learn more</Link>.
        <br/>
        <br/>
        <Link to="login" className="header-info">Login</Link>
        or
        <Link to="register" className="header-info">create account</Link>
        and
        <Link to="todolist" className="header-info">go!</Link>
      </div>

    );
  }
}

export default HomePage;
