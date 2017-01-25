import * as React from "react";

interface ITextSpotProps { 
    data: {
        content: string;
    };
}

export class TextSpot extends React.PureComponent<ITextSpotProps, void> {
    render() {
        return (
            <section className="spot spot--text">
                <div dangerouslySetInnerHTML={{__html: this.props.data.content}} />
            </section>
        );
    }
}

export default TextSpot;