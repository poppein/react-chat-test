const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './src/frontend/index.jsx'
      ],
    devtool: 'inline-source-map',
    devServer: {
        port: 3000,
        contentBase: 'src/frontend',
        hot: true
    },
        output: {
        path: path.resolve(__dirname, 'src', 'frontend'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.jsx']
      },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [
                  'babel-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({fallback: 'style-loader',
                    use: [
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: function () {
                                return [autoprefixer({browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3']})];
                            }
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]})
            )},
            {
                test: /\.css$/,
                use: ['css-hot-loader'].concat(ExtractTextPlugin.extract('style-loader', 'css?sourceMap!postcss'))
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('style.css'),
        new webpack.DefinePlugin({
            'process.env': {
              'NODE_ENV': '"development"'
            }
          }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
};