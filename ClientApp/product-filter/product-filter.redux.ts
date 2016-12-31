import { Action, ActionCreatorsMapObject } from 'redux';

import { IProduct } from '../product/';

export interface IFilter {
    type: string;
    name: string;
    comparator: ((product: IProduct) => boolean) | ((a: IProduct, b: IProduct) => number);
}

export const filterTypes = {
    SORT: 'SORT',
    FILTER: 'FILTER'
}

//Actions
interface IProductFilterAction extends Action {
    payload?: IFilter;
}

const actionTypes = {
    TOGGLE_FILTER: 'TOGGLE_FILTER',
    CHANGE_FILTER: 'CHANGE_FILTER',
    CLEAR_FILTERS: 'CLEAR_FILTERS'
}

export interface IProductFilterActionsMap extends ActionCreatorsMapObject {
    toggleFilter: (filter: IFilter) => IProductFilterAction;
    changeFilter: (filter: IFilter) => IProductFilterAction;
    clearFilters: () => IProductFilterAction;
}

export const actions: IProductFilterActionsMap = {
    toggleFilter: (payload: IFilter) => ({type: actionTypes.TOGGLE_FILTER, payload}),
    changeFilter: (payload: IFilter) => ({type: actionTypes.CHANGE_FILTER, payload}),
    clearFilters: () => ({type: actionTypes.CLEAR_FILTERS})
}

export const productFilterReducer = (state: IFilter[] = [], action: IProductFilterAction): IFilter[] => {
    console.log(action);
    let filter;
    switch (action.type) {
        case actionTypes.TOGGLE_FILTER:
            filter = state.find((filter: IFilter) => filter.name === action.payload.name);

            return filter 
                ? state.filter((filter: IFilter) => filter.name !== action.payload.name)
                : [...state, action.payload]
        case actionTypes.CHANGE_FILTER:
            filter = state.find((filter: IFilter) => filter.name === action.payload.name);

            return filter 
                ? state.map(filter => filter.name === action.payload.name ? action.payload : filter)
                : [...state, action.payload];
        case actionTypes.CLEAR_FILTERS:
        default:
            return state;
    }
}