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
		Labels
	} from 'layerchart';
	import { cubicInOut } from 'svelte/easing';
	import { scaleTime, scaleLinear } from 'd3-scale';
	import { format } from 'date-fns';

	export let data;

	function convertToHashrate(data) {
		const MHHashrate = data / 1e6;
		return MHHashrate;
	}

	$: data = data.map((d) => ({ ...d, date: new Date(d.date), value: convertToHashrate(d.value) }));

	$: data = data.map((d) => ({ ...d, value: Number(d.value) }));
</script>

<div class="flex h-full w-full">
	<div class="flex w-full h-full]">
		<Chart
			{data}
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
				<Highlight lines={{ class: 'stroke-primary [stroke-dasharray:unset]' }} />
			</Svg>

			<Tooltip
				y={48}
				xOffset={4}
				variant="none"
				class="text-sm font-semibold text-primary bg-foreground leading-3 bg-base-300 p-2 border border-base-100 border-l-4 border-l-primary rounded-e-md"
				let:data
			>
				{data.value} MH/s
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
