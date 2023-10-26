import {webpack} from "webpack";
import WebpackConfig from "../config/webpack.config";

webpack(WebpackConfig({
	Type: "all",
	Env: "prod",
}), (err, stats) => {
	if (err) {
		return void console.error(err);
	}

	console.log(
		stats!.toString({
			chunks: false, // Makes the build much quieter
			colors: true, // Shows colors in the console
		})
	);
});
