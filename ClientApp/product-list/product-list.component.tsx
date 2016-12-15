import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import { Product } from '../product/';
import { IApplicationState }from '../main.redux';

import { actions, IProductListActionsMapObject, IProductListState } from './product-list.redux';

interface IProductListStateProps extends IProductListState {}

interface IProductListDispatchProps {
    actions: IProductListActionsMapObject
}

interface IProductListProps {}

export class StatelessProductList extends React.Component<IProductListStateProps & IProductListDispatchProps & IProductListProps, void> {
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

export const ProductList = connect<IProductListStateProps, IProductListDispatchProps, IProductListProps>(
    (state: IApplicationState): IProductListStateProps => (state.productList),
    (dispatch): IProductListDispatchProps => ({actions: bindActionCreators(actions, dispatch)})
)(StatelessProductList);
