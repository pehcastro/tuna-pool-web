export function formatToNetNumber(value: number): string {
	if (value >= 1e12) return (value / 1e12).toFixed(1) + ' t';
	if (value >= 1e9) return (value / 1e9).toFixed(1) + ' b';
	if (value >= 1e6) return (value / 1e6).toFixed(1) + ' kk';
	if (value >= 1e3) return (value / 1e3).toFixed(1) + ' k';
	return value.toString();
}
