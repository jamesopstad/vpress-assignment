export function classNames(...classes: any[]) {
	return classes.filter((value) => typeof value === 'string').join(' ');
}
