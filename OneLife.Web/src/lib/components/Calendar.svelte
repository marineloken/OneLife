<script>
	import { onDestroy, onMount } from 'svelte';

	let date = new Date();

	/** @type {HTMLDivElement} */
	let container;

	let now = new Date();

	let timer = 0;

	// Update current time every minute
	onMount(() => {
		timer = setInterval(() => {
			now = new Date();
		}, 1000);
		// initial scroll
		setTimeout(scrollToNow, 0);
	});

	onDestroy(() => {
		clearInterval(timer);
	});

	function scrollToNow() {
		if (now.toDateString() !== date.toDateString()) return;
		const hours = now.getHours() + now.getMinutes() / 60;
		const totalHeight = container.scrollHeight - container.clientHeight;
		const scrollY = (hours / 24) * totalHeight;
		container.scrollTo({ top: scrollY, behavior: 'smooth' });
	}

	function prevDay() {
		date = new Date(date);
		date.setDate(date.getDate() - 1);
		scrollToNow();
	}

	function nextDay() {
		date = new Date(date);
		date.setDate(date.getDate() + 1);
		scrollToNow();
	}

	// Compute position of current time line
	$: linePos = ((now.getHours() + now.getMinutes() / 60) / 24) * 2400;
	$: isToday = now.toDateString() === date.toDateString();
</script>

<div class="overflow-hidden rounded bg-gray-800 shadow-md">
	<!-- Header controls -->
	<div class="flex items-center justify-between bg-gray-900 p-4">
		<button on:click={prevDay} class="text-gray-300 hover:text-white">Prev</button>
		<div class="font-semibold text-white">{date.toDateString()}</div>
		<button on:click={nextDay} class="text-gray-300 hover:text-white">Next</button>
	</div>

	<!-- Scrollable timeline -->
	<div bind:this={container} class="relative h-96 overflow-y-auto">
		<!-- Relative parent for ticks -->
		<div class="relative" style="height: 2400px;">
			{#each Array(25) as _, i}
				<div
					class="absolute left-0 w-full border-t border-gray-700"
					style="top: {i * 100}px;"
				></div>
			{/each}

			{#each Array(25) as _, i}
				<span class="absolute left-0 w-full text-sm text-gray-400" style="top: {i * 100}px;">
					{i}:00
				</span>
			{/each}

			{#if isToday}
				<!-- Current time indicator -->
				<div
					class="absolute left-0 w-full border-t border-dotted border-pink-500"
					style="top: {linePos}px;"
				>
					<span class="absolute -mt-2 rounded bg-pink-500 px-1 text-xs"
						>{now.getHours().toString().padStart(2, '0')}:{now
							.getMinutes()
							.toString()
							.padStart(2, '0')}:{now.getSeconds().toString().padStart(2, '0')}</span
					>
				</div>
			{/if}

			<!-- Event slots go here -->
			<slot />
		</div>
	</div>
</div>
