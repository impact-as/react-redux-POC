var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = webpackMerge(commonConfig, {
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    
    output: {
        path: "./wwwroot/dist",
        filename: "[name].js",
    },

    plugins: [
        new ExtractTextPlugin('[name].css')
    ],

    "resolve": {
        "alias": {
        "react": "preact-compat",
        "react-dom": "preact-compat"
        }
    }, 

    devServer: {
        historyApiFallback: true
    }
});