<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import * as Card from '$lib/components/ui/card';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import LinkIcon from '~icons/lucide/external-link';
	export let data;
</script>

<div>
	<Card.Root>
		<Card.Header>
			<Card.Title class="text-2xl">Latest Blocks</Card.Title>
			<Card.Description>Card Description</Card.Description>
		</Card.Header>
		<Card.Content>
			<Table.Root>
				<Table.Caption>Based on the latest pool mintings.</Table.Caption>
				<Table.Header>
					<Table.Row>
						<Table.Head>Block Height</Table.Head>
						<Table.Head>Block Id</Table.Head>
						<Table.Head>Tx Id</Table.Head>
						<Table.Head class="text-right">Age</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each data as d, i (i)}
						<Table.Row>
							<Table.Cell class="font-medium">{d.blockHeight}</Table.Cell>
							<Table.Cell>{d.id}</Table.Cell>
							<Table.Cell
								><a
									href="https://preview.cardanoscan.io/transaction/{d.txid}"
									target="_blank"
									class="hover:text-secondary flex gap-2">{d.txid} <LinkIcon /></a
								></Table.Cell
							>
							<Table.Cell class="text-right"><Badge>{d.MinutesAgo} Minutes Ago</Badge></Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</Card.Content>
		<Card.Footer></Card.Footer>
	</Card.Root>
</div>
