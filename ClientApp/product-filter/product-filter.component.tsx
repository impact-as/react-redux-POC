import * as React from 'react';
import { connect } from 'react-redux';

import { resolveFilter } from './product-filter.utility';

/**
 * Filters:
 *  Favourite
 *  Sorting
 *  Price range
 */

class StatelessProductFilter extends React.Component<any, any> {
    render(): JSX.Element {
        return (
            <div className="product-filter">
                <button className="product-filter__item product-filter__button product-filter__button--heart"
                        onClick={() => console.log('click')}>
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

export const ProductFilter = connect()(StatelessProductFilter);