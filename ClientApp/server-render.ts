import { createServerRenderer } from 'aspnet-prerendering';

export default createServerRenderer(params => {
    return new Promise((resolve, reject) => {
        const html = `
            <h1>Hello world!</h1>
            <p>Current time in Node is: ${ new Date() }</p>
            <p>Request path is: ${ params.location.path }</p>
            <p>Absolute URL is: ${ params.absoluteUrl }</p>`;

        resolve({ html });
    });
});