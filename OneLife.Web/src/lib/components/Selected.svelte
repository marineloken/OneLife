<script>
	import { selected } from '$lib/state/selected';
</script>

{#if $selected}
	<div>{$selected.name}</div>
{/if}
