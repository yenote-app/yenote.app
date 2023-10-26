import {ResolveFromPackages} from "./ResolveFromPackages";

export function ResolveFromServer(...paths: string[]): string {
	return ResolveFromPackages("yenote-app-server", ...paths);
}
