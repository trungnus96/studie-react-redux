const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const bootstrapEntryPoints = require('./webpack.bootstrap.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production'; //true or false
const cssDev = [ 'style-loader', 'css-loader', 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
  fallback: "style-loader",
  use: ['css-loader', 'sass-loader'],
  publicPath: "/dist"
})

const cssConfig = isProd ? cssProd : cssDev;

const bootstrapConfig = isProd ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev;

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './index.html',
  filename: 'index.html',
  inject: 'body',
  favicon: 'src/assets/img/favicon.ico'
})

module.exports = {
  entry: [ bootstrapEntryPoints.prod, './src/index.js' ],
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js'
  },
  resolve: { extensions: ['*', '.js'] },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/ },
      {
        test: /\.jsx$/,
        use: 'babel-loader',
        exclude: /node_modules/ },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader'],
          publicPath: "/dist"}),
          exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: cssConfig,
        exclude: /node_modules/
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader?name=[name].[ext]&outputPath=images/',
          },
          {
            loader: 'image-webpack-loader',
            options: {
              query: {
                mozjpeg: {
                  progressive: true
                },
                gifsicle: {
                  interlaced: true
                },
                optipng: {
                  optimizationLevel: 7
                }
              }
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        // Limiting the size of the woff fonts breaks font-awesome ONLY for the extract text plugin
        // use: "url?limit=10000"
        use: 'url-loader',
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        use: 'file-loader?name=assets/[name].[ext]',
      },
      { test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, loader: 'imports-loader?jQuery=jquery' },
      { test: /bootstrap-sass\/assets\/javascripts\//, use: 'imports-loader?jQuery=jquery' }
    ]
  },
  plugins: [HtmlWebpackPluginConfig,
    new ExtractTextPlugin({
      filename: "bundle.css",
      disable: !isProd,
      allChunks: true
    }),
    new webpack.ProvidePlugin({
      'window.Tether': 'tether',
    }),
    new webpack.LoaderOptionsPlugin({
      postcss: [autoprefixer],
    })
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
    stats: "minimal",
    open: true
  }
}
