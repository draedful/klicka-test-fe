var path = require('path');
var webpack = require("webpack");

const NODE_ENV = process.env.NODE_ENV || 'development';

var API_HOST = NODE_ENV == 'production' ?  'http://ec2-52-77-252-42.ap-southeast-1.compute.amazonaws.com' : 'http://localhost:3000/';

module.exports = {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        filename: path.resolve(__dirname, 'build/index.js'),
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loaders: ['babel?presets[]=react&presets[]=es2015&plugins[]=transform-runtime'],
            }
        ],
        noParse: []
    },
    resolve: {
        alias: {
            style: path.resolve(__dirname, 'style/')
        }
    },
    watch: true,
    cache: true,
    watchOptions: {
        aggregateTimeout: 200,
    },
    resolveModules: {
        modulesDirectories: ['node_modules'],
    },
    plugins: [
        new webpack.DefinePlugin({
            API_HOST: JSON.stringify(API_HOST)
        })
    ]

}