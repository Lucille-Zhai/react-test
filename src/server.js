import express from 'express';
import React from 'react';
import {Provider} from 'react-redux';
import ReactDOMServer from 'react-dom/server';
import {StaticRouter, matchPath} from 'react-router-dom';

import Routes from './routes/ssr-routes';
import configureStore from './store/configureStore';

const App = express();
const tmp = `
<html>
  <head>
    <title>React-Redux Universal</title>
    <meta charset="UTF-8">
     <base href="/static/" />
    <link rel="stylesheet" href="assets/styles/main.css">
  </head>
  <body>
    <div id="root"><!-- CONTENT --></div>
  </body>
  <script>
    window.initialStoreData = "-- STORES --";
  </script>
  <script src="js/bundle.js"></script>
</html>
`;

App.use('/', (req, res) => {
  console.log(req.url);
  const context = {};

  const store = configureStore({});

  const html = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter
        location={req.url}
        context={context}
      >
        <Routes/>
      </StaticRouter>
    </Provider>
  );
  if (context.url) {
    res.writeHead(302, {
      Location: context.url
    });
    res.end();
  } else {
    const state = store.getState();
    res.write(tmp.replace('<!-- CONTENT -->', html)
      .replace('"-- STORES --"', JSON.stringify(state)));
    res.end();
  }
});
App.listen(3000);

/*if(module.hot) {
  // accept update of dependency
  module.hot.accept("./handler.js", function() {
    // replace request handler of server
    server.removeListener("request", requestHandler);
    requestHandler = require("./handler.js");
    server.on("request", requestHandler);
  });
}*/
