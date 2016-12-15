import { Action, combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

// import { testReducer as count } from './test/';
import { productListReducer as productList, IProductListState } from './product-list/';
import { basketReducer as basket, IBasketState } from './basket/';

export interface IApplicationState {
    basket: IBasketState,
    productList: IProductListState,
}

export const rootReducer = combineReducers({
    // count,
    productList,
    basket,
    routing
});