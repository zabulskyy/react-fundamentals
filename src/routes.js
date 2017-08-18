import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/app';
import HomePage from './components/Home/homePage';
import AboutPage from './components/About/aboutPage';
import CoursePage from './components/Course/coursesPage';
import RegisterPage from './components/Register/registerPage';
import LoginPage from './components/Login/loginPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="about" component={AboutPage}/>
    <Route path="courses" component={CoursePage}/>
    <Route path="register" component={RegisterPage}/>
    <Route path="login" component={LoginPage}/>
  </Route>

);
