import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import { actions, IProductActionsMapObject } from './product.redux';
import { IProduct } from './product';

interface IProductProps {
    product: IProduct
};

interface IProductDispatchProps {
    actions?: IProductActionsMapObject;
};

interface IProductState {};

class StatelessProduct extends React.Component<IProductDispatchProps & IProductProps, IProductState> {
    public render(): JSX.Element {
        return (
            <div className="product">
                <span 
                    onClick={() => this.props.actions.toggleFavourite(this.props.product.id)}
                    style={{color: this.props.product.isfavorite ? "green" : "black"}}
                >
                    {this.props.product.name}
                </span>
            </div>
        );
    }
}

export const Product = connect<any, IProductDispatchProps, IProductProps>(
    null,
    (dispatch): IProductDispatchProps => ({actions: bindActionCreators(actions, dispatch)})
)(StatelessProduct);
