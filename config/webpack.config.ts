import "webpack-dev-server";
import { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
// import WorkboxWebpackPlugin from "workbox-webpack-plugin";
import {ResolveFromClient} from "../utils/Resolve/ResolveFromClient";
import {ResolveFromRoot} from "../utils/Resolve/ResolveFromRoot";

const CLIENT_SCRIPT = ResolveFromClient("index.ts");
const CLIENT_HTML = ResolveFromClient("index.html");
const SERVER_SCRIPT = ResolveFromClient("index.ts");

export default function WebpackConfig(params: IWebpackConfigParams): Configuration {
	const isProduction = params.Env === "prod";
	const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : "style-loader";

	const config: Configuration = {
		entry: {
			"client/index": CLIENT_SCRIPT,
			"server/index": SERVER_SCRIPT,
		},
		output: {
			path: ResolveFromRoot("dist"),
			// filename: "[name].[contenthash].bundle.js",
			filename: (pathData) => {
				return pathData.chunk!.name!.includes("server") ? "[name].js" : "[name].[contenthash].bundle.js";
			},
		},
		devServer: {
			open: true,
			host: "localhost",
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: CLIENT_HTML,
				chunks: ["client/index"],
				filename: "client/index.html",
				minify: false,
				publicPath: "/",
			}),

			// Add your plugins here
			// Learn more about plugins from https://webpack.js.org/configuration/plugins/
		],
		module: {
			rules: [
				{
					test: /\.(ts|tsx)$/i,
					loader: "ts-loader",
					exclude: ["/node_modules/"],
				},
				{
					test: /\.css$/i,
					use: [stylesHandler,"css-loader"],
				},
				{
					test: /\.s[ac]ss$/i,
					use: [stylesHandler, "css-loader", "sass-loader"],
				},
				{
					test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
					type: "asset",
				},

				// Add your rules for custom modules here
				// Learn more about loaders from https://webpack.js.org/loaders/
			],
		},
		resolve: {
			extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
		},
	};
	if (isProduction) {
		config.mode = "production";

		config.plugins!.push(new MiniCssExtractPlugin());
		// config.plugins!.push(new WorkboxWebpackPlugin.GenerateSW());

	} else {
		config.mode = "development";
	}
	return config;
}

export interface IWebpackConfigParams {
    Type: "all" | "server" | "client";
    Env: "dev" | "prod",
}
