import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const [poolResponse, blocksResponse, hashrateResponse, emissionResponse, totalMinedResponse] =
			await Promise.all([
				fetch('http://172.233.85.128:6900/pool'),
				fetch('http://172.233.85.128:6900/pool/blocks'),
				fetch('http://172.233.85.128:6900/pool/hashrate'),
				fetch('http://172.233.85.128:6900/pool/emission'),
				fetch('http://172.233.85.128:6900/pool/total-mined-tokens')
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

		if (!emissionResponse.ok) {
			throw new Error(`HTTP error! status: ${emissionResponse.status}`);
		}

		if (!totalMinedResponse.ok) {
			throw new Error(`HTTP error! status: ${totalMinedResponse.status}`);
		}

		const poolData = await poolResponse.json();
		const blocksData = await blocksResponse.json();
		const graphData = await hashrateResponse.json();
		const emissionData = await emissionResponse.json();
		const totalMinedData = await totalMinedResponse.json();

		return { props: { poolData, blocksData, graphData, emissionData, totalMinedData } };
	} catch (err) {
		console.error('Error fetching data:', err);
		return { errors: [err.message] };
	}
};
