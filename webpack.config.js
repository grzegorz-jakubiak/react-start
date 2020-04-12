'use strict'

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = (env, { mode }) => {
  const isProduction = mode === 'production'

  const config = {
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        src: path.resolve(__dirname, 'src/')
      }
    },
    mode: mode,
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'src/js/[name].js'
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
        },
        {
          test: /\.(png|jp(e*)g|svg)$/,
          use: [{
            loader: 'url-loader',
            options: {
              limit: 8000,
              name: 'src/assets/images/[name].[ext]'
            }
          }]
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../'
              }
            },
            {
              loader: 'css-loader'
            }
          ]
        }
      ]
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            parse: {
              ecma: 8
            },
            compress: {
              ecma: 5,
              dead_code: true,
              warnings: false,
              comparisons: false,
              inline: 2
            },
            mangle: {
              safari10: true
            },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true
            }
          },
          cache: true
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: isProduction ? '!!prerender-loader?string!./public/index.html' : './public/index.html',
        filename: './index.html'
      }),
      new MiniCssExtractPlugin({
          filename: 'src/css/[name].css'
      })
    ]
  }

  return config
}