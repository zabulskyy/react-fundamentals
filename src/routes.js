import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import HomePage from './components/Home/homePage';
import AboutPage from './components/About/aboutPage';
import CoursePage from './components/Course/coursesPage';
import ProfilePage from './components/Profile/profilePage';

import Auth, { Login, Register } from './modules/Auth';



export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="about" component={AboutPage}/>
    <Route path="courses" component={CoursePage}/>
    <Route path="profile" component={ProfilePage}/>
    <Route path="login" component={Auth}>
      <IndexRoute component={Login} /> // /login
    </Route>
    <Route path="register" component={Auth}>
      <IndexRoute component={Register}/>  // /register
    </Route>
  </Route>

);
