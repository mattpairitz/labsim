var webpack = require("webpack");
var path = require("path");
 
var DEV = path.resolve(__dirname, "dev");
var OUTPUT = path.resolve(__dirname, "output");
 
var config = {
  entry: DEV + "/index.js",
  output: {
    path: OUTPUT,
    filename: "root.js"
  },

  module: {
    loaders: [{
        include: DEV,
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ['es2015', 'react']
        }
    }]
  }

};
 
module.exports = config;
