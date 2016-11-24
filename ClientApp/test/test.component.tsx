import * as React from "react";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";

import { actions, IActionCreators } from './test.redux';

interface ITestComponentProps {
    count?: number;
    actions?: IActionCreators;
};

interface ITestComponentState {};

@connect(
    (state) => ({count: state.count}), 
    (dispatch) => ({actions: bindActionCreators(actions, dispatch)})
)
export class TestComponent extends React.Component<ITestComponentProps, ITestComponentState> {
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
