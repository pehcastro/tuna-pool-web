import { writable } from 'svelte/store';

export const walletAddress = writable('');

export const isLoading = writable(true);
