import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const [poolResponse, blocksResponse, hashrateResponse] = await Promise.all([
			fetch('http://172.233.85.128:6900/pool'),
			fetch('http://172.233.85.128:6900/pool/blocks'),
			fetch('http://172.233.85.128:6900/pool/hashrate')
		]);

		if (!poolResponse.ok) {
			throw new Error(`HTTP error! status: ${poolResponse.status}`);
		}
		if (!blocksResponse.ok) {
			throw new Error(`HTTP error! status: ${blocksResponse.status}`);
		}
		if (!hashrateResponse.ok) {
			throw new Error(`HTTP error! status: ${hashrateResponse.status}`);
		}

		const poolData = await poolResponse.json();
		const blocksData = await blocksResponse.json();
		const graphData = await hashrateResponse.json();

		return { props: { poolData, blocksData, graphData } };
	} catch (err) {
		console.error('Error fetching data:', err);
		return { errors: [err.message] };
	}
};
