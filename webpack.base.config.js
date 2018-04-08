const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const { pages } = require('./entries');

// 源代码更目录
const SRC_PATH = path.resolve('./src');
// 打包后的资源根目录（本地物理文件路径）
const ASSETS_BUILD_PATH = path.resolve('./build');
// 资源根目录（可以是 CDN 上的绝对路径，或相对路径）
const ASSETS_PUBLIC_PATH = 'http://localhost:9091/assets/';

const htmlPlugins = [];
const entries = {};

pages.forEach(pageName => {
    let htmlName = '',
        htmlPath = '',
        jsName = '',
        jsPath = '';
    if (typeof pageName === 'string') {
        htmlName = htmlPath = jsName = jsPath = pageName;
    } else if (typeof pageName === 'object') {
        ({
            htmlName,
            htmlPath = pageName.htmlName,
            jsName,
            jsPath = pageName.jsName
        } = pageName);
    }
    htmlPlugins.push(new HTMLWebpackPlugin({
        filename: `${htmlName}.html`,
        template: path.resolve(SRC_PATH, `./pages/${htmlPath}/index.html`),
        chunks: [jsName],
    }));
    entries[jsName] = [path.resolve(SRC_PATH, `./pages/${jsPath}/index.js`)];
});

module.exports = {
    context: SRC_PATH,

    resolve: {
        extensions: ['.js', '.jsx'] // 同时支持 js 和 jsx
    },

    entry: entries,

    output: {
        path: ASSETS_BUILD_PATH,
        publicPath: ASSETS_PUBLIC_PATH,
        filename: '[name].js',
        chunkFilename: '[name].js',
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: [
                    'babel-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'images/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            mimetype: 'application/font-woff',
                            name: 'fonts/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 8192,
                            mimetype: 'application/font-woff',
                            name: 'fonts/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin([ASSETS_BUILD_PATH], { verbose: false }),
        ...htmlPlugins
    ]
};
