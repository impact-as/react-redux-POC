import * as React from "react";

interface ISubpageComponentProps {};

interface ISubpageComponentState {};

export class SubpageComponent extends React.Component<ISubpageComponentProps, ISubpageComponentState> {
    public render(): JSX.Element {
        return (<span>Subpage</span>);
    }
}
