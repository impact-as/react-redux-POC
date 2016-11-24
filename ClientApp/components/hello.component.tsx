import * as React from "react";

interface IHelloProps { compiler: string; framework: string; }
interface IHelloState { input: string; }

export class Hello extends React.Component<IHelloProps, {}> {
    state: IHelloState;
    constructor() {
        super();

        this.state = {input: 'Type in the input field....'};
    }

    update = (e: any) => this.setState({input: e.target.value})

    render() {
        return (
            <div>
                <h1>Hello from {this.props.compiler} and {this.props.framework} !</h1>
                <input type="text" onChange={this.update} placeholder="Type....." />
                <p>{this.state.input}</p>
            </div>
        );
    }
}