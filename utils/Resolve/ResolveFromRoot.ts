import path from "path";

export function ResolveFromRoot(...paths: string[]): string {
	return path.resolve(__dirname, "..", "..", ...paths);
}
