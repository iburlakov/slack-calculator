const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: "./src/index.js",
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "bundle.js",
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            },
          },
          {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
          }
        ]
      },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new CopyPlugin([{ from: 'dist/', to: '../../back/public/', force: true }], { logLevel: 'debug' })
    ]
};