import { ActionCreatorsMapObject, Action } from 'redux';

declare var fetch: (url: string, options?: {}) => any;

const actionTypes = {
    REQUEST_PRODUCTS: 'REQUEST_PRODUCTS',
    RECEIVE_PRODUCTS: 'RECEIVE_PRODUCTS'
}

interface IProductAction extends Action {
    payload?: any[]
}

export interface IProductListActionsMapObject extends ActionCreatorsMapObject {
    fetchProducts: () => void;
}

const requestProducts = (): IProductAction => ({type: actionTypes.REQUEST_PRODUCTS});
const receiveProducts = (products): IProductAction => ({type: actionTypes.RECEIVE_PRODUCTS, payload: products});

const fetchProducts = () => (dispatch) => {
    dispatch(requestProducts);
    fetch('/api/products', {method: 'get'})
        .then(response => response.json())
        .then(products => dispatch(receiveProducts(products)));
};

export const actions: IProductListActionsMapObject = {
    fetchProducts
}

export const productListReducer = (state = {products: []}, action: IProductAction) => {
    switch(action.type) {
        case actionTypes.REQUEST_PRODUCTS:
            return Object.assign({}, state, {fetching: true});
        case actionTypes.RECEIVE_PRODUCTS:
            return Object.assign({}, state, {fetching: false, products: action.payload});
        default:
            return state;
    }
}