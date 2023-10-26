import {ResolveFromPackages} from "./ResolveFromPackages";

export function ResolveFromClient(...paths: string[]): string {
	return ResolveFromPackages("yenote-app-client", ...paths);
}
