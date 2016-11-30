import * as React from "react";

import renderPartials from './render-partials';

interface ISubpageSidebarComponentProps {};

interface ISubpageSidebarComponentState {};

export class SubpageSidebarComponent extends React.Component<ISubpageSidebarComponentProps, ISubpageSidebarComponentState> {
    public render(): JSX.Element {
        return (<div>
                    <h1>Page with sidebar</h1>
                    {renderPartials([])}
                </div>);
    }
}
