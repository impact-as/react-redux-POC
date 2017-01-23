import * as React from 'react';
import { RouteProps } from 'react-router';
import { Store } from 'redux';

import { ProductList } from './product-list/product-list.component';
import { AppComponent } from './app/app.component';
import { getAppRoutes } from  './app/app.routes';

import { IApplicationState } from './main.redux';

declare const util: any;

export const getRoutes = (store: Store<IApplicationState>): RouteProps => {
    return {
        path: '*',
    
        // We start with the main layout component.
        getComponent: (nextState, cb) => {
            cb(null, props => {
                return <AppComponent menuItems={[
                    {Url: '/', Title: 'Home'},
                    {Url: '/subpage', Title: 'Subpage'},
                    {Url: '/sidebar', Title: 'Sidebar'},
                    {Url: '/filter', Title: 'Filter'},
                    {Url: '/forms', Title: 'Forms'}
                ]} {...props} />
            });
        },

        // As we don't know what the index route resolves to, supply function generating generic component.
        getIndexRoute: (nextState, cb) => {
            cb(null, getAppRoutes(store));
        }
    };
}

