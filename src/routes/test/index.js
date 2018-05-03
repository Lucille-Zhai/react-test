import React, { Component } from 'react';

import HashRouter from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import {
  Router,
  Route,
  Link,
  Switch,
  Redirect,
  //BrowserRouter as Router,
} from 'react-router-dom';
import routes from './routes';
import createBrowserHistory from 'history/createBrowserHistory';
import util from 'util';

//console.log(BrowserRouter);

import classnames from 'classnames';

import Wrap from '@/components/Wrap';


import '@/styles/base/reset.less';

const historyConfig = createBrowserHistory({
  basename: '/' + __AREA_ENV__
});


export default (
  <Router history={historyConfig}>
    <Wrap id='root-wrap'>
      
      <Wrap id='body'>
        <Switch>
          {renderRoutes(routes)}
          <Redirect to='/notfound' />
        </Switch>
      </Wrap>    
    </Wrap>
  </Router>
);