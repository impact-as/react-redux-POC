import * as React from 'react';

import { validateEmail, submitFormExample } from './forms.utility';

interface IFormsExampleState {
    name: string;
    email: string;
    message: string;
}

export class FormsExample extends React.PureComponent<void, IFormsExampleState> {
    validate = (name, value, validatorsMap) => {
        for (let validatorKey in validatorsMap) {
            
        }
    }

    handleChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, validatorsObj) => {
        const name = event.currentTarget.name;
        const value = event.currentTarget.value;

        this.setState(Object.assign({}, this.state, {[name]: value}));
        this.validate(name, value, validatorsObj);
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
                                    lengthSpan: (value: string) => !(value.length > 2 && value.length > 30),
                                    required: true
                                })} />
                    </label>

                    <label>
                        Email:
                        <input  type="text" 
                                name="email" 
                                onChange={(e) => this.handleChange(e, {
                                    lengthSpan: (value: string) => !(value.length > 2 && value.length > 30),
                                    required: true,
                                    emailPattern: validateEmail
                                })} />
                    </label>

                    <label>
                        Message:
                        <textarea   name="message" 
                                    cols={40} 
                                    rows={10}
                                    onChange={(e) =>  this.handleChange(e, {
                                        lengthSpan: (value: string) => !(value.length > 2 && value.length > 60)
                                    })}></textarea>
                    </label>

                    <input type="submit" value="Submit" className="btn btn--blue"/>
                </form>
            </div>
        );
    }
}