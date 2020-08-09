const path = require( 'path' );

const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );

const { NODE_ENV } = process.env;
const IS_DEVELOPMENT = 'development' === NODE_ENV;
const src = path.resolve( __dirname, 'src' );
const dist = path.resolve( __dirname, 'dist' );

module.exports = {
	entry: [ `${ src }/assets/js/index.js`, `${ src }/assets/css/index.css` ],

	mode: NODE_ENV,

	output: {
		path: dist,
		filename: '[name].bundle.js',
		publicPath: '/',
	},

	devServer: {
		contentBase: './dist',
		useLocalIp: true,
		hot: true,
		http2: true,
		https: true,
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
					IS_DEVELOPMENT
						? 'style-loader'
						: MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
				],
			},
		],
	},

	plugins: [
		new CleanWebpackPlugin( { cleanStaleWebpackAssets: false } ),
		new HtmlWebpackPlugin( { template: './src/index.html' } ),
		new MiniCssExtractPlugin( {
			filename: '[name].css',
			chunkFilename: '[id].css',
		} ),
	],
};
