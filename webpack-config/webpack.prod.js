var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [webpackMerge(commonConfig, {
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    
    // output: {
    //     path: "./wwwroot/dist",
    //     publicPath: "/",
    //     filename: "[name].[hash].js",
    // },
    output: {
        path: "./wwwroot/dist",
        publicPath: "/",
        filename: "[name].js",
    },

    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        // new ExtractTextPlugin('[name].[hash].css'),
        new ExtractTextPlugin('[name].css'),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"production"'
            }
        })
    ],
}), require('./webpack.server.js')];