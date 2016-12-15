import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import { Favourite } from './favourite.component';
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
            <div className={'product' + (this.props.product.availability ? '' : ' product--out-of-stock')}
                style={{backgroundImage: `url(${this.props.product.image})`}}
            >
                <div className="product__title">{this.props.product.name}</div>
                <Favourite 
                    toggleFavourite={() => this.props.actions.toggleFavourite(this.props.product.id)}
                    isFavourite={this.props.product.isfavorite}
                >Favourite</Favourite>
                <button onClick={() => this.props.actions.addToBasket(this.props.product)}>BUY!</button>
            </div>
        );
    }
}

export const Product = connect<any, IProductDispatchProps, IProductProps>(
    null,
    (dispatch): IProductDispatchProps => ({actions: bindActionCreators(actions, dispatch)})
)(StatelessProduct);
