import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import { actions, IBasketActionsMapObject } from './basket.redux';

interface IBasketStateProps {};

interface IBasketDispatchProps {
    actions?: IBasketActionsMapObject;
};

interface IBasketProps {};

class StatelessBasket extends React.Component<IBasketStateProps & IBasketDispatchProps & IBasketProps, void> {
    public render(): JSX.Element {
        return (<span>Body</span>);
    }
}

export const Basket =  connect<IBasketStateProps, IBasketDispatchProps, IBasketProps>(
    (state): IBasketStateProps => ({}),
    (dispatch): IBasketDispatchProps => ({actions: bindActionCreators(actions, dispatch)})
)(StatelessBasket);
