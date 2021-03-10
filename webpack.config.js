const HtmlWebpackPlugin = require("html-webpack-plugin");
// const HtmlWebpackInjector = require('html-webpack-injector');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require("path");

module.exports = {
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index_bundle.js',
    },
    mode: "development",
    devtool: "eval-source-map",
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            importLoaders: 1,
                            sourceMap: true,
                        }
                    },
                    {
                        loader: "sass-loader",
                    },
                ]
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.css', '.scss'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Testyyyy",
            template: "./src/index.html",
            inject: "body"
        }),
        new CleanWebpackPlugin.CleanWebpackPlugin(),
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
    },
};