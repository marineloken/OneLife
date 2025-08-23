<script>
	/**
	 * Meter component showing a horizontal scroll of vertical meters.
	 * Expects data like: [{ label: 'CPU', value: 70 }, ...]
	 */
	const meters = [
		{ label: 'FFS', value: 100 },
		{ label: 'SRS', value: 90 },
		{ label: 'BA', value: 0 },
		{ label: 'BBL', value: 0 }
	];
</script>

<div class="overflow-x-auto py-4">
	<!-- Container with fixed height -->
	<div class="flex h-96 items-end space-x-4">
		{#each meters as meter}
			<div class="flex h-full w-12 shrink-0 flex-col items-center">
				<!-- Background track -->
				<div class="relative h-full w-full overflow-hidden rounded-lg bg-gray-700">
					<!-- Filled portion -->
					<div
						class="absolute bottom-0 w-full bg-pink-500 transition-all duration-300"
						style="height: {meter.value}%"
					></div>
				</div>
				<span class="mt-2 text-center text-sm text-gray-300">{meter.label}</span>
			</div>
		{/each}
	</div>
</div>
