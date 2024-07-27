<script lang="ts">
	import Activity from '~icons/lucide/activity';
	import CreditCard from '~icons/lucide/blocks';
	import DollarSign from '~icons/lucide/circle-dollar-sign';
	import Users from '~icons/lucide/users';
	import { formatTunaValue } from '$lib/utils/formatTuna';
	import { formatToNetNumber } from '$lib/utils/formatToNetNumber';

	import * as Card from '$lib/components/ui/card';
	import HashrateGraph from './HashrateGraph.svelte';
	import EmissionGraph from './EmissionGraph.svelte';
	import DivisionChart from './DivisionChart.svelte';
	import RankingTable from './RankingTable.svelte';

	export let data;
	export let graph;
	export let totalMined;
	export let emissionGraph;
	export let miners;
</script>

<div class="flex-col md:flex">
	<div class="flex-1 space-y-4 py-5 pt-6">
		<div class="flex items-center justify-between space-y-2">
			<h2 class="text-3xl font-bold tracking-tight">Overview</h2>
		</div>
		<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
			<Card.Root>
				<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
					<Card.Title class="text-sm font-medium">Tuna Minted</Card.Title>
					<DollarSign class="text-muted-foreground h-4 w-4" />
				</Card.Header>
				<Card.Content>
					<div class="text-2xl font-bold uppercase">
						{formatToNetNumber(formatTunaValue(totalMined.totalMinedTokens))}
					</div>
				</Card.Content>
			</Card.Root>
			<Card.Root>
				<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
					<Card.Title class="text-sm font-medium">Active Miners</Card.Title>
					<Users class="text-muted-foreground h-4 w-4" />
				</Card.Header>
				<Card.Content>
					<div class="text-2xl font-bold">{data.activeMiners}</div>
				</Card.Content>
			</Card.Root>
			<Card.Root>
				<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
					<Card.Title class="text-sm font-medium">Blocks Per Hour</Card.Title>
					<CreditCard class="text-muted-foreground h-4 w-4" />
				</Card.Header>
				<Card.Content>
					<div class="text-2xl font-bold">{data.blocksPerHour}</div>
				</Card.Content>
			</Card.Root>
			<Card.Root>
				<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
					<Card.Title class="text-sm font-medium">Pool Hashrate</Card.Title>
					<Activity class="text-muted-foreground h-4 w-4" />
				</Card.Header>
				<Card.Content>
					<div class="text-2xl font-bold">
						{data.poolHashRate.rate}
						{data.poolHashRate.denomination}
					</div>
					<p class="text-xs text-muted-foreground">
						Raw Pool Hashrate: <span class="text-primary dark:text-secondary"
							>{data.poolHashRate.raw}</span
						>
					</p>
				</Card.Content>
			</Card.Root>
		</div>

		<div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
			<Card.Root class="col-span-4">
				<Card.Header>
					<Card.Title class="text-2xl">Hashrate History</Card.Title>
				</Card.Header>
				<Card.Content class="md:h-[25vw] w-full -p-24 h-[100vw]">
					<HashrateGraph data={graph} />
				</Card.Content>
			</Card.Root>
			<Card.Root class="col-span-4 md:col-span-3">
				<Card.Header>
					<Card.Title class="text-2xl">Emission by Day</Card.Title>
				</Card.Header>
				<Card.Content class="md:h-[25vw] w-full -p-24 h-[100vw]">
					<EmissionGraph data={emissionGraph} />
				</Card.Content>
			</Card.Root>

			<Card.Root class="col-span-4 md:col-span-2">
				<Card.Header>
					<Card.Title class="text-2xl">Hashrate by Miners</Card.Title>
				</Card.Header>
				<Card.Content class="md:h-[25vw] w-full -p-24 h-[100vw]">
					<DivisionChart data={miners} />
				</Card.Content>
			</Card.Root>
			<Card.Root class="col-span-4 md:col-span-5">
				<Card.Header>
					<Card.Title class="text-2xl">Miners Ranking</Card.Title>
				</Card.Header>
				<Card.Content class="md:h-[25vw] w-full -p-24 h-[100vw]">
					<RankingTable data={miners} />
				</Card.Content>
			</Card.Root>
		</div>

		<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7"></div>
	</div>
</div>
