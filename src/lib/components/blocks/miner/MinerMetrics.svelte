<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import HashrateGraph from '../metrics/HashrateGraph.svelte';

	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import { formatTunaValue } from '$lib/utils/formatTuna';
	import CustomTooltip from '$lib/components/utils/CustomTooltip.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import LinkIcon from '~icons/lucide/external-link';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import { formatTimeAgo } from '$lib/utils/formatTimeAgo';
	export let graph;
	export let payments;
</script>

<div class="flex flex-col md:flex-row justify-center pt-10">
	<div class="w-full md:px-20 px-4">
		<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
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
					<Card.Title class="text-2xl">Payments</Card.Title>
				</Card.Header>
				<Card.Content class="md:h-[25vw] w-full -p-24 h-[100vw]">
					<ScrollArea class="h-full w-full p-4">
						{#each payments as p}
							<div class="flex justify-between gap-2 text-xs">
								<div>
									<p>
										<span class="font-semibold text-primary mr-1">TUNA:</span>{formatTunaValue(
											p.amount
										).toLocaleString()}
									</p>
									<p>
										<span class="font-semibold text-primary mr-1">MINER:</span>
										<CustomTooltip content={p.address}>
											<a href="/miner/{p.address}" class="hover:text-secondary">
												{p.address.slice(5, 13)}..{p.address.slice(-4)}
											</a>
										</CustomTooltip>
									</p>
								</div>
								<p class="flex items-center">
									<span class="text-primary font-semibold mr-1">Tx:</span>
									<CustomTooltip content={p.txid}>
										<a
											href="https://cardanoscan.io/transaction/{p.txid}"
											target="_blank"
											class="hover:text-secondary flex gap-2"
											>{p.txid.slice(0, 4)}...{p.txid.slice(-4)} <LinkIcon />
										</a>
									</CustomTooltip>
								</p>
								<p><Badge variant="outline">{formatTimeAgo(p.created)}</Badge></p>
							</div>
							<Separator class="my-2" />
						{/each}
					</ScrollArea>
				</Card.Content>
			</Card.Root>
		</div>
	</div>
</div>
