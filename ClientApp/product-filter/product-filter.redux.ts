import { Action } from 'redux';

//Actions
interface IProductFilterAction extends Action {
    payload: any;
}

const actionTypes = {
    ADD_FILTER: 'ADD_FILTER', 
    REMOVE_FILTER: 'REMOVE_FILTER',
    CLEAR_FILTERS: 'CLEAR_FILTERS'
}

interface IProductFilterState {
    activeFilters: any;
}

export const productFilterReducer = (state: IProductFilterState, action: IProductFilterAction): IProductFilterState => {
    switch (action.type) {
        case actionTypes.ADD_FILTER:
        case actionTypes.REMOVE_FILTER:
        case actionTypes.CLEAR_FILTERS:
        default:
            return state;
    }
}