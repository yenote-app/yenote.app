import fs from "fs";
import {ResolveFromRoot} from "./Resolve/ResolveFromRoot";
import {Log} from "./Log";

export function CleanDist(){
	if (!fs.existsSync(ResolveFromRoot("dist"))) {
		return;
	}
	Log({Type: "Clean"}, "Removing dist folder...");
	fs.rmSync(ResolveFromRoot("dist"), {
		recursive: true,
	});
	Log({Type: "Clean"}, "Removed dist folder!");
}
