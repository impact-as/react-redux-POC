import { IMap } from '../utility/';
import { IBasketProduct } from './basket-product';

import { store } from '../main.redux';

export const getItemPriceForProduct = (productId: string) => {
    return store.getState().productList.products[productId].price;
};

export const calculateBasketItems = (basketProducts: IMap<IBasketProduct>): number => {
    return Object.keys(basketProducts).reduce((acc: number, currentKey: string) => {
        acc += basketProducts[currentKey].count;

        return acc;
    }, 0);
} 