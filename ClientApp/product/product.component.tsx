import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import { Favourite } from './favourite.component';
import { AddToBasket } from './add-to-basket.component';
import { actions, IProductActionsMapObject } from './product.redux';
import { IProduct } from './product';

interface IProductProps {
    product: IProduct
};

interface IProductDispatchProps {
    actions: IProductActionsMapObject;
};

interface IProductState {};

export class Product extends React.Component<IProductDispatchProps & IProductProps, IProductState> {
    public render(): JSX.Element {
        return (
            <div className={'product' + (this.props.product.availability ? '' : ' product--out-of-stock')}
                 style={{backgroundImage: `url(${this.props.product.image})`}}>
                <div className="product__title">{this.props.product.name}</div>
                
                <Favourite toggleFavourite={() => this.props.actions.toggleFavourite(this.props.product.id)}
                           isFavourite={this.props.product.isfavorite}
                >
                    <i className="fa fa-heart" aria-hidden="true"></i>
                </Favourite>

                {(this.props.product.availability
                    ? <AddToBasket addToBasket={() => this.props.actions.addToBasket(this.props.product)}
                                   removeFromBasket={() => this.props.actions.removeFromBasket(this.props.product.id)} />    
                    : null
                )}
                
            </div>
        );
    }
}
