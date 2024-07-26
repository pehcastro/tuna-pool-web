<script lang="ts">
	import MinerHeader from '$lib/components/blocks/miner/MinerHeader.svelte';
	import MinerWorkers from '$lib/components/blocks/miner/MinerWorkers.svelte';
	import SearchBar from '$lib/components/utils/SearchBar.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { derived } from 'svelte/store';
	import MinerMetrics from '$lib/components/blocks/miner/MinerMetrics.svelte';
	import MinerTable from '$lib/components/blocks/miner/MinerTable.svelte';
	import { isLoading } from '$lib/store';
	import CardanoIcon from '~icons/mingcute/cardano-ada-line';
	const address = derived(page, ($page) => $page.params.address);
	export let data: any;

	let minerData: any;
	let workersData: any;
	let minerHashrate;
	let workersResponses = [];
	let minerBlocksData;

	$: {
		if (data && data.data) {
			minerData = data.data.minerAccount;
			workersData = data.data.workers;
			minerBlocksData = data.data.blocks;
		} else {
		}
	}

	onMount(async () => {
		isLoading.set(true); // Start loading

		if (!data.data) {
			isLoading.set(false); // Stop loading if no data
			return;
		}

		const hashrateResponse = await fetch(`https://api.atago.io/pool/miner/${$address}/hashrate`);
		const hashrateData = await hashrateResponse.json();
		minerHashrate = hashrateData;

		if (workersData && workersData.length > 0) {
			workersResponses = await Promise.all(
				workersData.map(async (worker) => {
					const response = await fetch(
						`https://api.atago.io/pool/miner/${$address}/${worker.rigId}/hashrate`
					);
					const data = await response.json();
					return data.map((item) => ({ ...item, rigId: worker.rigId }));
				})
			);
		}

		isLoading.set(false); // Stop loading after data is fetched
	});
</script>

{#if $isLoading}
	<div class="flex justify-center h-[70vh] items-center">
		<CardanoIcon class="size-40 animate-spin-slow" />
	</div>
{:else if data.data.workers && data.data.workers.length > 0}
	<div>
		<MinerHeader data={minerData} />
	</div>

	{#if minerHashrate}
		<div>
			<MinerMetrics graph={minerHashrate} payments={minerData.payments} />
		</div>
	{/if}

	{#if workersResponses.length > 0}
		<div>
			<MinerWorkers workers={workersData} hashrates={workersResponses} />
		</div>
	{/if}

	<div>
		<MinerTable data={minerBlocksData} />
	</div>
	<!-- <div>
		<MinerWorkers />
	</div> -->
{:else}
	<div class="flex flex-col justify-center pt-32">
		<div class="flex justify-center">
			<p class="flex flex-col text-3xl font-bold px-52 mx-52 text-center">
				This wallet is invalid, try again
				<span class="text-sm font-normal">
					It could be that it is on the wrong network, has never connected to us or does not exist</span
				>
			</p>
		</div>
		<div class="flex justify-center mt-10">
			<SearchBar />
		</div>
	</div>
{/if}
