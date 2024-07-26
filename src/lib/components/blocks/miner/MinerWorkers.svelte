<script lang="ts">
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import * as Card from '$lib/components/ui/card';
	import * as HoverCard from '$lib/components/ui/hover-card';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import CustomTooltip from '$lib/components/utils/CustomTooltip.svelte';
	import SparklineGraph from './SparklineGraph.svelte';

	export let workers;
	export let hashrates;

	function formatTimeAgo(isoDateString: string): string {
		const date = new Date(isoDateString);
		const now = new Date();
		const diffInMs = now.getTime() - date.getTime();
		const diffInMinutes = Math.floor(diffInMs / 60000);
		const diffInHours = Math.floor(diffInMinutes / 60);
		const diffInDays = Math.floor(diffInHours / 24);

		if (diffInMinutes < 60) {
			return `${diffInMinutes} minutes ago`;
		} else if (diffInHours < 24) {
			return `${diffInHours} hours ago`;
		} else if (diffInDays === 1) {
			return `1 day ago`;
		} else {
			return `${diffInDays} days ago`;
		}
	}

	function convertToHashrate(data) {
		const MHHashrate = data / 1e6;
		return MHHashrate.toFixed(2);
	}

	function makeDate(date) {
		return new Date(date);
	}
</script>

<p class="md:px-20 px-4 font-bold text-2xl py-4">My Workers</p>
<div class="flex justify-center pt-1 gap-2">
	<div class="grid md:grid-cols-4 gap-4 md:w-full md:px-20">
		{#each workers as w}
			<Card.Root>
				<Card.Header>
					<div class="flex justify-between items-center">
						<div>
							<Card.Description>Rig Id</Card.Description>
							<Card.Title>{w.rigId}</Card.Title>
						</div>

						<CustomTooltip content={makeDate(w.lastSeen)}>
							<div
								class="text-xs border rounded-full p-0.5 px-1 border-primary text-gray-900 dark:text-slate-300"
							>
								{formatTimeAgo(w.lastSeen)}
							</div>
						</CustomTooltip>
					</div>
				</Card.Header>
				<Card.Content>
					<div class="flex text-sm">
						<div class="flex w-full justify-between items-center">
							<p>
								<span class="text-primary font-semibold mr-1">Hashrate:</span>
								{convertToHashrate(w.hashrate)} MH/s
							</p>
							<p>
								<span class="text-primary font-semibold mr-1">Shares/s:</span>{w.sharesPerSecond}
							</p>
						</div>
					</div>
				</Card.Content>
				<Card.Footer class="md:h-[8vw] h-[25vw] md:w-full w-[90vw] -p-24 ">
					{#each hashrates as h}
						{#if h[0].rigId === w.rigId}
							<SparklineGraph data={h} />
						{/if}
					{/each}
				</Card.Footer>
			</Card.Root>
		{/each}
	</div>
</div>
