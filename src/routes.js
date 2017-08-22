import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/app';
import HomePage from './components/Home/homePage';
import AboutPage from './components/About/aboutPage';
import CoursePage from './components/Course/coursesPage';
import AuthenticationPage from './components/Authentication/authenticationPage';
import testHOC1 from './components/TestHOC/testHOC1';
import testHOC2 from './components/TestHOC/testHOC2';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="about" component={AboutPage}/>
    <Route path="courses" component={CoursePage}/>
    <Route path="login" component={AuthenticationPage}/>
    <Route path="thoc1" component={testHOC1}/>
    <Route path="thoc2" component={testHOC2}/>

    // TODO disable and show profile when logged in
    // TODO create profile page
  </Route>

);
