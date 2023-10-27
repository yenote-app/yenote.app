import {webpack, Stats} from "webpack";
import WebpackConfig, {IWebpackConfigParams} from "../config/webpack.config";
import {Call} from "../utils/Call";
import {Log} from "../utils/Log";
import {CleanDist} from "../utils/CleanDist";

void Call(async () => {
	await CleanDist();
	await Promise.all([
		build({
			Type: "client",
			Env: "prod",
			Action: "build",
		}).then(finishCallback),
		build({
			Type: "server",
			Env: "prod",
			Action: "build"
		}).then(finishCallback),
	]);
});

async function build(params: IWebpackConfigParams): Promise<[IWebpackConfigParams, Stats, null] | [IWebpackConfigParams, null, Error]> {
	return new Promise<[IWebpackConfigParams, Stats, null] | [IWebpackConfigParams, null, Error]>(resolve => {
		Log(params, "START");
		webpack(WebpackConfig(params), (err, stats) => {
			resolve([params, stats || null, err || null] as [IWebpackConfigParams, Stats, null] | [IWebpackConfigParams, null, Error]);
			Log(params, "END");
		});
	});
}
function finishCallback([params, stats, error]: [IWebpackConfigParams, Stats, null] | [IWebpackConfigParams, null, Error]): void {
	if (error) {
		Log(params, "ERROR:");
		return void console.error(error);
	}
	Log(
		params,
		stats!.toString({
			chunks: false, // Makes the build much quieter
			colors: true, // Shows colors in the console
		}),
	);
}
