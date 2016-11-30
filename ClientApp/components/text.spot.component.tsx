import * as React from "react";

interface ITextSpotProps { text:string }
interface ITextSpotState {  }

export class TextSpot extends React.Component<ITextSpotProps, {}> {
    state: ITextSpotState;
    constructor() {
        super();

    }   

    render() {
        return (
            <div>
                <div dangerouslySetInnerHTML={{__html: this.props.text}} />
            </div>
        );
    }
}