import { Action, combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import { testReducer as count } from './test/';
import { productListReducer as productList } from './product-list/';
import { basketReducer as basket } from './basket/';

export const rootReducer = combineReducers({
    count,
    productList,
    basket,
    routing
});