import React from 'react';
import {Link} from 'react-router';

class HomePage extends React.Component{
  render(){
    return (
      <div>
        <h1 className="header-text"> A simple courses application </h1>
        <h3> Create, delete, save and share your courses</h3>
        <br/>
        <Link to="about" className="bttn bttn-primary"> Learn more</Link>
        <br/>
        <Link to="courses" className="bttn bttn-primary"> Let's start</Link>
      </div>

    );
  }
}

export default HomePage;
