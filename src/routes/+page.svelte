<script>
	import Hero from '$lib/components/blocks/Hero.svelte';
	import MetricsPage from '$lib/components/blocks/metrics/MetricsPage.svelte';
	import MetricsTable from '$lib/components/blocks/metrics/MetricsTable.svelte';
	export let data;

	let metricsData;
	let graphingData;
	let tableData;
	$: {
		if (data && data.props) {
			metricsData = data.props.poolData;
			graphingData = data.props.graphData;
			tableData = data.props.blocksData;

			console.log('data', metricsData);
			console.log('graphingData', graphingData);
			console.log('tableData', tableData);
		} else {
		}
	}

	// metricsData.LatestBlocks can be used in another place, maybe a new card with the graph
</script>

<div class="mt-5">
	<Hero />
</div>
<div class="px-32 gap-4">
	<MetricsPage data={metricsData} />

	<MetricsTable data={tableData} />
</div>
