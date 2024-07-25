<script lang="ts">
	import * as Tooltip from '$lib/components/ui/tooltip';
	export let content: string;
</script>

<Tooltip.Root>
	<Tooltip.Trigger><slot /></Tooltip.Trigger>
	<Tooltip.Content>
		<p>{content}</p>
	</Tooltip.Content>
</Tooltip.Root>
