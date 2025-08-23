<script>
	let { open = false, children, onClose } = $props();

	function onBackdropClick(e) {
		if (e.target === e.currentTarget) open = false;
	}

	$effect(() => {
		if (!open) onClose?.();
	});
</script>

{#if open}
	<!-- Backdrop -->
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs"
		onclick={onBackdropClick}
	>
		<!-- Modal Container -->
		<div class="relative mx-4 w-full rounded-2xl bg-gray-800 p-6 shadow-xl">
			<!-- Close Button -->
			<button
				class="absolute top-3 right-3 text-gray-400 hover:text-white"
				onclick={() => (open = false)}
				aria-label="Close modal"
			>
				&times;
			</button>

			<!-- Modal Content -->
			{@render children?.()}
		</div>
	</div>
{/if}
