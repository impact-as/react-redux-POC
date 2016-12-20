import * as React from 'react';

interface IAddToBasketProps {
    addToBasket: () => void;
    removeFromBasket: () => void;
    count?: number;
};

export class AddToBasket extends React.Component<IAddToBasketProps, void> {
    public render(): JSX.Element {
        return (
            <div className="add-to-basket">
                <button onClick={this.props.addToBasket}>BUY!</button>
            </div>
        );
    }
}