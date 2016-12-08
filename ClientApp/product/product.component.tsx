import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import { actions } from './product.redux';
import { IProduct } from './product';

interface IProductProps {
    product: IProduct
};

interface IProductDispatchProps {};

interface IProductState {};

class StatelessProduct extends React.Component<IProductDispatchProps & IProductProps, IProductState> {
    public render(): JSX.Element {
        return (
            <div className="product">
                {this.props.product.name}
            </div>
        );
    }
}

export const Product = connect<any, IProductDispatchProps, IProductProps>(
    null,
    (dispatch): IProductDispatchProps => ({actions: bindActionCreators(actions, dispatch)})
)(StatelessProduct);
