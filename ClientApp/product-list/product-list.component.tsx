import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import { actions, IProductListActionsMapObject } from './product-list.redux';

import { Product } from '../product/';

interface IProductListStateProps {
    fetching?: boolean;
    products?: any[];  
};

interface IProductListDispatchProps {
    actions?: IProductListActionsMapObject
}

interface IProductListState {};

export class StatelessProductList extends React.Component<IProductListStateProps & IProductListDispatchProps, IProductListState> {
    componentWillMount() {
        this.props.actions.fetchProducts();
    }

    shouldComponentUpdate() {
        return true;
    }

    render(): JSX.Element {
        return (
            <section className="product-list">
                <h2>Products</h2>
                {this.props.products.map((product, key) => <Product key={key} product={product} />) }
            </section>
        );
    }
}

export const ProductList = connect<IProductListStateProps, IProductListDispatchProps, IProductListState>(
    (state): IProductListStateProps => ({products: state.productList.products, fetching: state.productList.fetching}),
    (dispatch): IProductListDispatchProps => ({actions: bindActionCreators(actions, dispatch)})
)(StatelessProductList);
