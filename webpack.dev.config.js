const webpack = require('webpack');
const config = require('./webpack.base.config');

config.module.rules.push(
    {
        test: /\.(css|scss)$/,
        use: [
            'style-loader',
            'css-loader',
            'sass-loader'
        ],
        exclude: /node_modules/
    }
);

config.plugins.push(
    new webpack.SourceMapDevToolPlugin({
        filename: '[file].map'
    })
);

// Hot module replacement
Object.keys(config.entry).forEach(key => {
    config.entry[key].unshift('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=10000&reload=true');
});

config.plugins.push(
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
);

module.exports = config;
