<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import * as Card from '$lib/components/ui/card';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import LinkIcon from '~icons/lucide/external-link';
	import CustomTooltip from '$lib/components/utils/CustomTooltip.svelte';
	import { formatTunaValue } from '$lib/utils/formatTuna';
	import { toast } from 'svelte-sonner';
	import { formatTimeAgo } from '$lib/utils/formatTimeAgo';
	import FailIcon from '~icons/lucide/badge-x';
	import SuccessIcon from '~icons/lucide/badge-check';
	import { formatHash } from '$lib/utils/formatBlockHash';
	import * as Pagination from '$lib/components/ui/pagination';
	import SpinnerIcon from '~icons/svg-spinners/270-ring'

	export let data;
	let currentPage = 1;
	const perPage = 15;
	const totalPages = Math.ceil(data.length / perPage);
	$: paginatedData = data.slice((currentPage - 1) * perPage, currentPage * perPage);

	function handlePageChange(page) {
		currentPage = page;
	}
</script>

<div>
	<Card.Root>
		<Card.Header>
			<Card.Title class="text-2xl">Latest Pool Mined Blocks</Card.Title>
		</Card.Header>
		<Card.Content>
			<Table.Root>
				<Table.Caption class="py-6">Based on the latest pool mintings.</Table.Caption>
				<Table.Header>
					<Table.Row>
						<Table.Head>Block Height</Table.Head>
						<Table.Head class="w-[500px]">Block Id</Table.Head>
						<Table.Head>Miner</Table.Head>
						<Table.Head>Reward</Table.Head>
						<Table.Head>Tx Id</Table.Head>
						<Table.Head>Effort</Table.Head>
						<Table.Head>Confirmed</Table.Head>
						<Table.Head class="text-right">Age</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each paginatedData as d, i (i)}
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
										{d.miner.slice(5, 13)}..{d.miner.slice(-4)}
									</a>
								</CustomTooltip>
							</Table.Cell>
							<Table.Cell>{formatTunaValue(d.reward).toLocaleString()}</Table.Cell>
							<Table.Cell>
								<CustomTooltip content={d.txId}>
									<a
										href="https://cardanoscan.io/transaction/{d.txId}"
										target="_blank"
										class="hover:text-secondary flex gap-2"
										>{d.txId.slice(0, 4)}...{d.txId.slice(-4)} <LinkIcon /></a
									>
								</CustomTooltip>
							</Table.Cell>
							<Table.Cell>
								{#if d.effort === 0 }
								<SpinnerIcon class="text-secondary"/>
								{:else}
								{d.effort.toLocaleString()}
								{/if}
							</Table.Cell>
							<Table.Cell>
								{#if d.confirmationProgress > 0}
									<SuccessIcon class="size-5 text-green-500" />
								{:else}
									<FailIcon class="size-5 text-red-500" />
								{/if}
							</Table.Cell>
							<Table.Cell class="text-right"><Badge>{formatTimeAgo(d.created)}</Badge></Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
			<Pagination.Root count={totalPages} perPage={1} let:pages let:currentPage>
				<Pagination.Content>
					<Pagination.Item>
						<Pagination.PrevButton on:click={() => handlePageChange(currentPage - 1)} />
					</Pagination.Item>
					{#each pages as page (page.key)}
						{#if page.type === 'ellipsis'}
							<Pagination.Item>
								<Pagination.Ellipsis />
							</Pagination.Item>
						{:else}
							<Pagination.Item isVisible={currentPage == page.value}>
								<Pagination.Link
									{page}
									isActive={currentPage == page.value}
									on:click={() => handlePageChange(page.value)}
								>
									{page.value}
								</Pagination.Link>
							</Pagination.Item>
						{/if}
					{/each}
					<Pagination.Item>
						<Pagination.NextButton on:click={() => handlePageChange(currentPage + 1)} />
					</Pagination.Item>
				</Pagination.Content>
			</Pagination.Root>
		</Card.Content>
		<Card.Footer></Card.Footer>
	</Card.Root>
</div>
