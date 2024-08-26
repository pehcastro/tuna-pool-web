<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import CustomTooltip from '$lib/components/utils/CustomTooltip.svelte';
	import { toast } from 'svelte-sonner';
	import { formatHashrate } from '$lib/utils/formatHashrate';
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import Badge from '$lib/components/ui/badge/badge.svelte';

	export let data;
</script>

<div class="flex h-full w-full p-4">
	<ScrollArea class="flex h-full w-full">
		<div class="flex md:pr-6 pr-2">
			<Table.Root class="">
				<Table.Caption>Based on the latest pool mintings.</Table.Caption>
				<Table.Header>
					<Table.Row>
						<Table.Head>Ranking</Table.Head>
						<Table.Head class="w-[200px]">Miner</Table.Head>
						<Table.Head>Hashrate</Table.Head>
						<Table.Head>Total Rigs</Table.Head>
						<Table.Head class="text-right">Active Rigs</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each data as d, i (i)}
						<Table.Row>
							<Table.Cell>{d.ranking}</Table.Cell>
							<Table.Cell>
								<CustomTooltip content={d.miner}>
									<Badge class="rounded-full">
										<a
											href="/miner/{d.miner}"
											on:click={() => toast.loading('Loading miner details...')}
										>
											{d.miner.slice(5, 13)}..{d.miner.slice(-4)}
										</a>
									</Badge>
								</CustomTooltip>
							</Table.Cell>
							<Table.Cell class="font-semibold italic "
								>{formatHashrate(d.hashrate).rate}
								{formatHashrate(d.hashrate).denomination}</Table.Cell
							>
							<Table.Cell>{d.totalRigs}</Table.Cell>

							<Table.Cell class="text-right"
								><Badge variant="destructive">{d.activeRigs}</Badge></Table.Cell
							>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</div>
	</ScrollArea>
</div>
