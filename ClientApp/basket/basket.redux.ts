import { Action, ActionCreatorsMapObject } from 'redux';

import { IProduct } from '../product/';

import { IBasketProduct } from './basket-product';

//Actions
export const actionTypes = {
    ADD_TO_BASKET: 'ADD_TO_BASKET',
    REMOVE_FROM_BASKET: 'REMOVE_FROM_BASKET',
}

interface IBasketAction extends Action {
    payload: IProduct & number;
}

export interface IBasketActionsMapObject extends ActionCreatorsMapObject {
    addToBasket: (product: IProduct) => Action;
    removeFromBasket: (id: number) => Action;
}

const updateBasket = (type: string): ((payload: number | IProduct) => Action) => 
    (payload: number | IProduct) => ({type: actionTypes[type], payload})

export const actions: IBasketActionsMapObject = {
    addToBasket: updateBasket(actionTypes.ADD_TO_BASKET),
    removeFromBasket: updateBasket(actionTypes.REMOVE_FROM_BASKET)
}

//State
export interface IBasketState {
    total: number;
    products: IBasketProduct[];
}

export const basketReducer = (state: IBasketState = {products: [], total: 0} as IBasketState, action: IBasketAction) => {
    switch(action.type) {
        case actionTypes.REMOVE_FROM_BASKET:
        case actionTypes.ADD_TO_BASKET:
            const products = basketProductsReducer(state.products, action);
            const total = products.reduce((total, product: IBasketProduct): number => total + product.price * product.count, 0)
                                  .toFixed(2);

            return Object.assign({}, state, {total, products});
        
        default:
            return state;
    }
}

const basketProductsReducer = (state: IBasketProduct[], action: IBasketAction) => {
    switch(action.type) {
        case actionTypes.REMOVE_FROM_BASKET:
            let removeIndex = null;

            state = state.map((product: IBasketProduct, index) => {
                if (product.id === action.payload) {
                    removeIndex = product.count === 1 ? index : null;
                    return basketProductReducer(product, action);
                }
                return product;
            });

            return removeIndex === null ? state : [...state.slice(0, removeIndex), ...state.slice(removeIndex + 1)];
        
        case actionTypes.ADD_TO_BASKET:
            let productIncremented = false;

            state = state.map((product: IBasketProduct, index) => {
                if (product.id === action.payload.id) {
                    productIncremented = true;
                    return basketProductReducer(product, action);
                }
                return product;
            });

            return productIncremented ? state : [...state, basketProductReducer(action.payload, action)];
        
        default:
            return state;
    }
}

const basketProductReducer = (state: IBasketProduct, action: IBasketAction) => {
    switch(action.type) {
        case actionTypes.ADD_TO_BASKET:
            return Object.assign({}, state, {count: state.count + 1 || 1})
        
        case actionTypes.REMOVE_FROM_BASKET:
            return Object.assign({}, state, {count: state.count - 1})
        
        default:
            return state;
    }
}