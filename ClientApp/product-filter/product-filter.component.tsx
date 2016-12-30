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
                <button className="product-filter__button product-filter__button--heart">
                    <i className="fa fa-heart" aria-hidden="true"></i>
                </button>
            </div>
        );
    }
}

export const ProductFilter = connect()(StatelessProductFilter);