import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';

import { createStore, applyMiddleware, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';

import { AppComponent } from './app/app.component';
import { ProductList } from './product-list/';
import { TestComponent } from './test/';
import { getRoutes } from './routes';

import { rootReducer, IApplicationState, configureStore } from './main.redux';

import '../Public/scss/styles.scss';

const initialState = (window as any).initialReduxState as IApplicationState;

const store = configureStore(initialState);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
    <Provider store={store}>
        <Router history={history} routes={getRoutes(store)}></Router>
    </Provider>,
    document.getElementById("entry")
);