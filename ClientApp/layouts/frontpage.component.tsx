import * as React from "react";

import renderPartials from './render-partials';

interface IFrontpageComponentProps {
    title: string;
    renderData: any;
};

interface IFrontpageComponentState {};

export class FrontpageComponent extends React.Component<IFrontpageComponentProps, IFrontpageComponentState> {
    public render(): JSX.Element {
        return (
            <div>
                {renderPartials(this.props.renderData.spots)}
            </div>
        );
    }
}
