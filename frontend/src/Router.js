// src/Router.js

import React from 'react';
// Router.js
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
import HomePage from './pages/Home/HomePage';
import ProfilePage from './pages/Profile/ProfilePage';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <Route path="/home" component={HomePage} />
        <Route path="/profile" component={ProfilePage} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
