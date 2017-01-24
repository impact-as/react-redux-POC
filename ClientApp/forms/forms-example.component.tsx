import * as React from 'react';

import { validateEmail, submitFormExample, IFormInputState, validateInput, stateValidators } from './forms.utility';

interface IFormsExampleState {
    name: IFormInputState;
    email: IFormInputState;
    message: IFormInputState;
}

export class FormsExample extends React.PureComponent<void, IFormsExampleState> {
    handleChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, validatorsObj) => {
        const name = event.currentTarget.name;
        const value = event.currentTarget.value;

        this.setState(Object.assign({}, this.state, {
            [name]: {
                value,
                validators: Object.assign({}, stateValidators(this.state[name]), validateInput(value, validatorsObj))
            }
        }));

        console.log(this.state);
    }

    render() {
        return (
            <div className="layout">
                <form onSubmit={(e) => submitFormExample(e, this.state)}>
                    <label>
                        Name:
                        <input  type="text" 
                                name="name" 
                                onChange={(e) => this.handleChange(e, {
                                    lengthSpan: (value: string) => (value.length > 2 && value.length < 30),
                                    required: (value: string) => value.length > 0
                                })} />
                    </label>

                    <label>
                        Email:
                        <input  type="text" 
                                name="email" 
                                onChange={(e) => this.handleChange(e, {
                                    lengthSpan: (value: string) => (value.length > 2 && value.length < 30),
                                    required: (value: string) => value.length > 0,
                                    emailPattern: validateEmail
                                })} />
                    </label>

                    <label>
                        Message:
                        <textarea   name="message" 
                                    cols={40} 
                                    rows={10}
                                    onChange={(e) =>  this.handleChange(e, {
                                        lengthSpan: (value: string) => (value.length < 255)
                                    })}></textarea>
                    </label>

                    <input type="submit" value="Submit" className="btn btn--blue"/>
                </form>
            </div>
        );
    }
}