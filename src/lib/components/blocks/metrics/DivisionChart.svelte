<script lang="ts">
	import { Arc, Chart, Group, Pie, Svg, Text, Tooltip, TooltipItem } from 'layerchart';
	import { scaleOrdinal } from 'd3-scale';
	import { sum } from 'd3-array';
	import { formatHashrate } from '$lib/utils/formatHashrate';

	export let data;

	$: console.log('prod debug: miners', data);
	$: dataSum = sum(data, (d) => d.hashrate);

	const colorKeys = [...new Set(data.map((d) => d.miner))];

	const keyColors = ['fill-blue-500', 'fill-green-500', 'fill-yellow-500', 'fill-red-500'];
	const keyClasses = [
		{ shape: 'fill-primary', content: 'text-blue-500' },
		{ shape: 'fill-purple-800', content: 'text-green-500' },
		{ shape: 'fill-accent', content: 'text-yellow-500' },
		{ shape: 'fill-blue-500', content: 'text-red-500' },
		{ shape: 'fill-orange-500', content: 'text-blue-500' },
		{ shape: 'fill-secondary', content: 'text-green-500' },
		{ shape: 'fill-red-600', content: 'text-yellow-500' },
		{ shape: 'fill-teal-500', content: 'text-pink-500' },
		{ shape: 'fill-indigo-500', content: 'text-orange-500' },
		{ shape: 'fill-yellow-600', content: 'text-purple-500' },
		{ shape: 'fill-pink-500', content: 'text-teal-500' },
		{ shape: 'fill-green-600', content: 'text-indigo-500' },
		{ shape: 'fill-gray-500', content: 'text-lime-500' },
		{ shape: 'fill-lime-500', content: 'text-gray-500' },
		{ shape: 'fill-cyan-500', content: 'text-amber-500' },
		{ shape: 'fill-amber-500', content: 'text-cyan-500' },
		{ shape: 'fill-light-blue-500', content: 'text-light-green-500' },
		{ shape: 'fill-light-green-500', content: 'text-light-blue-500' },
		{ shape: 'fill-deep-orange-500', content: 'text-deep-purple-500' },
		{ shape: 'fill-deep-purple-500', content: 'text-deep-orange-500' },
		{ shape: 'fill-brown-500', content: 'text-blue-gray-500' },
		{ shape: 'fill-blue-gray-500', content: 'text-brown-500' },
		{ shape: 'fill-amber-600', content: 'text-cyan-600' },
		{ shape: 'fill-cyan-600', content: 'text-amber-600' },
		{ shape: 'fill-light-blue-600', content: 'text-light-green-600' },
		{ shape: 'fill-light-green-600', content: 'text-light-blue-600' },
		{ shape: 'fill-deep-orange-600', content: 'text-deep-purple-600' },
		{ shape: 'fill-deep-purple-600', content: 'text-deep-orange-600' },
		{ shape: 'fill-brown-600', content: 'text-blue-gray-600' },
		{ shape: 'fill-blue-gray-600', content: 'text-brown-600' },
		{ shape: 'fill-amber-700', content: 'text-cyan-700' },
		{ shape: 'fill-cyan-700', content: 'text-amber-700' },
		{ shape: 'fill-light-blue-700', content: 'text-light-green-700' },
		{ shape: 'fill-light-green-700', content: 'text-light-blue-700' },
		{ shape: 'fill-deep-orange-700', content: 'text-deep-purple-700' },
		{ shape: 'fill-deep-purple-700', content: 'text-deep-orange-700' },
		{ shape: 'fill-brown-700', content: 'text-blue-gray-700' },
		{ shape: 'fill-blue-gray-700', content: 'text-brown-700' }
	];

	const percentageFormatter = new Intl.NumberFormat('en-US', {
		style: 'percent',
		minimumFractionDigits: 2
	});
</script>

<div class="flex h-full w-full flex-col">
	<div class="flex w-full h-full p-10">
		<Chart
			{data}
			x="hashrate"
			r="miner"
			rScale={scaleOrdinal()}
			rDomain={colorKeys}
			rRange={keyColors}
			let:tooltip
		>
			<Svg>
				<Pie let:arcs>
					{#each arcs as arc, index}
						{@const colors = keyClasses[index] || { shape: '', content: '' }}
						{@const isHighlighted = tooltip.data?.miner === arc.data.miner}
						{@const isFaded = tooltip.data != null && tooltip.data.miner !== arc.data.miner}
						<Group
							on:pointerenter={(e) => tooltip?.show(e, arc.data)}
							on:pointermove={(e) => tooltip?.show(e, arc.data)}
							on:pointerleave={(e) => tooltip?.hide()}
							preventTouchMove
							class=""
						>
							<Arc
								startAngle={arc.startAngle}
								endAngle={arc.endAngle}
								padAngle={arc.padAngle}
								class={colors.shape}
								_offset={isHighlighted ? 16 : 0}
								let:centroid
							>
								<Text
									value={isNaN(arc.data.hashrate) || isNaN(dataSum)
										? ''
										: percentageFormatter.format(arc.data.hashrate / dataSum)}
									x={centroid[0]}
									y={centroid[1]}
									textAnchor="middle"
									verticalAnchor="middle"
									class="text-foreground text-sm"
								/>
							</Arc>
						</Group>
					{/each}
				</Pie>
			</Svg>
			<Tooltip header={(d) => `${d.miner.slice(5, 13)}..${d.miner.slice(-4)}`} let:data>
				<TooltipItem
					label="hashrate"
					value={formatHashrate(data.hashrate).rate + formatHashrate(data.hashrate).denomination}
					valueAlign="right"
				/>
				<TooltipItem
					label="percent"
					value={data.hashrate / dataSum}
					format="percent"
					valueAlign="right"
				/>
			</Tooltip>
		</Chart>
	</div>
</div>
