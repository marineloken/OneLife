<script>
	import Meters from '$lib/components/Meters.svelte';
	import Calendar from '$lib/components/Calendar.svelte';
	import Routine from '$lib/components/Routine.svelte';
	import Notes from '$lib/components/Notes.svelte';
	import { routines } from '$lib/state/routines.js';
	import Node from '$lib/components/Node.svelte';
	import Selected from '$lib/components/Selected.svelte';
	import NodeNetwork from '$lib/components/NodeNetwork.svelte';

	// Placeholder for zoom/pan logic
	let scale = $state(1);
	let translate = $state({ x: 0, y: 0 });
	let isPanning = $state(false);
	let panStart = $state({ x: 0, y: 0 });

	function onWheel(event) {
		event.preventDefault();
		const rect = event.currentTarget.getBoundingClientRect();
		const offsetX = event.clientX - rect.left;
		const offsetY = event.clientY - rect.top;
		// Coordinates relative to content
		const x = (offsetX - translate.x) / scale;
		const y = (offsetY - translate.y) / scale;
		// Zoom factor
		const delta = -event.deltaY * 0.001;
		const newScale = Math.min(Math.max(scale + delta, 0.5), 3);
		// Adjust translate to zoom towards cursor
		translate.x -= x * (newScale - scale);
		translate.y -= y * (newScale - scale);
		scale = newScale;
	}

	function onMouseDownCanvas(event) {
		isPanning = true;
		panStart = { x: event.clientX - translate.x, y: event.clientY - translate.y };
	}

	function onMouseMoveCanvas(event) {
		if (!isPanning) return;
		translate.x = event.clientX - panStart.x;
		translate.y = event.clientY - panStart.y;
	}

	function onMouseUpCanvas() {
		isPanning = false;
	}

	// Sample nodes (distributed via flexbox)
	let nodes = $state(Array.from({ length: 6 }, (_, i) => ({ id: i + 1 })));
</script>

<!-- Main Content (fills viewport minus header) -->
<div class="flex h-[calc(100vh-5rem)] overflow-hidden">
	<!-- Left Panel -->
	<aside class="custom-scrollbar w-[504px] overflow-y-auto bg-gray-900 p-4">
		<Selected />
	</aside>

	<!-- Zoomable/Pannable Node Network with Grid -->
	<main class="relative flex-1 cursor-grab bg-black">
		<NodeNetwork />
	</main>
	<!--	<main-->
	<!--		class="relative flex-1 cursor-grab bg-black"-->
	<!--		onwheel={onWheel}-->
	<!--		onmousedown={onMouseDownCanvas}-->
	<!--		onmousemove={onMouseMoveCanvas}-->
	<!--		onmouseup={onMouseUpCanvas}-->
	<!--		onmouseleave={onMouseUpCanvas}-->
	<!--	>-->
	<!--		<div-->
	<!--			class="grid-bg absolute top-0 left-0 h-full w-full"-->
	<!--			style="transform: translate({translate.x}px, {translate.y}px) scale({scale}); transform-origin: 0 0;"-->
	<!--		>-->
	<!--			<div class="flex h-full w-full flex-wrap items-center justify-center gap-4 p-8">-->
	<!--				{#each $routines as node, i (i)}-->
	<!--					<Node day={node} />-->
	<!--				{/each}-->
	<!--			</div>-->
	<!--		</div>-->
	<!--	</main>-->
</div>

<!--&lt;!&ndash; Main Content &ndash;&gt;-->
<!--<main class="container mx-auto mt-5 grid grid-cols-1 gap-6 p-2 md:grid-cols-2 lg:grid-cols-3">-->
<!--	&lt;!&ndash; Edit/Form Card &ndash;&gt;-->
<!--	<section class="rounded-2xl bg-gray-800 p-6 shadow-lg lg:col-span-3">-->
<!--		<Routine />-->
<!--	</section>-->

<!--	&lt;!&ndash; Meter Card &ndash;&gt;-->
<!--	<section class="flex flex-col justify-end rounded-2xl bg-gray-800 p-6 shadow-lg">-->
<!--		<Meters />-->
<!--	</section>-->

<!--	&lt;!&ndash; Calendar Card &ndash;&gt;-->
<!--	<section class="rounded-2xl bg-gray-800 p-6 shadow-lg">-->
<!--		<Calendar />-->
<!--	</section>-->

<!--	&lt;!&ndash; Notes Card &ndash;&gt;-->
<!--	<section class="rounded-2xl bg-gray-800 p-6 shadow-lg">-->
<!--		<Notes />-->
<!--	</section>-->
<!--</main>-->

<style>
	/* Gridlines for the network background */
	.grid-bg {
		background-image:
			linear-gradient(#232325 1px, transparent 1px),
			linear-gradient(90deg, #232325 1px, transparent 1px);
		background-size: 40px 40px;
	}
</style>
