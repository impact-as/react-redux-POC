import * as React from "react";

interface IImageSpotProps { 
    data: any;
}

export class GallerySpot extends React.PureComponent<IImageSpotProps, void> {
    render() {
        return (
            <section className="spot spot--gallery">
                {this.props.data.images.map((image, key) => <img src={image} key={key} />)}
            </section>
        );
    }
}

export default GallerySpot;