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
		{ shape: 'fill-red-600', content: 'text-yellow-500' }
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
			<Tooltip header={(d) => `${d.miner.slice(9, 13)}..${d.miner.slice(-4)}`} let:data>
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
