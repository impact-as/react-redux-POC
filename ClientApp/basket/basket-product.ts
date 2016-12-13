import { IProduct } from '../product/'

export interface IBasketProduct extends IProduct {
    count: number;
}