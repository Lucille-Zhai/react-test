import React from 'react';
import {render} from 'react-dom';
import { Provider } from "mobx-react";
import 'url-search-params-polyfill';

import '../styles/base/reset.less';
import iconfont from '@/fonts/base/iconfont.js';

// Stores
import store from '../store';

// Routes
import Routers from '../routes/base';

const MOUNT_NODE = document.getElementById("root-container");
// dev
if (process.env.NODE_ENV === "development") {
  let HotContainer = require("react-hot-loader").AppContainer;
  render(
    <HotContainer>
      <Provider store={store}>
        {Routers}
      </Provider>
    </HotContainer>,
    MOUNT_NODE
  );
  if (module.hot) {
    module.hot.accept();
  }
}

// test
// if (__TEST__) {

// }

// production
if (process.env.NODE_ENV === "production") {
  render(
    <Provider store={store}>
      {Routers}
    </Provider>,
    MOUNT_NODE
  );
}
