import { ActionCreatorsMapObject, Action } from 'redux';

export interface IActionCreators extends ActionCreatorsMapObject {
    decrement: () => void;
    increment: () => void;
}

export const actions: IActionCreators = {
    increment: () => ({type: 'INCREMENT'}),
    decrement: () => ({type: 'DECREMENT'})
}

export const testReducer = (state: number = 0, action: Action) => {
    switch(action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
};