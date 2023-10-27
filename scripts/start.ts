import {webpack} from "webpack";
import WebpackDevServer from "webpack-dev-server";
import WebpackConfig from "../config/webpack.config";
import {Call} from "../utils/Call";
import {Log} from "../utils/Log";
import {CleanDist} from "../utils/CleanDist";

void Call(async () => {
	await CleanDist();
	await Promise.all([
		startClient(),
	]);
});

async function startClient(): Promise<void> {
	return new Promise<void>(() => {
		const webpackConfig = WebpackConfig({
			Type: "client",
			Action: "start",
			Env: "dev",
		});
		const compiler = webpack(webpackConfig);
		const devServerOptions = { ...webpackConfig.devServer, open: true };
		const server = new WebpackDevServer(devServerOptions, compiler);

		server.startCallback(() => {
			Log({ Type: "client" }, `Successfully started server on http://localhost:${ devServerOptions.port || "8080" }`);
		});
	});
}

