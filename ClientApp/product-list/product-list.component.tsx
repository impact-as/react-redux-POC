import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import { ProductFilter } from '../product-filter/';
import { Product, productActions, IProductActionsMapObject } from '../product/';
import { IApplicationState }from '../main.redux';
import { IBasketState } from '../basket/';

import { actions, IProductListActionsMapObject, IProductListState } from './product-list.redux';

interface IProductListStateProps extends IProductListState, IBasketState {}

interface IProductListDispatchProps {
    actions: IProductListActionsMapObject;
    productActions: IProductActionsMapObject;
}

interface IProductListProps {}

export class StatelessProductList extends React.Component<IProductListStateProps & IProductListDispatchProps & IProductListProps, void> {
    componentWillMount() {
        this.props.actions.fetchProducts();
    }

    shouldComponentUpdate(nextProps: IProductListStateProps & IProductListDispatchProps & IProductListProps) {
        return true;
    }

    render(): JSX.Element {
        return (
            <section className="product-list">
                <h2>Products</h2>
                <div className="product-list__filter">
                    <ProductFilter />
                </div>
                <div className="products">
                    {this.props.products.map((product, key) => 
                        <Product key={key} 
                                 product={product} 
                                 basketCount={this.getBasketProductCount(product.id)} 
                                 actions={this.props.productActions} />) 
                    }
                </div>
            </section>
        );
    }

    private getBasketProductCount(id: number): number {
        const product = this.props.basketProducts.filter(basketProduct => basketProduct.id === id)[0];
        return product ? product.count : 0;
    }
}

export const ProductList = connect<IProductListStateProps, IProductListDispatchProps, IProductListProps>(
    (state: IApplicationState): IProductListStateProps => Object.assign({}, state.productList, state.basket),
    (dispatch): IProductListDispatchProps => ({
        actions: bindActionCreators(actions, dispatch), 
        productActions: bindActionCreators(productActions, dispatch)
    })
)(StatelessProductList);
