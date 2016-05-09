var path = require('path');
var webpack = require("webpack");

const NODE_ENV = process.env.NODE_ENV || 'development';
const isProduction = NODE_ENV == 'production';

var API_HOST = isProduction ?
    'http://Klicka-1971905178.ap-southeast-1.elb.amazonaws.com/'
    : 'http://localhost:3000/';

module.exports = {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        filename: path.resolve(__dirname, 'index.js'),
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
            style: path.resolve(__dirname, 'style/'),
            react: path.resolve(__dirname, 'node_modules/react/dist', isProduction?'react.min.js':'react.js'),
            "react-dom": path.resolve(__dirname, 'node_modules/react-dom/dist', isProduction?'react-dom.min.js':'react-dom.js')
        }
    },
    watch: !isProduction,
    cache: !isProduction,
    watchOptions: {
        aggregateTimeout: 200,
    },
    resolveModules: {
        modulesDirectories: ['node_modules'],
    },
    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV),
            API_HOST: JSON.stringify(API_HOST)
        })
    ]

};

if(isProduction) {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            warning: true,
            drop_debugger:true,
            unsafe: true,
            minimize: true
        })
    )
}