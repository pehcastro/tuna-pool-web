<script lang="ts">
	export let data;
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import * as Card from '$lib/components/ui/card';
	import * as HoverCard from '$lib/components/ui/hover-card';
	import Separator from '$lib/components/ui/separator/separator.svelte';

	function formatDate(dateString) {
		const date = new Date(dateString);
		const month = date.getMonth() + 1; // Months are zero-indexed
		const day = date.getDate();
		const year = date.getFullYear();
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');
		const seconds = String(date.getSeconds()).padStart(2, '0');
		return `${month}/${day}/${year} - ${hours}:${minutes}:${seconds}`;
	}
</script>

<div class="flex justify-center pt-6">
	<div class="w-full px-20">
		<Card.Root>
			<Card.Header>
				<Card.Title>Miner Workers</Card.Title>
				<Card.Description></Card.Description>
			</Card.Header>
			<Card.Content>
				<div class="flex gap-4">
					{#each data as w}
						<HoverCard.Root>
							<HoverCard.Trigger>
								<div class="flex">
									<div class="p-4 border rounded-xl">
										{w.RigID}
									</div>
								</div>
							</HoverCard.Trigger>
							<HoverCard.Content class="w-60">
								<div class="justify-between flex flex-col text-sm gap-2">
									<p>
										<span class="text-accent font-semibold mr-1">Status:</span><Badge
											variant="outline">{w.Status}</Badge
										>
									</p>
									<p>
										<span class="text-accent font-semibold mr-1">LastSeen:</span>
										{formatDate(w.LastSeen)}
									</p>
									<Separator class="my-4" />
									<div class="flex p-1">
										Hashrate: <span class="text-primary dark:text-secondary mr-2">
											{w.CurrentHashrate.Rate}
											{w.CurrentHashrate.Denomination}
										</span>
									</div>
								</div>
							</HoverCard.Content>
						</HoverCard.Root>
					{/each}
				</div>
			</Card.Content>
		</Card.Root>
	</div>
</div>
