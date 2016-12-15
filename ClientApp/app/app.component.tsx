import * as React from "react";
import { Link } from 'react-router';

import { Basket } from '../basket/';

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
            <div className="site">
                <header className="site__header">
                    <div className="container">
                        <nav className="main-menu">
                            {this.state.menuItems.map((menuItem, key) => (
                                <Link className="main-menu__item" to={menuItem.Url} key={key}>{menuItem.Title}</Link>
                            ))}
                        </nav>
                        <Basket />
                    </div>
                </header>

                <div className="site__content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
