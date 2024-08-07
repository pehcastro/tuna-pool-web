<script lang="ts">
	import { Chart, Svg, Area, Tooltip, LinearGradient, RectClipPath, Highlight } from 'layerchart';
	import { cubicInOut } from 'svelte/easing';
	import { scaleTime } from 'd3-scale';
	import { format } from 'date-fns';
	import { formatHashrate } from '$lib/utils/formatHashrate';
	export let data;

	$: data = data.map((d) => ({ ...d, date: new Date(d.date) }));
</script>

<div class="flex h-full w-full">
	<div class="flex w-full h-full">
		<Chart
			{data}
			x="date"
			xScale={scaleTime()}
			y="value"
			yDomain={[0, null]}
			yNice
			padding={{ top: 1, bottom: 1 }}
			tooltip={{ mode: 'voronoi' }}
			let:width
			let:height
			let:padding
			let:tooltip
		>
			<Svg>
				<LinearGradient class="from-primary/50 to-primary/0" vertical let:url>
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
				class="text-sm font-semibold text-primary bg-foreground leading-3 p-2 border border-base-100 border-l-4 border-l-primary rounded-e-md"
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
