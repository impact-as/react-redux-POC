import * as React from "react";
import { Link } from 'react-router';

interface IAppComponentProps {};
interface IAppComponentState {
    menuItems: any[];
};

export class AppComponent extends React.Component<IAppComponentProps, IAppComponentState> {
    componentWillMount() {
        this.setState(Object.assign({}, this.state, {menuItems: window['menuItems']}));
    }

    render(): JSX.Element {
        return (
            <span>
                {this.state.menuItems.map((menuItem, key) => (
                    <Link to={menuItem.Url}>{menuItem.Title}</Link>
                ))}
                {this.props.children}
            </span>
        );
    }
}
