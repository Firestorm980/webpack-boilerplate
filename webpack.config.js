const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackBar = require('webpackbar');

const { NODE_ENV } = process.env;
const src = path.resolve(__dirname, 'src');
const dist = path.resolve(__dirname, 'dist');

module.exports = {
	entry: {
		index: [`${src}/assets/js/index.js`, `${src}/assets/css/index.css`],
	},

	mode: NODE_ENV,

	output: {
		path: dist,
		filename: '[name].js',
		publicPath: '/',
	},

	devServer: {
		contentBase: './dist',
		https: true,
		http2: true,
		open: false,
		hot: true,
	},

	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'eslint-loader',
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
			{
				test: /\.(css)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							// only enable hot in development
							hmr: process.env.NODE_ENV === 'development',
							// if hmr does not work, this is a forceful method.
							reloadAll: true,
						},
					},
					'css-loader',
					'postcss-loader',
				],
			},
		],
	},

	plugins: [
		new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
		new HtmlWebpackPlugin({ template: './src/index.html' }),
		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),
		new WebpackBar(),
	],
};
