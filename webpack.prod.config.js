const path = require('path');
const webpack = require('webpack');
const HappyPack = require('happypack');


module.exports = {
    entry: './app/components',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    resolve: {
        modulesDirectories: ['node_modules', 'app'],
        extensions: ['', '.js', '.jsx', 'scss']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'happypack/loader'
            },
            {
                test: /\.scss$/,
                loaders: [
                    'style',
                    'css',
                    'autoprefixer?browsers=last 3 versions',
                    'sass?outputStyle=expanded'
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'url?limit=8192',
                    'img'
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new HappyPack({
            loaders: ['react', 'babel?presets[]=react,presets[]=es2015']
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ]
};
