<script>
	import MultiSelect from '$lib/components/MultiSelect.svelte';
	import { routines } from '$lib/placeholders/routines.js';
	import Dialog from '$lib/components/Dialog.svelte';

	/**
	 * Edit/Form component with horizontally scrollable columns.
	 * @type {import('$lib/models/Routine.js').Day[]} */
	const days = routines;

	/** @type {{routine: import('$lib/models/Routine.js').Routine; step: import('$lib/models/Routine.js').RoutineStep;} | null} */
	let step = $state(null);

	function select(r, s) {
		step = { routine: r, step: s };
	}

	function prevItem() {
		if (!step) return;
		const index = step.routine.steps.indexOf(step.step);
		select(step.routine, step.routine.steps[index - 1]);
	}

	function nextItem() {
		if (!step) return;
		const index = step.routine.steps.indexOf(step.step);
		select(step.routine, step.routine.steps[index + 1]);
	}

	const [hasPrev, hasNext] = $derived(getHas(step));

	function getHas(step) {
		if (!step) return [false, false];
		const index = step.routine.steps.indexOf(step.step);
		return [index > 0, index < step.routine.steps.length - 1];
	}
</script>

<div class="relative">
	<div class="absolute top-0 right-0">
		<MultiSelect />
	</div>

	<div class="overflow-x-auto overflow-y-auto rounded-2xl bg-gray-800 p-4 shadow-md">
		<div class="flex space-x-6">
			{#each days.filter((d) => d.groups.some((r) => r.title !== 'Morning Workout')) as day, i (i)}
				<div class="min-w-[300px]">
					<h2 class="p-1">{day.day}</h2>
					<div class="flex flex-col gap-5">
						{#each day.groups as group, i (i)}
							<div class="flex-shrink-0 rounded-lg bg-gray-700 p-4">
								<h2 class="mb-4 text-lg font-semibold text-white">{group.title}</h2>
								<div class="space-y-4">
									{#each group.routines as routine, i (i)}
										<div class="rounded-md bg-gray-600 p-3">
											<h3 class="mb-2 text-sm font-medium text-gray-200">{routine.name}</h3>
											<div class="flex gap-2">
												{#if routine.effectiveness}
													{routine.effectiveness}
												{/if}
												{#if routine.happiness}
													{routine.happiness}
												{/if}
											</div>
											<div class="space-y-2">
												{#each routine.steps as step, i (i)}
													<div
														class="rounded bg-gray-500 p-2 text-white"
														onclick={() => select(routine, step)}
													>
														{step.name}
														<div class="flex gap-2">
															{#if step.effectiveness}
																{step.effectiveness}
															{/if}
															{#if step.happiness}
																{step.happiness}
															{/if}
														</div>
													</div>
												{/each}
											</div>
										</div>
									{/each}
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<Dialog open={!!step} onClose={() => (step = null)}>
	<div class="dark min-h-screen bg-gray-900 p-6 text-gray-100">
		<!-- Header + Nav -->
		<div class="mb-8 grid grid-cols-1 items-center gap-4 md:grid-cols-3">
			<div class="md:col-span-2">
				<h1 class="text-3xl font-bold">{step?.step?.name}</h1>
				<p class="text-sm text-gray-400 uppercase">{step?.routine?.name}</p>
			</div>
			<div class="flex justify-start space-x-2 md:justify-end">
				<button
					onclick={prevItem}
					disabled={!hasPrev}
					class="rounded-lg bg-gray-800 px-4 py-2 transition hover:bg-gray-700 disabled:opacity-50"
				>
					← Prev
				</button>
				<button
					onclick={nextItem}
					disabled={!hasNext}
					class="rounded-lg bg-gray-800 px-4 py-2 transition hover:bg-gray-700 disabled:opacity-50"
				>
					Next →
				</button>
			</div>
		</div>

		<!-- Main Grid -->
		<div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
			<!-- Notes -->
			<div class="rounded-lg bg-gray-800 p-4">
				<h2 class="mb-2 text-2xl font-semibold">Notes</h2>
				<p class="whitespace-pre-line">{step?.step?.note}</p>
			</div>

			<!-- Steps -->
			<div class="rounded-lg bg-gray-800 p-4">
				<h2 class="mb-2 text-2xl font-semibold">Steps</h2>
				<ol class="list-inside list-decimal space-y-1">
					{#each step?.step?.steps ?? [] as str, i (i)}
						<li>{str}</li>
					{/each}
				</ol>
			</div>

			<!-- Tutorials -->
			<div class="rounded-lg bg-gray-800 p-4">
				<h2 class="mb-2 text-2xl font-semibold">Tutorials</h2>
				<ul class="list-inside list-disc space-y-1">
					{#each step?.step?.steps ?? [] as link, i (i)}
						<li>
							<a href={link} target="_blank" rel="noopener" class="text-blue-400 hover:underline">
								{link}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<!-- Product Section spans full width -->
		<div class="mt-8 rounded-2xl bg-gray-800 p-6 shadow-lg">
			<h2 class="mb-2 text-2xl font-semibold">Product</h2>
			<div class="grid grid-cols-1 items-center gap-6 md:grid-cols-4">
				<img
					src="https://lyko.com/globalassets/product-images/elixir-cosmeceuticals-face-formula-clear-collection-sos-paste-30ml-2143-188-0030_1.jpg?ref=AE7C8A43ED&w=1200&h=952&quality=75"
					alt="Lyko"
					class="col-span-1 h-auto w-full rounded-lg object-cover"
				/>

				<div class="col-span-2 space-y-2">
					<h3 class="text-xl font-semibold">Lyko</h3>
					<p>Cost: <span class="font-medium">${(720).toFixed(2)}</span></p>
					<p class="text-sm text-gray-400">
						≈ <span class="font-medium">${(240).toFixed(2)}</span>/mo
					</p>

					<!-- Feedback Buttons Grid -->
					<div class="mt-4 grid grid-cols-2 gap-2">
						<button class="rounded-lg bg-green-600 px-3 py-1 hover:bg-green-500">
							📈 Effective
						</button>
						<button class="rounded-lg bg-red-600 px-3 py-1 hover:bg-red-500">
							📉 Ineffective
						</button>
					</div>
					<div class="mt-4 grid grid-cols-2 gap-2">
						<button class="rounded-lg bg-pink-600 px-3 py-1 hover:bg-pink-500"> 😊 Happy </button>
						<button class="rounded-lg bg-orange-600 px-3 py-1 hover:bg-orange-500">
							🥲 Dissatisfied
						</button>
					</div>
				</div>

				<div class="grid grid-cols-1 items-center gap-6 md:grid-cols-4">
					<h3 class="mb-2 text-2xl font-semibold">Considered replaced with</h3>
					<img
						src="https://lyko.com/globalassets/product-images/elixir-cosmeceuticals-face-formula-clear-collection-sos-paste-30ml-2143-188-0030_1.jpg?ref=AE7C8A43ED&w=1200&h=952&quality=75"
						alt="Lyko"
						class="col-span-1 h-auto w-full rounded-lg object-cover"
					/>
					<div class="col-span-2 space-y-2">
						<h3 class="text-xl font-semibold">Lyko</h3>
						<p>Cost: <span class="font-medium">${(720).toFixed(2)}</span></p>
						<p class="text-sm text-gray-400">
							≈ <span class="font-medium">${(240).toFixed(2)}</span>/mo
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</Dialog>
