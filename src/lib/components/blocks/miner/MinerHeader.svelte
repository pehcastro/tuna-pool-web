<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { page } from '$app/stores';
	import { derived } from 'svelte/store';
	const address = derived(page, ($page) => $page.params.address);

	import TunaIcon from '~icons/mdi/fish';
	import WorkersIcon from '~icons/lucide/pickaxe';
	import HashIcon from '~icons/lucide/activity';
	import { formatTunaValue } from '$lib/utils/formatTuna';
	import CardanoIcon from '~icons/simple-icons/cardano';
	export let data;
</script>

<div class="flex flex-col md:flex-row justify-center pt-24">
	<div class="w-full md:px-20 px-4">
		<Card.Root>
			<Card.Header>
				<Card.Title class="text-2xl">Miner Info</Card.Title>
				<Card.Description
					><a
						href="https://preview.cardanoscan.io/address/{$address}"
						class="text-primary dark:text-secondary flex gap-2 break-all"
						>{$address}
						<CardanoIcon class="size-6 text-primary dark:text-white" /></a
					>
				</Card.Description>
			</Card.Header>
			<Card.Content>
				<div class="flex md:flex-row flex-col justify-between flex-grow gap-8">
					<div class="md:w-1/3">
						<Card.Root>
							<Card.Header>
								<Card.Title class="flex justify-between"
									>Miner Balance <TunaIcon class="size-5 text-primary" /></Card.Title
								>
							</Card.Header>
							<Card.Content>
								<p class="flex gap-2 items-center">
									{formatTunaValue(data.balance).toLocaleString()}
								</p>
							</Card.Content>
						</Card.Root>
					</div>
					<div class="md:w-1/3">
						<Card.Root>
							<Card.Header>
								<Card.Title class="flex justify-between"
									>Shares <WorkersIcon class="size-5 text-primary" /></Card.Title
								>
							</Card.Header>
							<Card.Content>
								<p>{data.shares}</p>
							</Card.Content>
						</Card.Root>
					</div>
					<div class="md:w-1/3">
						<Card.Root>
							<Card.Header>
								<Card.Title class="flex justify-between"
									>Total Paid <HashIcon class="size-5 text-primary" /></Card.Title
								>
							</Card.Header>
							<Card.Content>
								<p>{formatTunaValue(data.totalPaid).toLocaleString()}</p>
							</Card.Content>
						</Card.Root>
					</div>
				</div>
			</Card.Content>
		</Card.Root>
	</div>
</div>
