const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");


module.exports = {
    mode: 'development',
    devtool: 'eval-source-map',
    entry: path.resolve(__dirname, './src/index.js'),
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            "@babel/preset-react"
                        ]
                        // plugins: ['@babel/plugin-transform-runtime']
                        // plugins: ['@babel/plugin-proposal-object-rest-spread'],

                    }
                }
            },
            {
                test: /\.(scss|css)$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                },
            },
            {
                test: /\.(jpg|png)$/,
                use: {
                    loader: 'url-loader',
                },
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
    },
    output: {
        path: path.resolve(__dirname, './build'),
        // filename: 'bundle.js',
        filename: '[name].bundle.js',
    },
    performance: {
        hints: false,
        assetFilter: function (assetFilename) {
            return assetFilename.endsWith('.js');
        },
        maxAssetSize: 100000,
        maxEntrypointSize: 400000,

    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                { from: "./public/favicon.ico", to: "./" },
            ],
        }),
        new HtmlWebpackPlugin({
            title: 'Asas Webpack React Babel',
            template: path.resolve(__dirname, './public/index.html'),
        })
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, './build'),
        },
        compress: true,
        port: 9000,
        hot: true,
    },


};