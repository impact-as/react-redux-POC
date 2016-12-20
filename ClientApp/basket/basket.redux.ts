import { Action, ActionCreatorsMapObject } from 'redux';

import { IProduct } from '../product/';
import { IMap } from '../utility/';

import { IBasketProduct } from './basket-product';
import { getItemPriceForProduct } from './basket-utility';

//Actions
export const actionTypes = {
    ADD_TO_BASKET: 'ADD_TO_BASKET',
    REMOVE_FROM_BASKET: 'REMOVE_FROM_BASKET',
}

interface IBasketAction extends Action {
    payload: string;
}

export interface IBasketActionsMapObject extends ActionCreatorsMapObject {
    addToBasket: (id: string) => Action;
    removeFromBasket: (id: string) => Action;
}

const updateBasket = (type: string): ((payload: string) => Action) => 
    (payload: string) => ({type: actionTypes[type], payload})

export const actions: IBasketActionsMapObject = {
    addToBasket: updateBasket(actionTypes.ADD_TO_BASKET),
    removeFromBasket: updateBasket(actionTypes.REMOVE_FROM_BASKET)
}

//State
export interface IBasketState {
    total: number;
    products: IMap<IBasketProduct>;
}

export const basketReducer = (state: IBasketState = {products: {}} as IBasketState, action: IBasketAction): IBasketState => {
    switch(action.type) {
        case actionTypes.REMOVE_FROM_BASKET:
        case actionTypes.ADD_TO_BASKET:
            const products = basketProductsReducer(state.products, action);
            const total = Object.keys(products).reduce((acc: number, currentKey: string): number => {
                acc += products[currentKey].summarisedPrice;
                
                return acc;
            }, 0).toFixed(2);

            return Object.assign({}, state, {total, products});
        
        default:
            return state;
    }
}

const basketProductsReducer = (state: IMap<IBasketProduct>, action: IBasketAction): IMap<IBasketProduct> => {
    switch(action.type) {
        case actionTypes.REMOVE_FROM_BASKET:
            let remove = {};
            const toDecrement: IBasketProduct = state[action.payload];

            remove[action.payload] = toDecrement.count > 1 ? basketProductReducer(toDecrement, action) : null;

            return Object.assign({}, state, remove);
        
        case actionTypes.ADD_TO_BASKET:
            let add = {};
            const toIncrement: IBasketProduct = state[action.payload] || {id: action.payload, count: 0};

            add[action.payload] = basketProductReducer(toIncrement, action);

            return Object.assign({}, state, add);
        
        default:
            return state;
    }
}

const basketProductReducer = (state: IBasketProduct, action: IBasketAction): IBasketProduct => {
    switch(action.type) {
        case actionTypes.ADD_TO_BASKET:     
        case actionTypes.REMOVE_FROM_BASKET:
            const unitPrice = state.itemPrice || getItemPriceForProduct(state.id);
            const count = state.count + (action.type === actionTypes.ADD_TO_BASKET ? 1 : -1);
            
            return Object.assign({}, state, {
                count,
                unitPrice,
                summarisedPrice: unitPrice * count
            });
        
        default:
            return state;
    }
}