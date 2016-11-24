import * as React from "react";
import { Link } from 'react-router';

interface IAppComponentProps {};
interface IAppComponentState {};

export class AppComponent extends React.Component<IAppComponentProps, IAppComponentState> {
    render(): JSX.Element {
        return (
            <span>
                <Link to="/">Products</Link>
                <Link to="/test">Test</Link>
                {this.props.children}
            </span>
        );
    }
}
