const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

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

module.exports = config
