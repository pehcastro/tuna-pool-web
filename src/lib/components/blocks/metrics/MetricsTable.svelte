<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import * as Card from '$lib/components/ui/card';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import LinkIcon from '~icons/lucide/external-link';
	import CustomTooltip from '$lib/components/utils/CustomTooltip.svelte';
	import { formatTunaValue } from '$lib/utils/formatTuna';
	import { toast } from 'svelte-sonner';

	import FailIcon from '~icons/lucide/badge-x';
	import SuccessIcon from '~icons/lucide/badge-check';

	export let data;

	function formatTimeAgo(isoDateString) {
		const date = new Date(isoDateString);
		const now = new Date();
		const diffInMs = now - date;
		const diffInMinutes = Math.floor(diffInMs / 60000);
		const diffInHours = Math.floor(diffInMinutes / 60);
		const diffInDays = Math.floor(diffInHours / 24);

		if (diffInMinutes < 60) {
			return `${diffInMinutes} minutes ago`;
		} else if (diffInHours < 24) {
			return `${diffInHours} hours ago`;
		} else {
			return `${diffInDays} days ago`;
		}
	}

	function formatHash(value: string) {
		const regex = /^0{4,}|0{4,}$/g;
		return value.replace(regex, (match) => `0<sub>${match.length}</sub> `);
	}
</script>

<div>
	<Card.Root>
		<Card.Header>
			<Card.Title class="text-2xl">Latest Blocks</Card.Title>
		</Card.Header>
		<Card.Content>
			<Table.Root>
				<Table.Caption>Based on the latest pool mintings.</Table.Caption>
				<Table.Header>
					<Table.Row>
						<Table.Head>Block Height</Table.Head>
						<Table.Head class="w-[500px]">Block Id</Table.Head>
						<Table.Head>Miner</Table.Head>
						<Table.Head>Reward</Table.Head>
						<Table.Head>Tx Id</Table.Head>
						<Table.Head>Effort</Table.Head>
						<Table.Head>Confirmated</Table.Head>
						<Table.Head class="text-right">Age</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each data as d, i (i)}
						<Table.Row>
							<Table.Cell class="font-medium">{d.height}</Table.Cell>
							<Table.Cell>{@html formatHash(d.id)}</Table.Cell>
							<Table.Cell>
								<CustomTooltip content={d.miner}>
									<a
										href="/miner/{d.miner}"
										class="hover:text-secondary border p-1 px-2 rounded-full border-primary dark:border-secondary"
										on:click={() => toast.loading('Loading miner details...')}
									>
										{d.miner.slice(9, 13)}..{d.miner.slice(-4)}
									</a>
								</CustomTooltip>
							</Table.Cell>
							<Table.Cell>{formatTunaValue(d.reward).toLocaleString()}</Table.Cell>
							<Table.Cell>
								<CustomTooltip content={d.txId}>
									<a
										href="https://preview.cardanoscan.io/transaction/{d.txId}"
										target="_blank"
										class="hover:text-secondary flex gap-2"
										>{d.txId.slice(0, 4)}...{d.txId.slice(-4)} <LinkIcon /></a
									>
								</CustomTooltip>
							</Table.Cell>
							<Table.Cell>{d.effort.toLocaleString()}</Table.Cell>
							<Table.Cell>
								{#if d.confirmationProgress > 0}
									<SuccessIcon class="size-5 text-green-500" />
								{:else}
									<FailIcon class="size-5 text-red-500" />
								{/if}</Table.Cell
							>
							<Table.Cell class="text-right"><Badge>{formatTimeAgo(d.created)}</Badge></Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</Card.Content>
		<Card.Footer></Card.Footer>
	</Card.Root>
</div>
