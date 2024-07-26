<script>
	import Hero from '$lib/components/blocks/Hero.svelte';
	import MetricsPage from '$lib/components/blocks/metrics/MetricsPage.svelte';
	import MetricsTable from '$lib/components/blocks/metrics/MetricsTable.svelte';
	import Page from './guide/+page.svelte';
	export let data;

	let metricsData;
	let graphingData;
	let tableData;
	$: {
		if (data && data.props) {
			metricsData = data.props.poolData;
			graphingData = data.props.graphData;
			tableData = data.props.blocksData;

			console.log('graphingData', graphingData);
		} else {
		}
	}
</script>

<div class="mt-5">
	<Hero />
</div>
<div class="md:px-32 gap-4 p-4 px-8">
	<MetricsPage data={metricsData} graph={graphingData} />

	<MetricsTable data={tableData} />

	<Page graph={graphingData} />
</div>
