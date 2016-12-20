export interface IMap<T> {
    [productId: string]: T;
}

export const convertArrayToMap = <T>(someArray: T[], keyProp?: string): IMap<T> => {
    return someArray.reduce((acc: IMap<T>, current: T, index: number) => {
        const key = keyProp ? current[keyProp] : index;
        acc[key] = current;

        return acc;
    }, {});
}