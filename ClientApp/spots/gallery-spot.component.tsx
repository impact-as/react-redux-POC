import * as React from "react";

interface IImageSpotProps { data:any }
interface IImageSpotState {  }

class GallerySpot extends React.Component<IImageSpotProps, {}> {
    state: IImageSpotState;
    constructor() {
        super();

    }  

    render() {
        return (
            <div>
                {this.props.data.images.map((image, key) => <img src={image} />)}
            </div>
        );
    }
}

export default GallerySpot;