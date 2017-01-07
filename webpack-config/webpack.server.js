// Configuration for server-side (prerendering) bundle suitable for running in Node
module.exports = {
    entry: { 'server-render': './ClientApp/server-render.tsx' },
    resolve: { extensions: [ '', '.js', '.jsx', '.ts', '.tsx' ] },
    output: {
        libraryTarget: 'commonjs',
        path: './ClientApp/dist',
        filename: '[name].js'
    },
    module: {
        loaders: [
            { 
                test: /\.tsx?$/, 
                loader: "ts-loader" 
            }
        ]
    },
    target: 'node',
    devtool: 'inline-source-map'
};