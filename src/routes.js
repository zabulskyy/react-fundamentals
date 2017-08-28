import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import HomePage from './components/Home/homePage';
import AboutPage from './components/About/aboutPage';
import ProfilePage from './components/Profile/profilePage';

import { TodoList } from './modules/TodoList';
import Auth, { Login, Register } from './modules/Auth';



export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="about" component={AboutPage}/>
    <Route path="profile" component={ProfilePage}/>
    <Route path="todolist" component={TodoList}/>
    <Route path="login" component={Auth}>
      <IndexRoute component={Login} /> // /login
    </Route>
    <Route path="register" component={Auth}>
      <IndexRoute component={Register}/>  // /register
    </Route>
  </Route>

);
