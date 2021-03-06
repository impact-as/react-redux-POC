import { ActionCreatorsMapObject, Action } from 'redux';

import { productActionTypes, IProduct, productReducer } from '../product/';

declare var fetch: (url: string, options?: {}) => any;

//Actions
const actionTypes = Object.assign({
    FETCH_PRODUCTS: 'FETCH_PRODUCTS',
    RECEIVE_PRODUCTS: 'RECEIVE_PRODUCTS'
}, productActionTypes);

interface IProductListAction extends Action {
    payload?: IProduct[] | any;
}

export interface IProductListActionsMapObject extends ActionCreatorsMapObject {
    requestProducts: (renew?: boolean) => void;
}

const fetchProducts = (): IProductListAction => ({type: actionTypes.FETCH_PRODUCTS});
const receiveProducts = (products): IProductListAction => ({type: actionTypes.RECEIVE_PRODUCTS, payload: products});

const requestProducts = (renew?: boolean) => (dispatch) => {
    if (!renew) {
        return Promise.resolve();
    }

    dispatch(fetchProducts);
    return fetch('http://www.json-generator.com/api/json/get/celLKmqymq', {method: 'get'})
        .then(response => response.json())
        .then(products => dispatch(receiveProducts(products)));
};

export const actions: IProductListActionsMapObject = {
    requestProducts
}

//State
export interface IProductListState {
    fetching: boolean;
    products: IProduct[];
}

export const productListReducer = (state: IProductListState = {products: []} as IProductListState, action: IProductListAction) => {
    switch(action.type) {
        case actionTypes.FETCH_PRODUCTS:
            return Object.assign({}, state, {fetching: true});
        
        case actionTypes.RECEIVE_PRODUCTS:
            return Object.assign({}, state, {fetching: false, products: action.payload});
        
        case actionTypes.TOGGLE_FAVOURITE:
            return Object.assign({}, state, {products: productsReducer(state.products, action)});
        
        default:
            return state;
    }
}

const productsReducer = (state: IProduct[], action: IProductListAction) => {
    switch(action.type) {
        case actionTypes.TOGGLE_FAVOURITE:
            return state.map((product: IProduct) => action.payload === product.id
                ? productReducer(product, action)
                : product
            );
        
        default:
            return state;
    }
}