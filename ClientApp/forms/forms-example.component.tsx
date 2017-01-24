import * as React from 'react';

import { validateEmail, submitFormExample, IFormInputState, validateInput, stateValidators, IValidators } from './forms.utility';
import { ValidationMessages } from './validation-messages.component';

interface IFormsExampleState {
    [prop: string]: IFormInputState;
    name: IFormInputState;
    email: IFormInputState;
    message: IFormInputState;
}

export class FormsExample extends React.PureComponent<void, IFormsExampleState> {
    constructor() {
        super();

        this.setState({} as IFormsExampleState);
    }

    handleChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, validatorsObj): void => {
        const name = event.currentTarget.name;
        const value = event.currentTarget.value;

        this.setState(Object.assign({}, this.state, {
            [name]: {
                value,
                validators: Object.assign({}, stateValidators(this.state[name]), validateInput(value, validatorsObj))
            }
        }));
    }

    setDirty = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const name = event.currentTarget.name;

        this.setState(Object.assign({}, this.state, {
            [name]: Object.assign({}, this.state[name], {dirty: true})
        }));
    }

    getValidators = (name: string): IValidators => {
        if (!this.state || !this.state[name]) {
            return {} as IValidators;
        }
        return this.state[name].validators;
    }

    isValid = (name?: string): boolean => {
        if (!name) { // Validate entire form.
            let validationErrors: boolean[] = [];
            for (let key in this.state) {
                validationErrors = [...validationErrors, this.isValid(key)];
            }

            return validationErrors.some(error => error);
        }

        if (!this.state || !this.state[name] || !this.state[name].dirty) {
            return false;
        }

        const validators = this.getValidators(name);
        for (let key in validators) {
            if (!validators[key]) {
                return true;
            }
        }

        return false;
    }

    render() {
        return (
            <div className="layout">
                <form onSubmit={(e) => submitFormExample(e, this.state)}>
                    <label>
                        Name:
                        <input  type="text" 
                                name="name"
                                className={(this.isValid("name") ? "validation-error" : "")}
                                onBlur={this.setDirty}
                                onChange={(e) => this.handleChange(e, {
                                    lengthSpan: (value: string) => (value.length > 2 && value.length < 30),
                                    required: (value: string) => value.length > 0
                                })} />

                        <ValidationMessages {...this.getValidators("name")} comparator="id">
                            <span id="required">* Field is required</span>
                            <span id="lengthSpan">* Field does not match length requirements (2 &lt; x &lt; 30)</span>
                        </ValidationMessages>
                    </label>

                    <label>
                        Email:
                        <input  type="text" 
                                name="email"
                                className={(this.isValid("email") ? "validation-error" : "")}
                                onBlur={this.setDirty}
                                onChange={(e) => this.handleChange(e, {
                                    lengthSpan: (value: string) => (value.length > 2 && value.length < 30),
                                    required: (value: string) => value.length > 0,
                                    emailPattern: validateEmail
                                })} />
                        
                        <ValidationMessages {...this.getValidators("email")} comparator="id">
                            <span id="required">* Field is required</span>
                            <span id="emailPattern">* Does not match e-mail pattern</span>
                            <span id="lengthSpan">* Field does not match length requirements (2 &lt; x &lt; 30)</span>
                        </ValidationMessages>
                    </label>

                    <label>
                        Message:
                        <textarea   name="message" 
                                    cols={40} 
                                    rows={10}
                                    className={(this.isValid("message") ? "validation-error" : "")}
                                    onBlur={this.setDirty}
                                    onChange={(e) =>  this.handleChange(e, {
                                        maxLength: (value: string) => (value.length < 255)
                                    })}></textarea>
                        
                        <ValidationMessages {...this.getValidators("message")} comparator="id">
                            <span id="maxLength">* Field contains too many characters (above 255)</span>
                        </ValidationMessages>
                    </label>

                    <input type="submit" value="Submit" className="btn btn--blue" disabled={this.isValid()} />
                </form>
            </div>
        );
    }
}