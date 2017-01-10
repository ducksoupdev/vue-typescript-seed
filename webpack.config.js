const path = require('path');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const autoprefixer = require('autoprefixer');

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
        path: root('dist'),
        filename: '[name].js',
        sourceMapFilename: '[name].map',
    },
    resolve: {
        extensions: ['', '.ts', '.js', '.json', '.css', '.scss', '.sass', '.html'], // <-- include .scss
        fallback: [path.join(__dirname, './node_modules')], //default to node_modules when not found
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    },
    resolveLoader: {
        fallback: [path.join(__dirname, './node_modules')]
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: [/\.(spec|e2e)\.ts$/]
            },
            { test: /\.json$/, loader: 'json-loader' },
            { test: /\.css$/, loaders: ['style', 'css'] },
            { test: /\.html$/, loader: 'raw-loader', exclude: [ root('src/index.html') ] },
            { test: /\.(scss|sass)$/, loaders: ['style', 'css', 'sass'] }
        ]
    },
    postcss: [autoprefixer], // <--- postcss
    plugins: [
        new CopyWebpackPlugin([{ from: 'src/assets', to: 'assets' }]),
        new HtmlWebpackPlugin({ template: 'src/index.html', excludeChunks: ['main.min'] }),
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

function rootNode(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return root.apply(path, ['node_modules'].concat(args));
}