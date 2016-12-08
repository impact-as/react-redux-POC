import * as React from "react";

import renderPartials from './render-partials';

interface ISubpageComponentProps {
    title: string;
    renderData: any;
};

interface ISubpageComponentState {};

export class SubpageComponent extends React.Component<ISubpageComponentProps, ISubpageComponentState> {
    public render(): JSX.Element {
        return (
            <div className="layout layout--subpage">
                {renderPartials(this.props.renderData.spots)}
            </div>
        );
    }
}
