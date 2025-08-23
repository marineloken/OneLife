<script>
	import { tick } from 'svelte';

	const { content, placement = 'top', children } = $props();

	let show = $state(false);

	/** @type {HTMLElement} */
	let wrapper;

	/** @type {HTMLElement} */
	let tooltip;

	let coords = $state({ top: 0, left: 0 });

	function updatePosition() {
		if (!tooltip) return;

		const wrapRect = wrapper.getBoundingClientRect();
		const tipRect = tooltip.getBoundingClientRect();

		// center horizontally by default
		let left = wrapRect.left + wrapRect.width / 2 - tipRect.width / 2;
		let top = wrapRect.top - tipRect.height - 8;

		if (placement === 'bottom') {
			top = wrapRect.bottom + 8;
		}
		if (placement === 'left') {
			left = wrapRect.left - tipRect.width - 8;
			top = wrapRect.top + wrapRect.height / 2 - tipRect.height / 2;
		}
		if (placement === 'right') {
			left = wrapRect.right + 8;
			top = wrapRect.top + wrapRect.height / 2 - tipRect.height / 2;
		}

		coords = { top: top + window.scrollY, left: left + window.scrollX };
	}

	function handleMouseEnter() {
		show = true;
		tick().then(updatePosition);
	}

	function handleMouseLeave() {
		show = false;
	}
</script>

{#if !content || !children}
	{@render children?.()}
{:else}
	<!-- Wrap target element -->
	<span
		class="relative cursor-help"
		bind:this={wrapper}
		on:mouseenter={handleMouseEnter}
		on:mouseleave={handleMouseLeave}
	>
		{@render children()}
	</span>

	{#if show}
		<!-- Tooltip itself, portaled to body to avoid overflow issues -->
		<div
			bind:this={tooltip}
			class="fixed rounded bg-gray-700 px-2 py-1 text-sm whitespace-nowrap text-white shadow-lg"
			style="top: {coords.top}px; left: {coords.left}px;"
		>
			{@render content()}
		</div>
	{/if}
{/if}
