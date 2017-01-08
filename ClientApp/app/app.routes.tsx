import * as React from 'react';
import { RouteProps } from 'react-router';
import { Store } from 'redux';
import 'isomorphic-fetch';

import { ProductList } from '../product-list/';
import { productListActions } from '../product-list/';
import { IApplicationState } from '../main.redux';

declare function require(name: string);
declare function fetch(url: string): Promise<any>;

export const getAppRoutes = (store: Store<IApplicationState>): RouteProps => {
    return {
        getComponent: (nextState, cb) => {
            // Static routing
            if (nextState.location.pathname === '/filter') {
                // Load products into store for server rendering.
                (store as any).dispatch(productListActions.requestProducts(!store.getState().productList.products.length)).then(() => {
                    cb(null, props => <ProductList {...props} />)
                });
                
                return;
            }
            
            // Dynamic routing
            fetch(resolveRoute(nextState.location.pathname))
                .then(response => response.json())
                .then(json => {
                    json = Object.assign({}, json, {template: json.template.replace('-s', 'S')});
                    const LayoutComponent: any = require('../layouts/')[json.template];

                    cb(null, props => <LayoutComponent {...props} title={json.title} renderData={json.data} />);
                });
        }
    };
}

function resolveRoute(path: string): string {
    switch(path) {
        case '/subpage':
            return 'http://www.json-generator.com/api/json/get/bNWdVLeJOW';
        case '/sidebar':
            return 'http://www.json-generator.com/api/json/get/coDQrWQZxK';
        default:
            return 'http://www.json-generator.com/api/json/get/bICCgfCphK';
    }
}