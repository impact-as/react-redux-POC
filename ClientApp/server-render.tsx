import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { match, RouterContext } from 'react-router';

import { createServerRenderer } from 'aspnet-prerendering';

import { getRoutes } from './routes';
import { configureStore } from './main.redux';

export default createServerRenderer((params: any): Promise<{html: string}> => {
    return new Promise<{html: string, globals: {[key: string]: any}}>((resolve, reject) => {
        const store = configureStore(params.data);

        match({routes: getRoutes(store), location: params.location}, (error, redirectLocation, renderProps: any) => {
            
            // Build application instance.
            const app = (
                <Provider store={store}>
                    <RouterContext {...renderProps} />
                </Provider>
            );

            // Pre-render app to start async tasks.
            const renderedApp = renderToString(app);

            // When tasks are done, perform final render.
            // Also feed redux state to application to avoid re-running initial setup.
            params.domainTasks.then(() => {
                resolve({
                    html: renderToString(app),
                    // html: renderedApp,
                    globals: { initialReduxState: store.getState() }
                });
            }, reject); // Also propagate any errors back into the host application
        });
    });
});