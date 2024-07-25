<script lang="ts">
	import Badge from '../ui/badge/badge.svelte';
	import Button from '../ui/button/button.svelte';
	import SearchBar from '../utils/SearchBar.svelte';
</script>

<div class="relative overflow-hidden lg:py-20">
	<!-- Gradients -->

	<!-- End Gradients -->
	<div class="relative z-10">
		<div class="container py-8">
			<div class="max-w-2xl text-center mx-auto">
				<Badge variant="outline" class="border-gray-600/50 dark:border-slate-200/15"
					>LIVE ON TESTNET</Badge
				>
				<!-- Title -->
				<div class="mt-5 max-w-2xl">
					<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-7xl">
						Atago Mining Pool
					</h1>
				</div>
				<!-- End Title -->
				<div class="mt-5 max-w-3xl">
					<p class="text-xl text-muted-foreground">
						Mine <span class="font-bold dark:text-secondary"> Fortuna</span> with other commmunity members
						with a open-source tool and explorer maintened by the community
					</p>
				</div>
				<!-- search -->
				<div class="mt-8 gap-3 flex justify-center">
					<SearchBar />
				</div>
				<!-- search -->
			</div>
		</div>
	</div>
</div>
