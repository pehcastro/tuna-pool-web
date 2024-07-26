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

	let dateSeriesData = [
		{
			date: '2024-06-26T03:00:00.000Z',
			value: 86
		},
		{
			date: '2024-06-27T03:00:00.000Z',
			value: 53
		},
		{
			date: '2024-06-28T03:00:00.000Z',
			value: 93
		},
		{
			date: '2024-06-29T03:00:00.000Z',
			value: 67
		},
		{
			date: '2024-06-30T03:00:00.000Z',
			value: 87
		},
		{
			date: '2024-07-01T03:00:00.000Z',
			value: 95
		},
		{
			date: '2024-07-02T03:00:00.000Z',
			value: 58
		},
		{
			date: '2024-07-03T03:00:00.000Z',
			value: 67
		},
		{
			date: '2024-07-04T03:00:00.000Z',
			value: 100
		},
		{
			date: '2024-07-05T03:00:00.000Z',
			value: 89
		},
		{
			date: '2024-07-06T03:00:00.000Z',
			value: 100
		},
		{
			date: '2024-07-07T03:00:00.000Z',
			value: 55
		},
		{
			date: '2024-07-08T03:00:00.000Z',
			value: 94
		},
		{
			date: '2024-07-09T03:00:00.000Z',
			value: 53
		},
		{
			date: '2024-07-10T03:00:00.000Z',
			value: 67
		},
		{
			date: '2024-07-11T03:00:00.000Z',
			value: 87
		},
		{
			date: '2024-07-12T03:00:00.000Z',
			value: 66
		},
		{
			date: '2024-07-13T03:00:00.000Z',
			value: 82
		},
		{
			date: '2024-07-14T03:00:00.000Z',
			value: 80
		},
		{
			date: '2024-07-15T03:00:00.000Z',
			value: 60
		},
		{
			date: '2024-07-16T03:00:00.000Z',
			value: 62
		},
		{
			date: '2024-07-17T03:00:00.000Z',
			value: 53
		},
		{
			date: '2024-07-18T03:00:00.000Z',
			value: 96
		},
		{
			date: '2024-07-19T03:00:00.000Z',
			value: 60
		},
		{
			date: '2024-07-20T03:00:00.000Z',
			value: 52
		},
		{
			date: '2024-07-21T03:00:00.000Z',
			value: 95
		},
		{
			date: '2024-07-22T03:00:00.000Z',
			value: 95
		},
		{
			date: '2024-07-23T03:00:00.000Z',
			value: 79
		},
		{
			date: '2024-07-24T03:00:00.000Z',
			value: 96
		},
		{
			date: '2024-07-25T03:00:00.000Z',
			value: 92
		}
	];

	function convertToHashrate(data) {
		const MHHashrate = data / 1e6;
		return MHHashrate;
	}

	$: data = data.map((d) => ({ ...d, date: new Date(d.label), value: convertToHashrate(d.data) }));

	$: slicedData = data.slice(0, 10);

	$: console.log('dateSeriesData', dateSeriesData);
	$: console.log('data', data);

	$: slicedData = slicedData.map((d) => ({ ...d, value: Number(d.value) }));

	$: console.log('sliced data', slicedData);
</script>

<div class="flex h-full w-full">
	<div class="flex w-full h-full]">
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
				<LinearGradient class="from-primary/50 to-primary/0" vertical let:url>
					<Area line={{ class: 'stroke-2 stroke-primary opacity-20' }} fill={url} />
					<RectClipPath x={0} y={0} width={tooltip.data ? tooltip.x : width} {height} spring>
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
				class="text-sm font-semibold bg-primary text-white leading-3 px-2 py-1 rounded whitespace-nowrap"
				let:data
			>
				{format(data.date, 'yyyy-MM-dd')}
			</Tooltip>
		</Chart>
	</div>
</div>
