import React from 'react';
import {Link} from 'react-router';

class HomePage extends React.Component{
  render(){
    return (
      <div>
        <h1 className="header-text"> A simple to-do application </h1>
        <h3 className="header-subtext"> Create, save and share your tasks</h3>
        <br/>
        <Link to="about" className="bttn bttn-primary"> Learn more</Link>
        <br/>
        <Link to="todolist" className="bttn bttn-primary"> Let's start</Link>
      </div>

    );
  }
}

export default HomePage;
