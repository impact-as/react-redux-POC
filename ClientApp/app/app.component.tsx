import * as React from "react";
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { Basket } from '../basket/';

interface IAppComponentProps {
    menuItems: any[];
};

export class AppComponent extends React.PureComponent<IAppComponentProps, void> {
    render(): JSX.Element {
        return (
            <div className="site">
                <header className="site__header">
                    <div className="container">
                        <nav className="main-menu">
                            {this.props.menuItems.map((menuItem, key) => (
                                <Link className="main-menu__item" to={menuItem.url} key={key} activeClassName="main-menu__item--active">{menuItem.title}</Link>
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
