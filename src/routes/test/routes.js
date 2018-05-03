import React from 'react';
import Bundle from './lazy';
//个人中心
import loadNotFound from 'bundle-loader?lazy!../../containers/NotFound/index';

import loadTest from 'bundle-loader?lazy!../../containers/Test/index';

import loadHome from 'bundle-loader?lazy!../../containers/Home/test/index';

import loadSuccess from 'bundle-loader?lazy!../../containers/Success/test/index';

import loadTrade from 'bundle-loader?lazy!../../containers/Trade/test/index';

let areaName = '/' + __AREA_ENV__;




const Home = (props) => (
  <Bundle load={loadHome}>
    {(Home) => <Home {...props} />}
  </Bundle>
);

const Trade = (props) => (
  <Bundle load={loadTrade}>
    {(Trade) => <Trade {...props} />}
  </Bundle>
);

const Success = (props) => (
  <Bundle load={loadSuccess}>
    {(Success) => <Success {...props} />}
  </Bundle>
);

const NotFound = (props) => (
  <Bundle load={loadNotFound}>
    {(NotFound) => <NotFound {...props} />}
  </Bundle>
);

const Test = (props) => (
  <Bundle load={loadTest}>
    {(Test) => <Test {...props} />}
  </Bundle>
);

  
const routes = [
  {
    path: '/test',
    component: Test
  },
  {
    path:'/trade',
    component: Trade
  },
  {
    path:'/success',
    component: Success
  },
  {
    path:'/',
    component: Home,
    routes:[
      {
        path: 'a',
        component: Success
      }
    ]
  },
  {
    path: '*',
    component: NotFound
  },
];

export default routes;