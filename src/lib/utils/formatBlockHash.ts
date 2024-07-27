export function formatHash(value: string) {
	const regex = /^0{4,}|0{4,}$/g;
	return value.replace(regex, (match) => `0<sub>${match.length}</sub> `);
}
