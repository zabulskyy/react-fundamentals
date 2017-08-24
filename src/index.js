import 'babel-polyfill';  // translate different ES versions
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import './styles/styles.css';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import config from './config';
import * as firebase from 'firebase';

const store = configureStore();

firebase.initializeApp(config.firebase);

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>,
  document.getElementById('app')
);
