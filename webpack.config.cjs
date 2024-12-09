const path                 = require('path');
const webpack              = require('webpack');
const HtmlWebpackPlugin    = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin    = require('copy-webpack-plugin');

module.exports = {
  mode:    'development',
  entry:   './src/ts/ocpiApp.ts',
  target:  'web',
  //devtool: "eval-source-map",  // Do not use in production!
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".js"],
    fallback: {
      "fs":           false,
      "original-fs":  false,
      "path":         require.resolve("path-browserify"),
      "http":         require.resolve("stream-http"),
      "crypto":       require.resolve("crypto-browserify"),
      "url":          require.resolve("url/"),
      "stream":       require.resolve("stream-browserify"),
      "vm":           require.resolve("vm-browserify"),
      "buffer":       require.resolve("buffer/"),
      "node:buffer":  require.resolve("buffer/")
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: path.resolve(__dirname, 'src/ts'),
        use: [{ loader: 'ts-loader' }]
      },
      {
        // Only .scss files are included, that are included in a .ts file
        // e.g. "import './ocpiExplorer.scss'" within ocpiExplorerWebApp.ts
        test: /\.scss$/,
        use: [
          //'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext][query]' // Path and naming of your fonts
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset/resource',
        generator: {
          // Keep original filename and extension
          filename: 'images/[name][ext]'
        }
      }
    ]
  },
  externals: {
    'asn1':         'asn1.js',
    'base32decode': 'base32-decode'
  },
  output: {
    path:     path.resolve(__dirname, 'build'),
    filename: 'ocpiExplorerWebApp-bundle.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/ocpiExplorer.css',
      chunkFilename: '[id].css'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from:    '*.css',
          to:       path.resolve(__dirname, 'build/css'),
          context: 'static/css'
        },
        {
          from:     path.resolve(__dirname, 'static/css/images'),
          to:       path.resolve(__dirname, 'build/css/images')
        },
        {
          from:     path.resolve(__dirname, 'static/images'),
          to:       path.resolve(__dirname, 'build/images')
        },
        {
          from:     path.resolve(__dirname, 'src/i18n.json'),
          to:       path.resolve(__dirname, 'build/i18n.json')
        },
        {
          from:     path.resolve(__dirname, 'package.json'),
          to:       path.resolve(__dirname, 'build/package.json')
        }
      ]
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'static'),
    },
    port:  1608,
    hot:   true,
    allowedHosts: ['.charging.cloud'],
    open:  true,
    watchFiles: ['src/**/*', 'static/**/*']
    // devMiddleware: {
    //   writeToDisk: true // Add this line to write changed files to disk (normally in-memory only!)
    // }
  },
  watchOptions: {
    aggregateTimeout: 300, // Delay (in milliseconds) after a change is detected before recompiling
    poll:             true // Polling mode for file watching. Seems to detect and recompile nested changes within TypeScript files more reliably!
  }
};
