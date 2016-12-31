import { Action, combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

// import { testReducer as count } from './test/';
import { productListReducer as productList, IProductListState } from './product-list/';
import { basketReducer as basket, IBasketState } from './basket/';
import { productFilterReducer as productFilter, IFilter } from './product-filter/';

export interface IApplicationState {
    basket: IBasketState,
    productList: IProductListState,
    productFilter: IFilter[]
}

export const rootReducer = combineReducers({
    productList,
    basket,
    productFilter,
    routing
});