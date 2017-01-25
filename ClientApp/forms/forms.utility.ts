export const submitFormExample = (e: React.FormEvent<HTMLFormElement>, formData): void => {
    e.preventDefault();
    console.log(formData);
}

export const validateEmail = (value: string) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value);
}

export interface IErrorsMap {
   [prop: string]: boolean; 
}

export interface IValidatorsMap {
    [prop: string]: (value: string | boolean | number) => boolean;
}

export interface IFormInputState {
    value: string;
    dirty: boolean;
    errors: IErrorsMap;
    validators: IValidatorsMap;
}

export const getStateErrors = (inputState: IFormInputState): IErrorsMap => {
    return inputState ? inputState.errors || {} as IErrorsMap : {} as IErrorsMap;
}

export const validateInput = 
    (value: string | boolean | number, validatorsMap: IValidatorsMap): IErrorsMap => {
        let errors = {} as IErrorsMap;

        for (let name in validatorsMap) {
            errors[name] = !validatorsMap[name](value);
        }

        return errors;
    }