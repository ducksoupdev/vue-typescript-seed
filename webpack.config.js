const path = require('path');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';

var metadata = {
    title: 'vue-typescript ts sample',
    host: 'localhost',
    port: 8080,
    ENV: ENV
};

module.exports = {
    metadata: metadata,
    devtool: 'source-map', //to point console errors to ts files instead of compiled js
    entry: {
        'main': './src/main.ts', //app main file
        'main.min': './src/main.ts' //app main file
    },
    output: {
        path: root('dist/js'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.ts', '.js'],
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    },
    module: {
        preLoaders: [
            {
                test: /\.ts$/,
                loader: 'tslint-loader'
            }
        ],
        loaders: [
            { test: /\.ts$/, exclude: /node_modules/, loader: "ts-loader" },
            { test: /\.html$/, loader: 'raw-loader', exclude: [ './src/index.html' ] }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'src/assets', to: '../assets' },
            { from: 'src/css', to: '../css' }
        ]),
        new DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(metadata.ENV),
                'NODE_ENV': JSON.stringify(metadata.ENV)
            }
        }),
        new UglifyJsPlugin({
            include: /\.min\.js$/, minimize: true
        }),
        new CompressionPlugin({
            asset: "[path].gz[query]",
            test: /\.min\.js$/
        })
    ],
    devServer: {
        port: metadata.port,
        host: metadata.host,
        historyApiFallback: true,
        watchOptions: { aggregateTimeout: 300, poll: 1000 }
    }
};

// Helper functions
function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [__dirname].concat(args));
}
