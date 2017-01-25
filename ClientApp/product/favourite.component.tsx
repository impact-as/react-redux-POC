import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

interface IFavouriteProps {
    toggleFavourite: () => void;
    isFavourite: boolean;
};

interface IFavouriteState {};

export class Favourite extends React.PureComponent<IFavouriteProps, IFavouriteState> {
    public render(): JSX.Element {
        return (
            <button onClick={this.props.toggleFavourite} className={'toggle-favourite' + (this.props.isFavourite ? ' favourite': '')}>
                {this.props.children}
            </button>
        );
    }
}
