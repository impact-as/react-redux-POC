import { ActionCreatorsMapObject, Action } from 'redux';

const actionTypes = {
    ADD_TO_BASKET: 'ADD_TO_BASKET',
    REMOVE_FROM_BASKET: 'REMOVE_FROM_BASKET',
    TOGGLE_FAVOURITE: 'TOGGLE_FAVOURITE',
}

export interface IProductActionsMapObject extends ActionCreatorsMapObject {
    toggleFavourite: (id: string) => Action;
    addToBasket: (id: string, quantity: number) => Action;
    removeFromBasket: (id: string, quantity: number) => Action;
}

const updateBasket = (type: string): ((id: string, quantity: number) => Action) => 
    (id: string, quantity: number) => ({
        type: actionTypes[type], payload: {
            id,
            quantity
        }
    })

export const actions: IProductActionsMapObject = {
    toggleFavourite: (id: string) => ({type: actionTypes.TOGGLE_FAVOURITE, payload: id}),
    addToBasket: updateBasket(actionTypes.ADD_TO_BASKET),
    removeFromBasket: updateBasket(actionTypes.REMOVE_FROM_BASKET)
}