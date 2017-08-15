import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/app';
import HomePage from './components/home/homePage';
import AboutPage from './components/about/aboutPage';
import CoursePage from './components/course/coursesPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="about" component={AboutPage}/>
    <Route path="courses" component={CoursePage}/>
  </Route>

);
