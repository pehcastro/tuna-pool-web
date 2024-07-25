<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { page } from '$app/stores';
	import { derived } from 'svelte/store';

	const address = derived(page, ($page) => $page.params.address);

	import TunaIcon from '~icons/mdi/fish';
	import WorkersIcon from '~icons/lucide/pickaxe';
	import HashIcon from '~icons/lucide/activity';

	export let data;
</script>

<div class="flex justify-center pt-24">
	<div class="w-full px-20">
		<Card.Root>
			<Card.Header>
				<Card.Title class="text-2xl">Miner Info</Card.Title>
				<Card.Description
					><a
						href="https://preview.cardanoscan.io/address/{$address}"
						class="text-primary dark:text-secondary flex gap-2"
						>{$address}
						<img src="/src/lib/images/cardanoscan.png" alt={$address} class="size-5" /></a
					>
				</Card.Description>
			</Card.Header>
			<Card.Content>
				<div class="flex justify-between flex-grow gap-8">
					<div class="w-1/3">
						<Card.Root>
							<Card.Header>
								<Card.Title class="flex justify-between"
									>Miner Balance <TunaIcon class="size-5 text-primary" /></Card.Title
								>
							</Card.Header>
							<Card.Content>
								<p class="flex gap-2 items-center">
									{data.Balance.toLocaleString()}
								</p>
							</Card.Content>
						</Card.Root>
					</div>
					<div class="w-1/3">
						<Card.Root>
							<Card.Header>
								<Card.Title class="flex justify-between"
									>Active Workers <WorkersIcon class="size-5 text-primary" /></Card.Title
								>
							</Card.Header>
							<Card.Content>
								<p>{data.ActiveWorkers}</p>
							</Card.Content>
						</Card.Root>
					</div>
					<div class="w-1/3">
						<Card.Root>
							<Card.Header>
								<Card.Title class="flex justify-between"
									>Hashrate <HashIcon class="size-5 text-primary" /></Card.Title
								>
							</Card.Header>
							<Card.Content>
								{data.CurrentHashrate.Rate}
								{data.CurrentHashrate.Denomination}
							</Card.Content>
						</Card.Root>
					</div>
				</div>
			</Card.Content>
		</Card.Root>
	</div>
</div>
