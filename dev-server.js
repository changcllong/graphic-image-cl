const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.dev.config.js');

const app = express(),
    DIST_DIR = path.join(__dirname, 'assets'),
    PORT = 9091,
    complier = webpack(webpackConfig);

app.use(webpackDevMiddleware(complier, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true
}));

app.use(webpackHotMiddleware(complier));

app.use(express.static(DIST_DIR));

app.listen(PORT);
