import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import HomePage from './components/Home/homePage';
import AboutPage from './components/About/aboutPage';
import CoursePage from './components/Course/coursesPage';
import AuthenticationPage from './components/Authentication/authenticationPage';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="about" component={AboutPage}/>
    <Route path="courses" component={CoursePage}/>
    <Route path="authentication" component={AuthenticationPage}/>

    // TODO disable and show profile when logged in
    // TODO create profile page
  </Route>

);
