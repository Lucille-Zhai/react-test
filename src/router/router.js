import React from 'react';

import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import Bundle from './Bundle';

import Home from 'bundle-loader?lazy&name=home!pages/Home/Home';
import Counter from 'bundle-loader?lazy&name=counter!pages/counter/counter';
import Designer from 'bundle-loader?lazy&name=counter!pages/Designer/Designer';
import NotFound from 'bundle-loader?lazy&name=notFound!pages/NotFound/NotFound';

const Loading = function () {
    return <div>Loading...</div>
};

const createComponent = (component) => (props) => (
    <Bundle load={component}>
        {
            (Component) => Component ? <Component {...props} /> : <Loading/>
        }
    </Bundle>
);

const getRouter = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={createComponent(Home)}/>
            <Route path="/counter" component={createComponent(Counter)}/>
            <Route path="/Designer" component={createComponent(Designer)}/>
            <Route component={createComponent(NotFound)}/>
        </Switch>
    </Router>
);

export default getRouter;