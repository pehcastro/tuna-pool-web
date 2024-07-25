<script>
	import Hero from '$lib/components/blocks/Hero.svelte';
	import MetricsPage from '$lib/components/blocks/metrics/MetricsPage.svelte';
	import MetricsTable from '$lib/components/blocks/metrics/MetricsTable.svelte';
	export let data;

	let metricsData;
	$: {
		if (data && data.props) {
			metricsData = data.props.data;
		} else {
		}
	}
</script>

<div class="mt-5">
	<Hero />
</div>
<div class="px-32 gap-4">
	<MetricsPage data={metricsData} />

	<MetricsTable data={metricsData.LatestBlocks} />
</div>
