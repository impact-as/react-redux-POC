import * as React from "react";

interface IImageSpotProps { src:string }
interface IImageSpotState {  }

export class ImageSpot extends React.Component<IImageSpotProps, {}> {
    state: IImageSpotState;
    constructor() {
        super();

    }  

    render() {
        return (
            <div>
                <img src={this.props.src} />
            </div>
        );
    }
}