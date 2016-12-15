import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';

import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import * as createLogger from 'redux-logger';
import { syncHistoryWithStore } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { AppComponent } from './app/app.component';
import { ProductList } from './product-list/';
import { TestComponent } from './test/';
import { RootRoute } from './routes';

import { rootReducer } from './main.redux';

import '../Public/scss/styles.scss';

const enhancer = composeWithDevTools(
    applyMiddleware(createLogger(), thunkMiddleware)
);

const store = createStore(rootReducer, enhancer);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
    <Provider store={store}>
        <Router history={history} routes={RootRoute}></Router>
    </Provider>,
    document.getElementById("entry")
);