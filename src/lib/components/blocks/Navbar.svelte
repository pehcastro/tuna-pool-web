<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import ThemeSwitcher from '../utils/ThemeSwitcher.svelte';

	import GithubIcon from '~icons/lucide/github';
	import MineIcon from '~icons/lucide/pickaxe';
	import HomeIcon from '~icons/lucide/house';
	import DiscordIcon from '~icons/skill-icons/discord';
</script>

<div
	aria-hidden="true"
	class="hidden md:flex absolute -top-96 start-1/2 transform -translate-x-1/2 -z-10"
>
	<div
		class="bg-gradient-to-r from-background/90 to-background blur-3xl md:w-[25rem] md:h-[44rem] rotate-[-60deg] transform -translate-x-[10rem]"
	/>
	<div
		class="bg-gradient-to-tl blur-3xl md:w-[91rem] md:h-[50rem] rounded-full origin-top-left -rotate-12 -translate-x-[15rem] from-muted via-muted to-background"
	/>
</div>

<nav class="b p-4 hidden md:flex justify-between items-center z-99 md:px-14">
	<div class="text-black dark:text-white text-3xl font-bold">
		<a href="/" class="flex gap-2 items-center"
			><img src="/atagologo.png" alt="Logo" class="size-10" /> Atago</a
		>
	</div>
	<ul class="flex space-x-12 font-semibold uppercase text-sm">
		<li>
			<a
				href="/"
				class="text-black dark:text-white hover:text-gray-300 flex gap-2 items-center hover:scale-95"
				>Home <HomeIcon /></a
			>
		</li>
		<li>
			<a
				href="/guide"
				class="text-black dark:text-white hover:text-gray-300 flex gap-2 items-center hover:scale-95"
				>Mine With Us <MineIcon /></a
			>
		</li>
		<li>
			<a
				href="https://github.com/mgpai22/fortuna-cpu-miner"
				target="_blank"
				class="text-black dark:text-white hover:text-gray-300 flex gap-2 items-center hover:scale-95"
				>Github <GithubIcon /></a
			>
		</li>
	</ul>
	<div class="flex items-center gap-4">
		<a href="/" target="_blank"><DiscordIcon class="size-8 hover:scale-95" /></a>
		<ThemeSwitcher />
	</div>
</nav>

<nav class="flex md:hidden justify-between items-center z-99 p-4 px-10 pr-16">
	<div class="text-black dark:text-white text-3xl font-bold">
		<a href="/" class="flex gap-2 items-center"
			><img src="/atagologo.png" alt="Logo" class="size-9" /> Atago</a
		>
	</div>

	<div class="flex items-center gap-4">
		<a href="/" target="_blank"><DiscordIcon class="size-8 hover:scale-95" /></a>
		<ThemeSwitcher />
	</div>
</nav>
