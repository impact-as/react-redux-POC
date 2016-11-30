import { RouteProps } from 'react-router';

declare function require(name: string);
declare function fetch(url: string): Promise<any>;

export const RootRoute: RouteProps = {
    path: '*',
    getComponent: (nextState, cb) => {
        cb(null, require('./app/app.component').AppComponent);
    },
    getIndexRoute: (nextState, cb) => {
        cb(null, require('./app/app.routes').default);
    }
};

