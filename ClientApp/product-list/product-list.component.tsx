import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import { actions, IProductActionsMapObject } from './product-list.redux';

interface IProductListProps {
    fetching?: boolean;
    products?: any[];
    actions?: IProductActionsMapObject
};

interface IProductListState {};

@connect(
    (state) => ({products: state.productList.products, fetching: state.productList.fetching}),
    (dispatch) => ({actions: bindActionCreators(actions, dispatch)})
)
export class ProductList extends React.Component<IProductListProps, IProductListState> {
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
