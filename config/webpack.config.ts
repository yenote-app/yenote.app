import "webpack-dev-server";
import { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
// import WorkboxWebpackPlugin from "workbox-webpack-plugin";
import {ResolveFromClient} from "../utils/Resolve/ResolveFromClient";
import {ResolveFromRoot} from "../utils/Resolve/ResolveFromRoot";
import {Call} from "../utils/Call";

const CLIENT_SCRIPT = ResolveFromClient("index.ts");
const CLIENT_HTML = ResolveFromClient("index.html");
const SERVER_SCRIPT = ResolveFromClient("index.ts");

export default function WebpackConfig(params: IWebpackConfigParams): Configuration {
	const IS_PROD = params.Env === "prod";
	const IS_SERVER = params.Type === "server";
	const IS_START = params.Action === "start";

	const stylesHandler = IS_PROD ? MiniCssExtractPlugin.loader : "style-loader";
	const entry = Call(() => {
		switch (params.Type) {
		case "client":
			return CLIENT_SCRIPT;
		case "server":
			return SERVER_SCRIPT;
		}
	});
	const IS_CLIENT = params.Type === "client";

	const config: Configuration = {
		entry: {
			index: entry,
		},
		mode: IS_PROD ? "production" : "development",
		target: IS_SERVER ? "node" : "web",
		output: {
			path: ResolveFromRoot("dist", Call(() => {
				switch (params.Type) {
				case "client":
					return "client";
				case "server":
					return "server";
				}
			})),
			filename: (pathData) => {
				return pathData.chunk!.name!.includes("server") ? "[name].js" : "[name].bundle.js";
			},
		},
		plugins: [],
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
			],
		},
		resolve: {
			extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
		},
	};
	if (IS_CLIENT) {
		config.plugins!.push(
			new HtmlWebpackPlugin({
				template: CLIENT_HTML,
				filename: "index.html",
				minify: false,
				publicPath: "/",
			}),
		);
		if (IS_PROD) {
			config.plugins!.push(new MiniCssExtractPlugin());
			// config.plugins!.push(new WorkboxWebpackPlugin.GenerateSW());
		}
	}
	if (IS_START) {
		config.devServer = {
			open: true,
			host: "localhost",
			port: 9090,
		};
	}
	return config;
}

export interface IWebpackConfigParams {
    Type: "server" | "client";
    Env: "dev" | "prod";
	Action: "build" | "start";
}
