export function Log({ Type }: { Type: string }, ...args: string[]): void {
	args = args.map(arg => {
		return arg.split("\n").map((line) => {
			return `[${ Type }] | ${line}`;
		}).join("\n");
	});
	console.log(...args);
}
