import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import { IApplicationState }from '../main.redux';

import { actions, IBasketActionsMapObject, IBasketState } from './basket.redux';
import { IBasketProduct } from './basket-product';
import { calculateBasketItems } from './basket-utility';

interface IBasketStateProps extends IBasketState {}

interface IBasketDispatchProps {
    actions: IBasketActionsMapObject;
}

interface IBasketProps {}

class StatelessBasket extends React.Component<IBasketStateProps & IBasketDispatchProps & IBasketProps, void> {
    public render(): JSX.Element {
        return (
            <div className="basket">
                Basket: {calculateBasketItems(this.props.products)} items ({this.props.total || 0} DKK)
            </div>
        );
    }
}

export const Basket =  connect<IBasketStateProps, IBasketDispatchProps, IBasketProps>(
    (state: IApplicationState): IBasketStateProps => (state.basket),
    (dispatch): IBasketDispatchProps => ({actions: bindActionCreators(actions, dispatch)})
)(StatelessBasket);
