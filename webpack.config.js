var webpack = require("webpack");
var path = require("path");
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

var DEV = path.resolve(__dirname, "dev");
var OUTPUT = path.resolve(__dirname, "output");

var config = {
  entry: {
    Index : DEV + "/index.js" 
  },

  output: {
    path: OUTPUT,
    filename: "[name].js",
  },

  resolve: {
      extensions: ['.js', '.jsx', '.json']
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
    },
    {
      test: /\.(jpe?g|png|gif)$/i,
      loader:"file-loader",
      query:{
        name:'[name].[ext]',
        outputPath:'images/'
      }
    },
    {
      test: /\.css$/,
      loaders: ["style-loader", "css-loader"]
    },
    {
        test: /\.coffee$/,
        use: [ 'coffee-loader' ]
    },
    {
        test: /\.json$/,
        loader: 'json-loader'
    }
    ]
  },

  plugins: [ 
    new webpack.optimize.CommonsChunkPlugin({name: 'index', filename: "bundle.js", minChunks: Infinity}), 
    // uncomment to run analysis on bundle.js
    // new BundleAnalyzerPlugin()
  ]


};

module.exports = config;