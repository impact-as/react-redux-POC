import { ActionCreatorsMapObject, Action } from 'redux';

import { basketActions } from '../basket/';

import { IProduct } from './product';

export const actionTypes = {
    TOGGLE_FAVOURITE: 'TOGGLE_FAVOURITE',
}

export interface IProductActionsMapObject extends ActionCreatorsMapObject {
    toggleFavourite: (id: string) => Action;
    addToBasket: (id: string) => Action;
    removeFromBasket: (id: string) => Action;
}

const { addToBasket, removeFromBasket } = basketActions;

export const actions: IProductActionsMapObject = {
    toggleFavourite: (id: string) => ({type: actionTypes.TOGGLE_FAVOURITE, payload: id}),
    addToBasket,
    removeFromBasket
}

export const productReducer = (state: IProduct, action: Action) => {
    switch(action.type) {
        case actionTypes.TOGGLE_FAVOURITE:
            return Object.assign({}, state, {isfavorite: !state.isfavorite});
        
        default:
            return state;
    }
}