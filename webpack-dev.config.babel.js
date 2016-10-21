/*
 * Webpack dev server configuration (used by `npm run hot`)
 */

import webpack from 'webpack'
import webpackConfig from './webpack.config.babel'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

webpackConfig.entry.unshift(
    'webpack-dev-server/client?http://127.0.0.1:5600',
    'webpack/hot/dev-server'
)

webpackConfig.output.publicPath = 'http://127.0.0.1:5600/dist/'

webpackConfig.plugins = [
    new webpack.DefinePlugin({
        NODE_ENV: JSON.stringify('development')
    }),

    new webpack.NoErrorsPlugin(),

    new webpack.ProvidePlugin({
        'Promise': 'es6-promise',
        'fetch':   'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),

    new ExtractTextPlugin(
        'css/index.css',
        {
            omit:    1,
            extract: true,
            remove:  true
        }
    ),

    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),

    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    })
]

webpackConfig.module.loaders[0] = {
    test:    /\.jsx$/,
    exclude: /node_modules/,
    loaders: [
        'react-hot',
        'babel'
    ]
}

export default webpackConfig