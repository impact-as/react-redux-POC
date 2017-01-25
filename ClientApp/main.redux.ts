import { Action, combineReducers, createStore, applyMiddleware, Store } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import { syncHistoryWithStore } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// import { testReducer as count } from './test/';
import { productListReducer as productList, IProductListState } from './product-list/';
import { basketReducer as basket, IBasketState } from './basket/';
import { productFilterReducer as productFilter, IFilter } from './product-filter/';

export interface IApplicationState {
    menuItems: any[];
    basket: IBasketState;
    productList: IProductListState;
    productFilter: IFilter[];
}

export const rootReducer = combineReducers<IApplicationState>({
    menuItems: (state = [], action) => state,
    productList,
    basket,
    productFilter,
    routing
});

export const configureStore = (initialState?: IApplicationState): Store<IApplicationState> => {
    const enhancer = composeWithDevTools(
        applyMiddleware(thunkMiddleware)
    );

    return createStore<IApplicationState>(rootReducer, initialState, enhancer);
}