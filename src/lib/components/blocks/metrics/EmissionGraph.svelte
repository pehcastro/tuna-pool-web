<script lang="ts">
	import {
		Chart,
		Svg,
		Area,
		Tooltip,
		TooltipItem,
		LinearGradient,
		RectClipPath,
		Highlight,
		ChartClipPath,
		Axis,
		Spline,
		Labels,
		Bars
	} from 'layerchart';
	import { cubicInOut } from 'svelte/easing';
	import { scaleBand } from 'd3-scale';
	import { format } from 'date-fns';

	export let data;

	$: data = data.map((d) => ({ ...d, date: new Date(d.date), value: d.value }));

	$: data = data.map((d) => ({ ...d, value: Number(d.value) }));

	function formatNumber(value: number): string {
		if (value >= 1e12) return (value / 1e12).toFixed(1) + ' t';
		if (value >= 1e9) return (value / 1e9).toFixed(1) + ' b';
		if (value >= 1e6) return (value / 1e6).toFixed(1) + ' kk';
		if (value >= 1e3) return (value / 1e3).toFixed(1) + ' k';
		return value.toString();
	}
</script>

<div class="flex h-full w-full">
	<div class="flex w-full h-full]">
		<Chart
			{data}
			x="date"
			xScale={scaleBand().padding(0.4)}
			y="value"
			yDomain={[0, null]}
			yNice={4}
			padding={{ left: 16, bottom: 24 }}
			tooltip={{ mode: 'band' }}
		>
			<Svg>
				<Bars
					radius={4}
					strokeWidth={1}
					class="fill-primary group-hover:fill-gray-300 transition-colors"
				/>
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
				<span class="text-foreground pt-2">{formatNumber(data.value)}</span>
			</Tooltip>
		</Chart>
	</div>
</div>
