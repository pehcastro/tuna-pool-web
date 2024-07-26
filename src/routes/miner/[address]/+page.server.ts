import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { address } = params;
	const response = await fetch(`https://api.atago.io/pool/miner/${address}/stats
`);
	const data = await response.json();

	return {
		data
	};
};
