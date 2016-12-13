import { Action, ActionCreatorsMapObject } from 'redux';

import { IProduct } from '../product/';

import { IBasketProduct } from './basket-product';

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

export const basketReducer = (state: IBasketProduct[] = [], action: IBasketAction) => {
    switch(action.type) {
        case actionTypes.ADD_TO_BASKET:
        case actionTypes.REMOVE_FROM_BASKET:
            var productHandled = false;
            
            //Update count of already existing products. Track if action was handled.
            state = state.map((product: IBasketProduct) => {
                if (product.id === action.payload.id) {
                    productHandled = true;
                    return basketProductReducer(product, action);
                }
                
                return product;
            });

            //Remove products with count = 0.
            state = state.filter((product: IBasketProduct) => product.count === 0);

            //Add product to basket if it wasn't already updated.
            return productHandled ? state : [...state, action.payload];

        default:
            return state;
    }
}

const basketProductReducer = (state: IBasketProduct, action: IBasketAction) => {
    switch(action.type) {
        case actionTypes.ADD_TO_BASKET:
            return Object.assign({}, state, {count: state.count + 1}) 
        case actionTypes.REMOVE_FROM_BASKET:
            return Object.assign({}, state, {count: state.count - 1})
        default:
            return state;
    }
}