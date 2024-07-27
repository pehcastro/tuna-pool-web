<script lang="ts">
	import {
		Chart,
		Svg,
		Area,
		Tooltip,
		LinearGradient,
		RectClipPath,
		Highlight,
		Axis,
		Labels
	} from 'layerchart';
	import { cubicInOut } from 'svelte/easing';
	import { scaleTime } from 'd3-scale';
	import { format } from 'date-fns';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Switch } from '$lib/components/ui/switch/index.js';
	import { Slider } from '$lib/components/ui/slider';
	import { formatHashrate } from '$lib/utils/formatHashrate';

	export let data;

	let labels = false;
	let sliderValue = [100];

	$: data = data.map((d) => ({ ...d, date: new Date(d.date) }));

	$: slicedData = data.slice(0, sliderValue);
</script>

<div class="flex h-full w-full flex-col">
	<div class="flex justify-between">
		<div class="flex items-center space-x-2 px-6">
			<Switch id="label-mode" class="dark:border dark:border-white/15" bind:checked={labels} />
			<Label for="label-mode" class="text-xs">Display Labels</Label>
		</div>
		<div class="flex items-center space-x-2 px-6 md:w-[40rem] w-full">
			<Label for="slider" class="text-xs">Data Slicer</Label>
			<Slider
				id="slider"
				bind:value={sliderValue}
				max={data.lenght}
				step={1}
				class="dark:border dark:border-primary rounded-full "
			/>
		</div>
	</div>

	<div class="flex h-full w-full">
		<div class={labels ? 'flex w-full h-full py-6 pr-14 pl-4' : 'flex w-full h-full'}>
			<Chart
				data={slicedData}
				x="date"
				xScale={scaleTime()}
				y="value"
				yDomain={[0, null]}
				yNice
				padding={{ top: 100, bottom: 1 }}
				tooltip={{ mode: 'voronoi' }}
				let:width
				let:height
				let:padding
				let:tooltip
			>
				<Svg>
					{#if labels}
						<Axis
							placement="right"
							grid
							rule
							format={(d) => {
								return formatHashrate(d).rate + formatHashrate(d).denomination;
							}}
						/>
						<Axis placement="bottom" format={(d) => format(d, 'MM-dd')} rule />
					{/if}
					<LinearGradient class="from-primary/50 to-primary/0" vertical let:url>
						<Area line={{ class: 'stroke-2 stroke-primary opacity-20' }} fill={url} tweened />
						<RectClipPath
							x={0}
							y={0}
							width={tooltip.data ? tooltip.x : width}
							{height}
							tweened={{
								y: { duration: 1000, easing: cubicInOut, delay: 500 },
								height: { duration: 1000, easing: cubicInOut, delay: 500 }
							}}
						>
							<Area line={{ class: 'stroke-2 stroke-primary' }} fill={url} />
						</RectClipPath>
					</LinearGradient>
					{#if labels}
						<Labels
							format={(d) => Number(formatHashrate(d).rate).toFixed()}
							offset={10}
							class="text-xs fill-surface-content -stroke-surface-100"
						/>
					{/if}
					<Highlight lines={{ class: 'stroke-primary [stroke-dasharray:unset]' }} />
				</Svg>

				<Tooltip
					y={48}
					xOffset={4}
					variant="none"
					class="text-sm font-semibold text-primary bg-foreground leading-3 bg-base-300 p-2 border border-base-100 border-l-4 border-l-primary rounded-e-md"
					let:data
				>
					{formatHashrate(data.value).rate}
					{formatHashrate(data.value).denomination}
				</Tooltip>

				<Tooltip x={4} y={4} variant="none" class="text-sm font-semibold leading-3  " let:data>
					{format(data.date, 'yyyy-MM-dd')}
				</Tooltip>

				<Tooltip
					x="data"
					y={height + padding.top + 2}
					anchor="top"
					variant="none"
					class="text-sm font-semibold bg-primary text-white leading-3 px-4 py-2 rounded whitespace-nowrap"
					let:data
					target={data}
				>
					{format(data.date, 'yyyy-MM-dd')}
				</Tooltip>
			</Chart>
		</div>
	</div>
</div>
