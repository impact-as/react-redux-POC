import { IProduct } from '../product/';

export const generateSortComparatorFromOption = (option: string) => {
    switch(option) {
        case 'priceAsc':
            return (a: IProduct, b: IProduct) => a.price < b.price ? -1 : 1;
        case 'priceDesc':
            return (a: IProduct, b: IProduct) => a.price < b.price ? 1 : -1;
        case 'unitPriceAsc':
            return (a: IProduct, b: IProduct) => a.unitPrice < b.unitPrice ? -1 : 1;
        case 'unitPriceDesc':
            return (a: IProduct, b: IProduct) => a.unitPrice < b.unitPrice ? 1 : -1;
        default:
           return (a: IProduct, b: IProduct) => a.name < b.name ? -1 : 1;
    }
}

export const favouriteFilter = (product: IProduct) => product.isfavorite;