import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import { actions } from './product.redux';

interface IProductStateProps {};
interface IProductDispatchProps {};

interface IProductState {};

class StatelessProduct extends React.Component<IProductStateProps & IProductDispatchProps, IProductState> {
    public render(): JSX.Element {
        return (
            <div className="product">
                Product
            </div>
        );
    }
}

export const Product = connect(
    null,
    (dispatch): IProductDispatchProps => ({actions: bindActionCreators(actions, dispatch)})
)(StatelessProduct);
