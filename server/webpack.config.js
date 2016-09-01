const webpack = require('webpack');
const path = require('path');

const input = path.resolve('client/input/');
const output = path.resolve('client/output/');

module.exports = {
    entry: path.resolve(input, 'main'),
    output: {
        path: output,
        filename: 'main.js'
    },
    module: {
        loaders: [
            {
                test: /\.(jsx|es6)?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.scss$/,
                loader: 'style!css!autoprefixer!sass',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|ttf|eot|woff)$/,
                exclude: /node_modules/,
                loader: 'url-loader?limit=10000'
            },
            {
                test: /\.pug$/,
                exclude: /node_modules/,
                loader: 'pug-loader'
            }
        ]
    },
    resolve: {
        root: path.resolve(__dirname),
        extensions: ['', '.js', '.jsx', '.es6']
    },
    devServer: {
        port: 1234,
        contentBase: output,
        hot: true,
        inline: true,
        progress: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};
