var webpack = require("webpack");
var path = require("path");

var DEV = path.resolve(__dirname, "dev");
var OUTPUT = path.resolve(__dirname, "output");

var config = {
  entry: {Index : DEV + "/index.js", Child: DEV + "/child.js"},
  output: {
    path: OUTPUT,
    filename: "[name].js",
  },

  plugins: [ new webpack.optimize.CommonsChunkPlugin("lib/Library") ],

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
  },

};

module.exports = config;