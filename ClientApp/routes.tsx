import * as React from 'react';
import { RouteProps } from 'react-router';

import { ProductList } from './product-list/product-list.component';

import { AppComponent } from './app/app.component';
import { appRoutes } from  './app/app.routes';

declare const util: any;

export const rootRoute: RouteProps = {
    path: '*',
    
    // We start with the main layout component.
    getComponent: (nextState, cb) => {
        cb(null, props => {
            return <AppComponent menuItems={[
                {Url: '/', Title: 'Home'},
                {Url: '/subpage', Title: 'Subpage'},
                {Url: '/sidebar', Title: 'Sidebar'},
                {Url: '/filter', Title: 'Filter'}
            ]} {...props} />
        });
    },

    // As we don't know what the index route resolves to, supply function generating generic component.
    getIndexRoute: (nextState, cb) => {
        cb(null, appRoutes);
    }
};

