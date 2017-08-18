import React from 'react';
import {Link} from 'react-router';

class HomePage extends React.Component{
  render(){
    return (
      <div>
        <h1> A simple courses application </h1>
        <h3> Create, delete, save and share your courses</h3>
        <br/>
        <Link to="about" className="btn btn-primary btn-lg"> Learn more</Link>
        <br/>
        <br/>
        <Link to="courses" className="btn btn-primary btn-lg"> Let's start</Link>
      </div>

    );
  }
}

export default HomePage;
