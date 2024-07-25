<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import Search from '~icons/lucide/search';
	import { walletAddress } from '$lib/store';
	import { goto } from '$app/navigation';
	import { toast } from 'svelte-sonner';

	let address = '';

	function handleSubmit(event: Event) {
		event.preventDefault();
		walletAddress.set(address);
		goto(`/miner/${address}`);
		toast.loading('Loading miner data', { duration: 8000 });
	}
</script>

<form on:submit={handleSubmit}>
	<div class="relative">
		<Search class="text-muted-foreground absolute left-2 top-[50%] h-5 w-5 translate-y-[-50%]" />
		<Input
			bind:value={address}
			placeholder="Miner address"
			class="flex pl-10 w-full md:w-[25rem] lg:w-[35rem] h-12"
		/>
	</div>
</form>
