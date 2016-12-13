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
        case actionTypes.REMOVE_FROM_BASKET:
            let removeIndex = null;

            state = state.map((product: IBasketProduct, index) => {
                if (product.id === action.payload.id) {
                    removeIndex = product.count === 1 ? index : null;
                    return basketProductReducer(product, action);
                }
                return product;
            });

            return removeIndex === null ? state : [...state.slice(0, removeIndex), ...state.slice(removeIndex + 1)];
        case actionTypes.ADD_TO_BASKET:
            const nextState = state.map((product: IBasketProduct, index) => product.id === action.payload.id
                ? basketProductReducer(product, action)
                : product);

            return state === nextState ? nextState : [...nextState, action.payload];
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