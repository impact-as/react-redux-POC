import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import { Favourite } from './favourite.component';
import { AddToBasket } from './add-to-basket.component';
import { actions, IProductActionsMapObject } from './product.redux';
import { IProduct } from './product';

interface IProductProps {
    product: IProduct
    basketCount: number;
};

interface IProductDispatchProps {
    actions: IProductActionsMapObject;
};

interface IProductState {};

export class Product extends React.PureComponent<IProductDispatchProps & IProductProps, IProductState> {
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

                <div className="product__basket">
                    <div className="product__price">
                        {this.props.product.price.toString().replace(".", ",")} kr.
                        <br />
                        <span className="product__unit-price">({this.props.product.unitPrice})</span>
                    </div>

                    {(this.props.product.availability
                        ? <AddToBasket addToBasket={() => this.props.actions.addToBasket(this.props.product)}
                                       removeFromBasket={() => this.props.actions.removeFromBasket(this.props.product.id)}
                                       count={this.props.basketCount} />    
                        : null
                    )}
                </div>
                
            </div>
        );
    }
}
