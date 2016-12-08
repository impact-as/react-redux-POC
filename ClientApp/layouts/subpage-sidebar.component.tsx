import * as React from "react";

import renderPartials from './render-partials';

interface ISubpageSidebarComponentProps {
    title: string;
    renderData: any;
};

interface ISubpageSidebarComponentState {};

export class SubpageSidebarComponent extends React.Component<ISubpageSidebarComponentProps, ISubpageSidebarComponentState> {
    public render(): JSX.Element {
        return (
            <div className="layout layout--subpage-sidebar">
                <h1>{this.props.renderData.header}</h1>
                <div style={{float: 'left', width: '40%'}}>
                    <h3>Sidebar</h3>
                    {renderPartials(this.props.renderData.sidebarSpots)}
                </div>
                
                <div style={{float: 'left', width: '60%'}}>
                    <h3>Content</h3>
                    {renderPartials(this.props.renderData.spots)}
                </div>
            </div>
        );
    }
}
