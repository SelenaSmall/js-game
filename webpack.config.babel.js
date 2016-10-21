import path from 'path'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

export default {
    target:  'web',
    devtool: 'source-map',
    debug:   true,
    context: __dirname,

    entry: [
        'babel-polyfill',
        './src/js/index.js'
    ],

    devServer: {
        contentBase: './',
        port:        5600
    },

    output: {
        publicPath:             '/dist',
        path:                   './dist',
        filename:               'js/index.js',
        chunkFilename:          '[id].index.js',
        hotUpdateChunkFilename: 'hot/[id].[hash].hot-update.js',
        hotUpdateMainFilename:  'hot/[hash].hot-update.json'
    },

    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify('production')
        }),

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
    ],

    node: {
        fs:            'empty',
        fsevents:      'empty',
        child_process: 'empty',
        readline:      'empty'
    },

    resolve: {
        alias: {
            'react':           path.resolve('./node_modules/react'),
            'react-bootstrap': path.resolve('./node_modules/react-bootstrap')
        },
        modulesDirectories: ['node_modules'],
        extensions:         ['', '.js', '.jsx','.json']
    },

    module: {
        loaders: [
            {
                test:   /\.jsx$/,
                loader: 'babel',
                query: {
                    ignore: 'buffer'
                }
            },{
                test:    /\.js$/,
                exclude: /node_modules/,
                loader:  'babel'
            },{
                test:   /\.json$/,
                loader: 'json-loader'
            },{
                test:   /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url',
                query: {
                    limit:    10000,
                    mimetype: 'application/font-woff',
                    name:     'fonts/[name].[ext]'
                }
            },{
                test:   /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url',
                query: {
                    limit:    10000,
                    mimetype: 'application/font-woff',
                    name:     'fonts/[name].[ext]'
                }
            },{
                test:   /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url',
                query: {
                    limit:    10000,
                    mimetype: 'application/octet-stream',
                    name:     'fonts/[name].[ext]'
                }
            },{
                test:   /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file',
                query: {
                    name: 'fonts/[name].[ext]'
                }
            },{
                test:   /\.(gif|png|jpg|jpeg|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loaders: [
                    'file?hash=sha512&digest=hex&name=img/[name].[ext]',
                    'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
                ]
            },{
                test:   /\.scss$/,
                loader: ExtractTextPlugin.extract(
                    'style-loader',
                    'css-loader!sass?outputStyle=expanded&sourceMap&includePaths[]=' + (path.resolve(__dirname, '../node_modules'))
                )
            },{
                test:   /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            }
        ]
    }
}