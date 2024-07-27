import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const [
			poolResponse,
			blocksResponse,
			hashrateResponse,
			emissionResponse,
			totalMinedResponse,
			minersResponse
		] = await Promise.all([
			fetch('https://api.atago.io/pool'),
			fetch('https://api.atago.io/pool/blocks'),
			fetch('https://api.atago.io/pool/hashrate'),
			fetch('https://api.atago.io/pool/emission'),
			fetch('https://api.atago.io/pool/total-mined-tokens'),
			fetch('https://api.atago.io/pool/miners')
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
		if (!minersResponse.ok) {
			throw new Error(`HTTP error! status: ${minersResponse.status}`);
		}

		const poolData = await poolResponse.json();
		const blocksData = await blocksResponse.json();
		const graphData = await hashrateResponse.json();
		const emissionData = await emissionResponse.json();
		const totalMinedData = await totalMinedResponse.json();
		const minersData = await minersResponse.json();

		return { props: { poolData, blocksData, graphData, emissionData, totalMinedData, minersData } };
	} catch (err) {
		console.error('Error fetching data:', err);
		return { errors: [err.message] };
	}
};
