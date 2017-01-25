import * as React from "react";
import { bindActionCreators } from 'redux';
import { connect, MapStateToProps, MapDispatchToPropsFunction, ComponentDecorator } from "react-redux";

import { actions, IActionCreators } from './test.redux';

interface ITestComponentStateProps {
    count?: number;
}

interface ITestComponentDispatchProps {
    actions?: IActionCreators;
};

interface ITestComponentState {};

class StatelessTestComponent extends React.PureComponent<ITestComponentStateProps & ITestComponentDispatchProps, ITestComponentState> {
    public render(): JSX.Element {
        return (
            <div>
                <button onClick={this.props.actions.decrement}>-</button>
                <span>{this.props.count}</span>
                <button onClick={this.props.actions.increment}>+</button>
            </div>
        );
    }
}

export const TestComponent = connect(
    (state): ITestComponentStateProps => ({count: state.count}), 
    (dispatch): ITestComponentDispatchProps => ({actions: bindActionCreators(actions, dispatch)})
)(StatelessTestComponent);
