import { ActionCreatorsMapObject, Action } from 'redux';

import { IProduct } from './product';

export const actionTypes = {
    ADD_TO_BASKET: 'ADD_TO_BASKET',
    REMOVE_FROM_BASKET: 'REMOVE_FROM_BASKET',
    TOGGLE_FAVOURITE: 'TOGGLE_FAVOURITE',
}

export interface IProductActionsMapObject extends ActionCreatorsMapObject {
    toggleFavourite: (id: number) => Action;
    addToBasket: (id: number) => Action;
    removeFromBasket: (id: number) => Action;
}

const updateBasket = (type: string): ((id: number) => Action) => 
    (id: number) => ({type: actionTypes[type], payload: id})

export const actions: IProductActionsMapObject = {
    toggleFavourite: (id: number) => ({type: actionTypes.TOGGLE_FAVOURITE, payload: id}),
    addToBasket: updateBasket(actionTypes.ADD_TO_BASKET),
    removeFromBasket: updateBasket(actionTypes.REMOVE_FROM_BASKET)
}

export const productReducer = (state: IProduct, action: Action) => {
    switch(action.type) {
        case actionTypes.TOGGLE_FAVOURITE:
            return Object.assign({}, state, {isfavorite: !state.isfavorite});
        default:
            return state;
    }
}