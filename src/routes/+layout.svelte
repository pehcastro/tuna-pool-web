<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import Navbar from '$lib/components/blocks/Navbar.svelte';
	import { Toaster } from '$lib/components/ui/sonner';
	import { page } from '$app/stores';

	const appName = 'Atago';

	function capitalizeFirstLetter(string: string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	$: title =
		$page.url.pathname === '/'
			? `${appName}`
			: [...$page.url.pathname.split('/').slice(1).map(capitalizeFirstLetter)].join(' / ') +
				` | ${appName}`;
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="mb-44">
	<Toaster position="bottom-center" class="bg-red-500" />
	<ModeWatcher />
	<div class="mt-2">
		<Navbar />
	</div>
	<slot />
</div>
