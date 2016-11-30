import * as React from "react";
import { Link } from 'react-router';

import { TextSpot } from '../components/text.spot.component';
import { GallerySpot } from '../components/gallery.spot.component';

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
                    <Link to={menuItem.Url} key={key}>{menuItem.Title}</Link>
                ))}

                <div>
                    {this.props.children}
                </div>
            </span>
        );
    }
}
