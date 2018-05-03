import React from 'react';
import ReactDom from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'mobx-react';

import getRouter from 'router/router';

/* global module require document MOCK */
if (MOCK) {
    require('mock/mock');
}

/*初始化*/
renderWithHotReload(getRouter());

/*热更新*/
if (module.hot) {
    module.hot.accept('router/router', () => {
        const getRouter = require('router/router').default;
        renderWithHotReload(getRouter());
    });
}

function renderWithHotReload(RootElement) {
    ReactDom.render(
        <AppContainer>
            <Provider>
                {RootElement}
            </Provider>
        </AppContainer>,
        document.getElementById('container')
    );
}