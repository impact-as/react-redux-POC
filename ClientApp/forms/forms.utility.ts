export const submitFormExample = (e: React.FormEvent<HTMLFormElement>, formData): void => {
    e.preventDefault();
    console.log(formData);
}

export const validateEmail = (value: string) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value);
}

interface IValidators {
    [prop: string]: boolean;
    dirty: boolean;
}

export interface IFormInputState {
    name: string;
    validators: IValidators
}

export const stateValidators = (inputState: IFormInputState): IValidators => {
    return inputState ? inputState.validators || {} as IValidators : {} as IValidators;
}

export const validateInput = 
    (value: string | boolean | number, validatorsMap: {[prop: string]: (value: string | boolean | number) => boolean}): IValidators => {
        let validators = {} as IValidators;

        for (let name in validatorsMap) {
            validators[name] = validatorsMap[name](value);
        }

        return validators;
    }