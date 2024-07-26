<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import Navbar from '$lib/components/blocks/Navbar.svelte';
	import { Toaster } from '$lib/components/ui/sonner';
</script>

<div class="mb-44">
	<Toaster position="bottom-center" class="bg-red-500" />
	<ModeWatcher />
	<div class="mt-2">
		<Navbar />
	</div>
	<slot />
</div>
