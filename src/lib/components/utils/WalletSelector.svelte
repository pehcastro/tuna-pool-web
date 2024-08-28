<script lang="ts">
	import { useCardanoWallet } from 'breezesdk';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import Button from '../ui/button/button.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { toast } from 'svelte-sonner';
	import { formatTunaValue } from '$lib/utils/formatTuna';
	import WalletIcon from '~icons/material-symbols-light/account-balance-wallet-outline';
	const { connect, isConnected, disconnect, wallet, list, selected } = useCardanoWallet;

	onMount(async () => {
		const selectedWallet = localStorage.getItem('selectedWallet');
		if (selectedWallet) {
			await connect(selectedWallet);
		}
	});

	let adaBalance: number = 0;
	let tunaBalance: number = 0;
	let isLoading = false;
	let network: number;
	let tunaPolicy: string = 'c981fc98e761e3bb44ae35e7d97ae6227f684bcb6f50a636753da48e';

	function getCookie(name: string): string | null {
		const value = `; ${document.cookie}`;
		const parts = value.split(`; ${name}=`);
		if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
		return null;
	}

	async function handleWalletClick(walletName: string) {
		await connect(walletName);
		const stakeKey = await $wallet?.getAddress('stakekey');
		toast.success(`Connected with ${$selected?.name}`);

		localStorage.setItem('selectedWallet', walletName);
		// add timeout
		await new Promise((resolve) => setTimeout(resolve, 200));
		network = await $wallet?.getNetworkId();
		if (network === 0) {
			toast.error('Please connect to the mainnet');
			return;
		}
	}

	async function handleMyAccount() {
		const walletAddr = await $wallet?.getAddress('bech32');
		window.location.href = `/miner/${walletAddr}`;
		return;
	}

	async function handleDisconnect() {
		localStorage.removeItem('selectedWallet');
		disconnect();
		await new Promise((resolve) => setTimeout(resolve, 200));
	}

	$: if ($isConnected) {
		const tunaAmount = $wallet?.getAssets('policy', tunaPolicy).then((assets) => {
			tunaBalance = assets[0];
		});

		const lovelaceAmount = $wallet?.getAssets('ada').then((assets) => {
			adaBalance = assets;
		});

		const networkId = $wallet?.getNetworkId().then((netID) => {
			network = netID;
		});
	}
</script>

{#if $isConnected}
	{#if network === 0}
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				<Button size="lg"
					>Connected <img
						src={$selected?.icon}
						alt={$selected?.name}
						class="w-4 h-4 mx-1"
					/></Button
				>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content class="rounded-xl">
				<DropdownMenu.Group>
					<DropdownMenu.Label>You're on testnet <br /> disconnect your wallet</DropdownMenu.Label>
					<DropdownMenu.Separator />
					<DropdownMenu.Item on:click={handleDisconnect} type="link">Disconnect</DropdownMenu.Item>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	{:else if network === 1}
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				<Button size="lg"
					>Connected <img
						src={$selected?.icon}
						alt={$selected?.name}
						class="w-4 h-4 mx-1"
					/></Button
				>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content class="rounded-xl">
				<DropdownMenu.Group class="w-40">
					<DropdownMenu.Label>
						<p class="capitalize">{$selected?.name}</p>
					</DropdownMenu.Label>
					<DropdownMenu.Item
						on:click={handleMyAccount}
						type="link"
						class="data-[highlighted]:bg-primary data-[highlighted]:text-white"
						>My Account</DropdownMenu.Item
					>
					<DropdownMenu.Separator />
					<DropdownMenu.Item class="data-[highlighted]:bg-blue-700 data-[highlighted]:text-white"
						>TUNA: {$isConnected && tunaBalance.quantity > 0
							? formatTunaValue(tunaBalance?.quantity).toFixed(2)
							: '0'}</DropdownMenu.Item
					>
					<DropdownMenu.Item class="data-[highlighted]:bg-blue-500 data-[highlighted]:text-white"
						>₳ {$isConnected && adaBalance > 0 ? adaBalance?.toFixed(2) : '0'}</DropdownMenu.Item
					>
					<DropdownMenu.Separator />

					<DropdownMenu.Item
						on:click={handleDisconnect}
						type="link"
						class=" data-[highlighted]:bg-red-700 data-[highlighted]:text-white"
						>Disconnect</DropdownMenu.Item
					>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	{/if}
{:else}
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			<Button size="lg" class="dark:bg-white dark:text-black"
				>Connect <WalletIcon class="ml-1 size-5" /></Button
			>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content class="rounded-xl">
			<DropdownMenu.Group>
				<DropdownMenu.Label>Select your Wallet</DropdownMenu.Label>
				<DropdownMenu.Separator />
				{#each $list as [name, walletOption]}
					<DropdownMenu.Item on:click={() => handleWalletClick(name)}
						><img src={walletOption.icon} alt={walletOption.name} class="w-4 h-4 mx-1" />
						<span class="capitalize mx-1">{walletOption.name}</span></DropdownMenu.Item
					>
				{/each}
			</DropdownMenu.Group>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
{/if}
