<script lang="ts">
	import MinerHeader from '$lib/components/blocks/miner/MinerHeader.svelte';
	import MinerWorkers from '$lib/components/blocks/miner/MinerWorkers.svelte';
	import SearchBar from '$lib/components/utils/SearchBar.svelte';

	export let data: any;

	let minerData: any;

	$: {
		if (data && data.data) {
			minerData = data.data;
		} else {
		}
	}
</script>

{#if data && (data.data.ActiveWorkers > 0 || data.data.Balance > 0)}
	<div>
		<MinerHeader data={minerData} />
	</div>
	<div>
		<MinerWorkers data={minerData.WorkerList} />
	</div>
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
