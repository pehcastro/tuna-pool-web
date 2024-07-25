import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const response = await fetch('http://172.233.85.128:8001/pool');
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		return { props: { data } };
	} catch (err) {
		console.error('Error fetching pool data:', err);
		return { errors: [err.message] };
	}
};
