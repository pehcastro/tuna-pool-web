<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import CustomTooltip from '$lib/components/utils/CustomTooltip.svelte';
	import SparklineGraph from './SparklineGraph.svelte';
	import { formatHashrate } from '$lib/utils/formatHashrate';
	import { formatTimeAgo } from '$lib/utils/formatTimeAgo';
	export let workers;
	export let hashrates;
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

						<CustomTooltip content={new Date(w.lastSeen)}>
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
								{formatHashrate(w.hashrate).rate}
								{formatHashrate(w.hashrate).denomination}
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
