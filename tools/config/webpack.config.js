import path from 'path';
import webpack from 'webpack';
import BowerWebpackPlugin from 'bower-webpack-plugin';
import config from './configuration';

const webpackConfig = {
  devtool: 'source-map',
  entry: config.mainEntry,
  output: {
    filename: 'index.js',
    path: config.outputDir
  },
  resolveLoader: {
    fallback: config.nodeModules
  },
  resolve: {
    extensions: ['', '.jsx', '.js', '.html', '.css'],
  },
  stats: {
    chunks: false, // removed noise made by webpack while transpiling
    colors: true,  // green color, yeah green is good
    timings: true,
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/,
        plugins: ["transform-async-to-generator"],
        query: {
          presets: [
            path.join(config.nodeModules, 'babel-preset-es2015'),
            path.join(config.nodeModules, 'babel-preset-react'),
            path.join(config.nodeModules, 'babel-preset-stage-0'),
          ]
        }
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url',
        query: {
          name: '[hash].[ext]',
          limit: 10000,
        }
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css', 'autoprefixer'],
        exclude: ['node_modules', 'bower_components']
      },
      {
        test: /\.html$/,
        loader: 'html',
        exclude: ['node_modules', 'bower_components']
      }
    ]
  },
  plugins: [
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
    ),
    new BowerWebpackPlugin({
      modulesDirectories: ['bower_components'],
      manifestFiles:      'bower.json',
      includes:           /\.js$/,
      // excludes:           [],
      searchResolveModulesDirectories: true
    }),
  ]
};

export default webpackConfig;
