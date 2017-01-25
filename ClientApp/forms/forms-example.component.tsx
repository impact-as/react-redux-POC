import * as React from 'react';

import { validateEmail, submitFormExample, IFormInputState, validateInput, getStateErrors, IValidatorsMap, IErrorsMap } from './forms.utility';
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

    setValidators = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, validatorsMap) => {
        const name = event.currentTarget.name;
        const value = event.currentTarget.value;

        this.setState(Object.assign({}, this.state, {
            [name]: {
                value,
                dirty: !!this.isDirty(name),
                validators: validatorsMap,
                errors: Object.assign({}, getStateErrors(this.state[name]), validateInput(value, validatorsMap))
            }
        }));
    }

    handleChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const name = event.currentTarget.name;
        const value = event.currentTarget.value;

        this.setState(Object.assign({}, this.state, {
            [name]: {
                value,
                dirty: !!this.isDirty(name),
                validators: this.state[name].validators,
                errors: Object.assign({}, getStateErrors(this.state[name]), validateInput(value, this.state[name].validators))
            }
        }));
    }

    setDirty = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const name = event.currentTarget.name;

        this.setState(Object.assign({}, this.state, {
            [name]: Object.assign({}, this.state[name], {dirty: true})
        }));
    }

    getErrors = (name: string): IErrorsMap => {
        if (!this.state || !this.state[name]) {
            return {} as IErrorsMap;
        }
        return this.state[name].errors;
    }

    isFormValid = ():boolean => {
        let validationErrors: boolean[] = [];
            for (let key in this.state) {
                validationErrors = [...validationErrors, this.isValid(key, true)];
            }

            return validationErrors.some(error => error);
    }

    isValid = (name: string, ignoreDirty?: boolean): boolean => {
        if (!this.state || !this.state[name] || (!this.state[name].dirty && !ignoreDirty)) {
            return false;
        }

        const errors = this.getErrors(name);
        for (let key in errors) {
            if (errors[key]) {
                return true;
            }
        }

        return false;
    }

    isDirty = (name: string): boolean =>  {
        if (!this.state || !this.state[name]) {
            return false;
        }
        return this.state[name].dirty;
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
                                onFocus={(e) => this.setValidators(e, {
                                    lengthSpan: (value: string) => (value.length > 2 && value.length < 30),
                                    required: (value: string) => value.length > 0
                                })}
                                onBlur={this.setDirty}
                                onChange={this.handleChange} />

                        <ValidationMessages {...this.getErrors("name")} comparator="id" dirty={this.isDirty("name")}>
                            <span id="required">* Field is required</span>
                            <span id="lengthSpan">* Field does not match length requirements (2 &lt; x &lt; 30)</span>
                        </ValidationMessages>
                    </label>

                    <label>
                        Email:
                        <input  type="text" 
                                name="email"
                                className={(this.isValid("email") ? "validation-error" : "")}
                                onFocus={(e) => this.setValidators(e, {
                                    lengthSpan: (value: string) => (value.length > 2 && value.length < 30),
                                    required: (value: string) => value.length > 0,
                                    emailPattern: validateEmail
                                })}
                                onBlur={this.setDirty}
                                onChange={this.handleChange} />
                        
                        <ValidationMessages {...this.getErrors("email")} comparator="id" dirty={this.isDirty("email")}>
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
                                    onFocus={(e) => this.setValidators(e, {
                                        maxLength: (value: string) => (value.length < 255)
                                    })}
                                    onBlur={this.setDirty}
                                    onChange={this.handleChange}></textarea>
                        
                        <ValidationMessages {...this.getErrors("message")} comparator="id" dirty={this.isDirty("message")}>
                            <span id="maxLength">* Field contains too many characters (above 255)</span>
                        </ValidationMessages>
                    </label>

                    <input type="submit" value="Submit" className="btn btn--blue" disabled={this.isFormValid()} />
                </form>
            </div>
        );
    }
}