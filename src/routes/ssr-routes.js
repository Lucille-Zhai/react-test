import React from 'react';
import {Switch, Route} from 'react-router-dom';

//同步引入组件类
import Home from '../containers/Home/index'
import Product from '../containers/product/index'

const routes = ()=><Switch>
  <Route path="/" component={Home}/>
  <Route path="/product" component={Product}/>
</Switch>;

export default routes;

/*const routes = [
  { path: '/about',
    component: About,
    loadData: ()=>{}
  },
  { path: '/dashboard',
    component: Dashboard,
    loadData: ()=>{}
    /!*routes: [
      { path: '/tacos/bus',
        component: Bus
      },
      { path: '/tacos/cart',
        component: Cart
      }
    ]*!/
  }
];*/