import { IProduct } from '../product/';

import { IFilter, filterTypes } from './product-filter.redux';

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

export const applyFilters = (products: IProduct[], filters: IFilter[]): IProduct[] => {
        filters.forEach(filter => {
            switch(filter.type) {
                case filterTypes.FILTER:
                    products = products.filter(filter.comparator as (product: IProduct) => boolean);
                case filterTypes.SORT:
                    products = products.sort(filter.comparator as (a: IProduct, b: IProduct) => number);
            }
        });

        return products;
    }

export const favouriteFilter = (product: IProduct) => product.isfavorite;