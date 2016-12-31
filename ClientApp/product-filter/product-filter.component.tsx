import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions, IProductFilterActionsMap } from './product-filter.redux';
import { favouriteFilter } from './product-filter.utility';

/**
 * Filters:
 *  Favourite
 *  Sorting
 *  Price range
 */

interface IProductFilterDispatchProps {
    actions: IProductFilterActionsMap;
}

class StatelessProductFilter extends React.Component<IProductFilterDispatchProps, any> {
    render(): JSX.Element {
        return (
            <div className="product-filter">
                <button className="product-filter__item product-filter__button product-filter__button--heart"
                        onClick={() => this.props.actions.toggleFilter({name: 'favourite', comparator: favouriteFilter})}>
                    <i className="fa fa-heart" aria-hidden="true"></i>
                </button>
                <span className="product-filter__item">
                    <select>
                        <option value="alfabetical">Alfabetical</option>
                        <option value="priceAsc">Price ascending</option>
                        <option value="priceDesc">Price descending</option>
                        <option value="unitPriceAsc">Unit price Ascending</option>
                        <option value="unitPriceDesc">Unit price descending</option>
                    </select>
                </span>
            </div>
        );
    }
}

export const ProductFilter = connect<any, IProductFilterDispatchProps, any>(
    null,
    (dispatch): IProductFilterDispatchProps => ({actions: bindActionCreators(actions, dispatch)})
)(StatelessProductFilter);