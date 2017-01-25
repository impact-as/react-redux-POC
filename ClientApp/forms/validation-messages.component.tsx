import * as React from 'react';

interface IValidationMessagesProps {
    comparator: string;
    dirty: boolean;
}

interface IValidationValidators { 
    [prop: string]: boolean;
}

export class ValidationMessages extends React.PureComponent<IValidationMessagesProps & IValidationValidators, void> {
    getChildrenArray = (): React.ReactNode[] => {
        if (!(this.props.children as any[]).concat) {
            return [this.props.children];
        }
        return this.props.children as React.ReactNode[];
    }

    resolveChildNode(node: any) {
        if (!this.props.dirty) return null;

        if ((node as any).attributes && (node as any).attributes[this.props.comparator]) {
            const definingAttribute = (node as any).attributes[this.props.comparator];

            return this.props[definingAttribute] ? node : null;
        }
    }

    render(): JSX.Element {    
        return (
            <span className="validation-messages">
                {this.getChildrenArray().map(node => {
                    return this.resolveChildNode(node);
                })}
            </span>
        );
    }
}