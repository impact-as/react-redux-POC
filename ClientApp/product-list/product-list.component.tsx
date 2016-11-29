import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import { actions, IProductActionsMapObject } from './product-list.redux';

interface IProductListStateProps {
    fetching?: boolean;
    products?: any[];  
};

interface IProductListDispatchProps {
    actions?: IProductActionsMapObject
}

interface IProductListState {};

export class StatelessProductList extends React.Component<IProductListStateProps & IProductListDispatchProps, IProductListState> {
    componentWillMount() {
        this.props.actions.fetchProducts();
    }

    render(): JSX.Element {
        return (
            <div>
                {this.props.products.map((product, key) => <div key={key} className="product">{product.name}</div>) }
            </div>
        );
    }
}


export const ProductList = connect(
    (state): IProductListStateProps => ({products: state.productList.products, fetching: state.productList.fetching}),
    (dispatch): IProductListDispatchProps => ({actions: bindActionCreators(actions, dispatch)})
)(StatelessProductList);
