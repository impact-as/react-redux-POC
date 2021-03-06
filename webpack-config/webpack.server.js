module.exports = {
    entry: { 'server-render': './ClientApp/server-render.tsx' },
    resolve: { extensions: [ '', '.js', '.jsx', '.ts', '.tsx' ] },
    output: {
        libraryTarget: 'commonjs',
        path: './ClientApp/dist',
        filename: '[name].js'
    },
    module: {
        preLoaders : [
            { test: /\.json$/, loader: 'json'}
        ],
        loaders: [
            { 
                test: /\.tsx?$/, 
                loader: "ts-loader" 
            }
        ]
    },
    target: 'node'
};