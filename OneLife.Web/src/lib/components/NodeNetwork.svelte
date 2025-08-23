<script>
	import { onMount } from 'svelte';
	import * as d3 from 'd3';

	let svgEl;
	let containerEl;
	const width = 800;
	const height = 500;

	// sample data
	const nodes = [{ id: 'Col 1' }, { id: 'Col 2' }, { id: 'Col 3' }, { id: 'Col 4' }];

	const links = [
		{ source: 'Col 1', target: 'Col 2' },
		{ source: 'Col 2', target: 'Col 3' },
		{ source: 'Col 3', target: 'Col 4' }
	];

	onMount(() => {
		// assign initial row positions
		nodes.forEach((d, i) => {
			d.x = (i + 1) * (width / (nodes.length + 1));
			d.y = height / 2;
		});

		const svg = d3
			.select(svgEl)
			.attr('viewBox', [0, 0, width, height])
			.call(
				d3
					.zoom()
					.scaleExtent([0.5, 5])
					.on('zoom', ({ transform }) => {
						container.attr('transform', transform);
					})
			);

		// group for all zoomable elements
		const container = svg.select('g');

		// draw links
		const link = container.select('#link').selectAll('line').data(links);

		const fo = container.select('#fo').selectAll('foreignObject').data(nodes);

		// create simulation with row-forcing
		const simulation = d3
			.forceSimulation(nodes)
			.force(
				'link',
				d3
					.forceLink(links)
					.id((d) => d.id)
					.distance(150)
			)
			.force('charge', d3.forceManyBody().strength(-300))
			.force('x', d3.forceX((d, i) => (i + 1) * (width / (nodes.length + 1))).strength(1))
			.force('y', d3.forceY(height / 2).strength(1))
			.alpha(1)
			.on('tick', () => {
				link
					.attr('x1', (d) => d.source.x)
					.attr('y1', (d) => d.source.y)
					.attr('x2', (d) => d.target.x)
					.attr('y2', (d) => d.target.y);

				container
					.selectAll('foreignObject')
					.attr('x', (d) => d.x - 50)
					.attr('y', (d) => d.y - 25);
			});

		// drag behavior
		fo.call(
			d3
				.drag()
				.on('start', (event, d) => {
					if (!event.active) simulation.alphaTarget(0.3).restart();
					d.fx = d.x;
					d.fy = d.y;
				})
				.on('drag', (event, d) => {
					d.fx = event.x;
					d.fy = event.y;
				})
				.on('end', (event, d) => {
					if (!event.active) simulation.alphaTarget(0);
					d.fx = null;
					d.fy = null;
				})
		);

		return () => simulation?.destroy();
	});
</script>

<svg bind:this={svgEl}>
	<defs>
		<pattern
			id="grid"
			width="20"
			height="20"
			patternTransform="translate(5, 5)"
			patternUnits="userSpaceOnUse"
		>
			<path d="M20 0 L0 0 0 20" fill="none" stroke="#2c2c2c" stroke-width="0.5" />
		</pattern>
	</defs>

	<rect {width} {height} fill="url(#grid)" />

	<g bind:this={containerEl}>
		<g id="link">
			{#each links as link, i (i)}
				<line stroke-width="2" stroke="#ff0000" stroke-opacity="0.6" />
			{/each}
		</g>
		<g id="fo">
			{#each nodes as node, i (i)}
				<foreignObject height="50" width="100">
					<div class="html-node">
						{node.id}
					</div>
				</foreignObject>
			{/each}
		</g>
	</g>
</svg>

<style>
</style>
