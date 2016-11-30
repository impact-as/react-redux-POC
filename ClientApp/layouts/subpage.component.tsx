import * as React from "react";

import renderPartials from './render-partials';

interface ISubpageComponentProps {};

interface ISubpageComponentState {};

export class SubpageComponent extends React.Component<ISubpageComponentProps, ISubpageComponentState> {
    public render(): JSX.Element {
        return (<div>
                    <h1>Subpage</h1>
                    {renderPartials([])}
                </div>);
    }
}
