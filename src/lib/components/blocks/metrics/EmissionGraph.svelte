<script lang="ts">
	import { Chart, Svg, Tooltip, Highlight, Bars, Axis, Labels } from 'layerchart';
	import { scaleBand } from 'd3-scale';
	import { format } from 'date-fns';
	import { formatTunaValue } from '$lib/utils/formatTuna';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Switch } from '$lib/components/ui/switch/index.js';
	import { Slider } from '$lib/components/ui/slider';
	export let data;

	let labels = false;
	let sliderValue = [100];

	$: data = data.map((d) => ({ ...d, date: new Date(d.date), value: d.value }));

	$: data = data.map((d) => ({ ...d, value: Number(d.value) }));

	$: slicedData = data.slice(0, sliderValue);

	function formatNumber(value: number): string {
		if (value >= 1e12) return (value / 1e12).toFixed(1) + ' t';
		if (value >= 1e9) return (value / 1e9).toFixed(1) + ' b';
		if (value >= 1e6) return (value / 1e6).toFixed(1) + ' kk';
		if (value >= 1e3) return (value / 1e3).toFixed(1) + ' k';
		return value.toString();
	}
</script>

<div class="flex h-full w-full flex-col">
	<div class="flex justify-between">
		<div class="flex items-center space-x-2 px-6">
			<Switch id="label-mode" class="dark:border dark:border-white/15" bind:checked={labels} />
			<Label for="label-mode" class="text-xs">Display Labels</Label>
		</div>
		<div class="flex items-center space-x-2 px-6 md:w-[30rem] w-full">
			<Label for="slider" class="text-xs">Data Slicer</Label>
			<Slider
				id="slider"
				bind:value={sliderValue}
				max={data.length}
				step={1}
				class="dark:border dark:border-primary rounded-full "
			/>
		</div>
	</div>

	<div class="flex h-full w-full">
		<div class={labels ? 'flex w-full h-full py-6 pr-8 pl-4' : 'flex w-full h-full'}>
			<Chart
				data={slicedData}
				x="date"
				xScale={scaleBand().padding(0.4)}
				y="value"
				yDomain={[0, null]}
				yNice={4}
				padding={{ left: 16, bottom: 24 }}
				tooltip={{ mode: 'band' }}
			>
				<Svg>
					{#if labels}
						<Axis
							placement="right"
							grid
							rule
							format={(d) => {
								return formatNumber(d);
							}}
						/>
						<Axis placement="bottom" format={(d) => format(d, 'MM-dd')} rule />
					{/if}
					<Bars
						radius={4}
						strokeWidth={1}
						class="fill-primary group-hover:fill-gray-300 transition-colors"
					/>
					{#if labels}
						<Labels
							format={(d) => formatNumber(d)}
							offset={10}
							class="text-xs fill-surface-content -stroke-surface-100"
						/>
					{/if}
					<Highlight
						area={{ class: 'fill-black/10' }}
						bar={{ class: 'fill-secondary', strokeWidth: 1, radius: 4 }}
					/>
				</Svg>

				<Tooltip
					y={48}
					xOffset={4}
					variant="none"
					class="text-sm font-semibold text-primary  leading-3 p-2 border border-base-100 border-l-4 border-l-primary rounded-e-md bg-background"
					let:data
					header={(data) => format(data.date, 'eee, MMMM do')}
				>
					<span class="text-foreground pt-2">{formatNumber(formatTunaValue(data.value))}</span>
				</Tooltip>
			</Chart>
		</div>
	</div>
</div>
