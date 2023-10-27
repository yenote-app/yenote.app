export function Call<IResult, IArgs extends unknown[]>(fn: (...args: IArgs) => IResult, ...args: IArgs): IResult {
	return fn(...args);
}
