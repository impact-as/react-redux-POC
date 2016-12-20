import { Action, combineReducers, Store, createStore, applyMiddleware } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import * as createLogger from 'redux-logger';

// import { testReducer as count } from './test/';
import { productListReducer as productList, IProductListState } from './product-list/';
import { basketReducer as basket, IBasketState } from './basket/';

export interface IApplicationState {
    basket: IBasketState,
    productList: IProductListState,
}

const rootReducer = combineReducers<IApplicationState>({
    // count,
    productList,
    basket,
    routing
});

const enhancer = composeWithDevTools(
    applyMiddleware(createLogger(), thunkMiddleware)
);

let appStore: Store<IApplicationState> = null as Store<IApplicationState>;

const generateStore = () => {
    appStore = createStore<IApplicationState>(rootReducer, enhancer);
    return appStore;
}

export const store = appStore || generateStore();