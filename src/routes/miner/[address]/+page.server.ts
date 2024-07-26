import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { address } = params;
	const response = await fetch(`http://172.233.85.128:6900/pool/miner/${address}/stats
`);
	const data = await response.json();

	return {
		data
	};
};
