import * as React from 'react';

interface IAddToBasketProps {
    addToBasket: () => void;
    removeFromBasket: () => void;
    count: number;
};

export class AddToBasket extends React.Component<IAddToBasketProps, void> {
    handleRightClick = (e: React.MouseEvent<HTMLButtonElement>): boolean => {
        e.preventDefault();
        this.props.removeFromBasket();
        
        return false;
    }

    public render(): JSX.Element {
        return (
            <div className="add-to-basket">
                <button onClick={this.props.addToBasket}
                        onContextMenu={this.handleRightClick}>
                    {(this.props.count ? this.props.count : <i className="fa fa-shopping-cart" aria-hidden="true"></i>)}
                </button>
            </div>
        );
    }
}