import * as React from "react";

import renderPartials from './render-partials';

interface IFrontpageComponentProps {};

interface IFrontpageComponentState {};

export class FrontpageComponent extends React.Component<IFrontpageComponentProps, IFrontpageComponentState> {
    public render(): JSX.Element {
        return (<div>
                    <h1>Front page</h1>
                    {renderPartials([])}
                </div>);
    }
}
