/**
 * Converts a value from a coin with 8 decimals to its base unit.
 * @param value - The input value to be converted.
 * @returns The converted value.
 */
export function formatTunaValue(value: number): number {
	return value / 1e8;
}
