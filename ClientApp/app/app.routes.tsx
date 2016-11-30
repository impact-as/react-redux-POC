import * as React from 'react';
import { RouteProps } from 'react-router';

declare function require(name: string);
declare function fetch(url: string): Promise<any>;

const appRoutes: RouteProps = {
    getComponent: (nextState, cb) => {
        fetch(resolveRoute(nextState.location.pathname))
            .then(response => response.json())
            .then(data => {
                data = Object.assign({}, data, {template: data.template.replace('-s', 'S')});
                const LayoutComponent: any = require('../layouts/')[data.template];
                
                cb(null, props => <LayoutComponent {...props} title={data.title} spots={data.spots} />);
            });
    }
}

export default appRoutes;

function resolveRoute(path: string): string {
    switch(path) {
        case '/subpage':
            return 'http://www.json-generator.com/api/json/get/bNWdVLeJOW';
        case '/filter':
            return 'http://www.json-generator.com/api/json/get/coDQrWQZxK';
        default:
            return 'http://www.json-generator.com/api/json/get/bICCgfCphK';
    }
}