import { ActionCreatorsMapObject, Action } from 'redux';

import { productActionTypes, IProduct, productReducer } from '../product/';
import { convertArrayToMap, IMap } from '../utility/';

declare var fetch: (url: string, options?: {}) => any;

//Actions
const actionTypes = Object.assign({
    REQUEST_PRODUCTS: 'REQUEST_PRODUCTS',
    RECEIVE_PRODUCTS: 'RECEIVE_PRODUCTS'
}, productActionTypes);

interface IProductListAction extends Action {
    payload?: IProduct[] | any;
}

export interface IProductListActionsMapObject extends ActionCreatorsMapObject {
    fetchProducts: () => void;
}

const requestProducts = (): IProductListAction => ({type: actionTypes.REQUEST_PRODUCTS});
const receiveProducts = (products): IProductListAction => ({type: actionTypes.RECEIVE_PRODUCTS, payload: products});

const fetchProducts = () => (dispatch) => {
    dispatch(requestProducts);
    fetch('http://www.json-generator.com/api/json/get/celLKmqymq', {method: 'get'})
        .then(response => response.json())
        .then(products => convertArrayToMap<IProduct>(products, 'id'))
        .then(productMap => dispatch(receiveProducts(productMap)));
};

export const actions: IProductListActionsMapObject = {
    fetchProducts
}

//State
export interface IProductListState {
    fetching: boolean;
    products: IMap<IProduct>;
}

export const productListReducer = (state: IProductListState = {products: {}} as IProductListState, action: IProductListAction) => {
    switch(action.type) {
        case actionTypes.REQUEST_PRODUCTS:
            return Object.assign({}, state, {fetching: true});
        
        case actionTypes.RECEIVE_PRODUCTS:
            return Object.assign({}, state, {fetching: false, products: action.payload});
        
        case actionTypes.TOGGLE_FAVOURITE:
            return Object.assign({}, state, {products: productsReducer(state.products, action)});
        
        default:
            return state;
    }
}

const productsReducer = (state: IMap<IProduct>, action: IProductListAction) => {
    switch(action.type) {
        case actionTypes.TOGGLE_FAVOURITE:
            let productOverwrite = {};
            productOverwrite[action.payload] = productReducer(state[action.payload], action);

            return Object.assign({}, state, productOverwrite);
        
        default:
            return state;
    }
}