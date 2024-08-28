import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import Icons from 'unplugin-icons/vite';
import wasm from 'vite-plugin-wasm';

export default defineConfig({
	plugins: [
		sveltekit(),
		wasm(),
		Icons({
			compiler: 'svelte'
		})
	],
	build: {
		target: 'ES2022'
	},
	optimizeDeps: {
		include: ['@emurgo/cardano-serialization-lib-browser', 'breezesdk']
	}
});
