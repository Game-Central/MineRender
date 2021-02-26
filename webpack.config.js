const path = require('path');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');

const ENV = "development";

module.exports = {
    mode: ENV,
    target: "es8",
    entry: {
        "minerender": "./src/index.ts"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js",
        libraryTarget: "umd",
        library: "MineRender",
        globalObject: "this"
    },
    externals: {
        three: "THREE",
        canvas: "canvas"
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        fallback: {
            "util": require.resolve("util/"),
            "buffer": require.resolve("buffer/"),
            "crypto": require.resolve("crypto-browserify"),
            "stream": require.resolve("stream-browserify"),
            // "assert": require.resolve("assert/"),
            // "https": require.resolve("https-browserify"),
            // "url": require.resolve("url/"),
            // "http": require.resolve("stream-http"),
            // "tty": require.resolve("tty-browserify"),
            // "zlib": require.resolve("browserify-zlib"),
            // "net": false,
            // "fs": false
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ["babel-loader", "ts-loader"],
                exclude: /node_modules|dist|lib/
            }
        ]
    },
    plugins: [
        new WebpackBar(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(ENV)
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        })
    ]
}
