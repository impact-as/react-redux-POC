import * as React from 'react';
import { connect } from 'react-redux';

class StatelessProductFilter extends React.Component<any, any> {
    render(): JSX.Element {
        return (
            <div className="product-filter">Product filter...</div>
        );
    }
}

export const ProductFilter = connect()(StatelessProductFilter);