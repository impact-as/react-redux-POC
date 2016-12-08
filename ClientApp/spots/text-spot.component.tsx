import * as React from "react";

interface ITextSpotProps { 
    data: {
        content: string;
    };
}
interface ITextSpotState {  }

class TextSpot extends React.Component<ITextSpotProps, {}> {
    state: ITextSpotState;
    constructor() {
        super();

    }   

    render() {
        return (
            <div>
                <div dangerouslySetInnerHTML={{__html: this.props.data.content}} />
            </div>
        );
    }
}

export default TextSpot;