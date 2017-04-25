"use strict";

const webpack = require("webpack");
const path = require("path");

const plugins = [
  new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
  })
];

module.exports = {
  entry: "./docs/index",
  output: {
    library: "react-jsport",
    libraryTarget: "umd",
    umdNamedDefine: true,
    filename: "bundle.js",
    path: path.resolve(__dirname, "docs")
  },
  devtool: "hidden-source-map",
  plugins,
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: ["babel-loader"]
    }]
  },
  resolve: {
    extensions: [".js"]
  }
};
