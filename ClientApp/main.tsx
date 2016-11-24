import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import * as createLogger from 'redux-logger';
import { syncHistoryWithStore } from 'react-router-redux';
import { createDevTools } from 'redux-devtools';

import { AppComponent } from './app/app.component';
import { ProductList } from './product-list/';
import { TestComponent } from './test/';
import { compose } from 'redux';
// import { createDevTools } from 'redux-devtools';

import { rootReducer } from './main.redux';

import '../Public/scss/styles.scss';

const enhancer = compose(
    applyMiddleware(createLogger(), thunkMiddleware)
);

const store = createStore(rootReducer, enhancer);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={AppComponent}>
                <IndexRoute component={ProductList} />
                <Route path="test" component={TestComponent} />
                <Route path="*" component={TestComponent} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById("entry")
);