import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './Login';
import Container from './Container';
import './index.css';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import AuthService from './utils/AuthService';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import runtimeEnv from '@mars/heroku-js-runtime-env';

const env = runtimeEnv();

const auth = new AuthService(env.REACT_APP_CLIENT_ID, env.REACT_APP_AUTH0_DOMAIN, env.REACT_APP_REDIRECT_URL);

const authenticate = (nextState, replace) => {
  if (!auth.isAuthenticated()) {
    replace({ pathname: '/login' })
  }
}

const router =
  <Router history={browserHistory}>
    <Route path="/" component={Container} auth={auth}>
      <IndexRedirect to="/app" />
      <Route path="app" component={App} onEnter={authenticate} />
      <Route path="login" component={Login}/>
    </Route>
  </Router>

ReactDOM.render(
  router,
  document.getElementById('root')
);
