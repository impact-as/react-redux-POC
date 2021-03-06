import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import { IApplicationState }from '../main.redux';

import { actions, IBasketActionsMapObject, IBasketState } from './basket.redux';
import { IBasketProduct } from './basket-product';

interface IBasketStateProps extends IBasketState {}

interface IBasketDispatchProps {
    actions: IBasketActionsMapObject;
}

interface IBasketProps {}

class StatelessBasket extends React.PureComponent<IBasketStateProps & IBasketDispatchProps & IBasketProps, void> {
    public shouldComponentUpdate(nextProps: IBasketStateProps & IBasketDispatchProps & IBasketProps): boolean {
        return this.props.basketProducts !== nextProps.basketProducts;
    }

    public render(): JSX.Element {
        return (
            <div className="basket">
                Basket: {this.props.basketProducts.reduce((items: number, product: IBasketProduct) => items + product.count, 0)} items 
                ({this.props.total.toString().replace(".", ",")} DKK)
            </div>
        );
    }
}

export const Basket =  connect<IBasketStateProps, IBasketDispatchProps, IBasketProps>(
    (state: IApplicationState): IBasketStateProps => (state.basket),
    (dispatch): IBasketDispatchProps => ({actions: bindActionCreators(actions, dispatch)})
)(StatelessBasket);
