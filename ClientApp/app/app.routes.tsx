import * as React from 'react';
import { RouteProps } from 'react-router';

import { ProductList } from '../product-list/';

declare function require(name: string);
declare function fetch(url: string): Promise<any>;

const appRoutes: RouteProps = {
    getComponent: (nextState, cb) => {
        //Static routing
        if (staticRoutes.filter(route => route === nextState.location.pathname.replace('/', '')).length) {
            cb(null, props => <ProductList {...props} />)
            return;
        }

        //Dynamic routing
        fetch(resolveRoute(nextState.location.pathname))
            .then(response => response.json())
            .then(json => {
                json = Object.assign({}, json, {template: json.template.replace('-s', 'S')});
                const LayoutComponent: any = require('../layouts/')[json.template];

                cb(null, props => <LayoutComponent {...props} title={json.title} renderData={json.data} />);
            });
    }
}

export default appRoutes;

const staticRoutes = ['filter'];

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