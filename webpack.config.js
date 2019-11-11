const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const isProduction = process.env.npm_lifecycle_event === 'build'

module.exports = {
    entry: {
        levels: './src/app/levels.js',
        variables: './src/app/variables.js',
        objects: './src/app/objects.js',
        main: './src/app/main.js',
        multiplayer: './src/app/multiplayer.js',
        stats: './src/app/stats.js',
    },
    devtool: !isProduction && 'source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            minify: isProduction && {
                collapseWhitespace: true
            },
            inlineSource: isProduction && '\.(js|css)$'
        }),
        new HtmlWebpackInlineSourcePlugin(),
        new OptimizeCssAssetsPlugin({}),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ],

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        stats: 'minimal',
        overlay: true
    }
}