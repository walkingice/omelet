import React from 'react';
import ReactDom from 'react-dom';
import {Router, Route, Redirect} from 'react-router'

import Layout from './views/Layout/Layout.jsx';
import Intro from './views/Intro/Intro.jsx';
import About from './views/About/About.jsx';

import "../style/app.less";

const routes = <Route component={Layout}>
  <Route path="/" components={{main: Intro}}/>
  <Route path="/about" components={{main: About}}/>
  <Redirect from="*" to="/"/>
</Route>

ReactDom.render(
  <Router>
    {routes}
  </Router>,
  document.getElementById('app')
);

