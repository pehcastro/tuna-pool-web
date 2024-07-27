<script lang="ts">
	import Hero from '$lib/components/blocks/Hero.svelte';
	import MetricsPage from '$lib/components/blocks/metrics/MetricsPage.svelte';
	import MetricsTable from '$lib/components/blocks/metrics/MetricsTable.svelte';
	export let data;

	let metricsData;
	let graphingData;
	let tableData;
	let emissionData;
	let totalMinedData;
	let minersData;

	$: {
		if (data && data.props) {
			metricsData = data.props.poolData;
			graphingData = data.props.graphData;
			tableData = data.props.blocksData;
			emissionData = data.props.emissionData;
			totalMinedData = data.props.totalMinedData;
			minersData = data.props.minersData;
		} else {
		}
	}
</script>

<div class="mt-5">
	<Hero />
</div>
<div class="md:px-32 gap-4 p-4">
	<MetricsPage
		data={metricsData}
		graph={graphingData}
		totalMined={totalMinedData}
		emissionGraph={emissionData}
		miners={minersData}
	/>

	<MetricsTable data={tableData} />
</div>
