'use strict'

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const htmlPlugin = new HtmlWebpackPlugin({
  inject: true,
  template: './src/index.html',
  filename: './index.html'
})

const importReact = new webpack.ProvidePlugin({
  'React': 'react',
  'ReactDOM': 'react-dom'
})

const config = {
  mode: process.env.NODE_ENV || 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'src/script.js'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'standard-loader',
          options: {
            parser: 'babel-eslint'
          }
        }
      },
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  },
  plugins: [
    htmlPlugin,
    importReact
  ]
}

if (process.env.NODE_ENV === 'development') {
  config.module.rules.push({
    test: /\.css$/,
    use: ['style-loader','css-loader']
  })
} else {
  config.module.rules.push({
    test: /\.css$/,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader'
    ]
  })

  config.plugins.push(new MiniCssExtractPlugin({ filename:'src/style.css' }))
}

module.exports = config
