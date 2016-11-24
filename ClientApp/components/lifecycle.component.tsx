import * as React from 'react';

interface ILifecycleProps {count: number}

export class Lifecycle extends React.Component<{}, {}> {
    state: ILifecycleProps = {count: 0};

    update = () => this.setState({count: this.state.count +1});

    componentWillMount() {
        console.log('Mounting');
    }
    render() {
        console.log('Render');
        return (
            <div>
                <h2>Lifecycle example</h2>
                <button onClick={this.update}>{this.state.count}</button>
            </div>
        );
    }
    componentDidMount() {
        console.log('Mounted');
    }
    componentWillUnmount() {
        console.log('Unmounting');
    }
}