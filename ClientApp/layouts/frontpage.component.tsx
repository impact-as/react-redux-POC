import * as React from "react";

interface IFrontpageComponentProps {};

interface IFrontpageComponentState {};

export class FrontpageComponent extends React.Component<IFrontpageComponentProps, IFrontpageComponentState> {
    public render(): JSX.Element {
        return (<span>This is the front page</span>);
    }
}
