import {ResolveFromRoot} from "./ResolveFromRoot";

export function ResolveFromPackages(...paths: string[]): string {
	return ResolveFromRoot("packages", ...paths);
}
