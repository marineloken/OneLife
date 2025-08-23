<script>
	import { selected } from '$lib/state/selected.js';

	/** @type {{day: import("$lib/models/Routine.js").Day}} */
	const { day } = $props();
</script>

<div
	class="min-w-[300px] rounded-lg p-1 shadow-pink-900/50 outline-pink-900"
	onclick={() => selected.set(day)}
	class:outline-1={$selected === day}
	class:shadow-lg={$selected === day}
>
	<h2 class="cursor-pointer p-1" onclick={() => selected.set(day)}>{day.day}</h2>
	<div class="flex flex-col gap-5">
		{#each day.groups as group, i (i)}
			<div
				class="flex-shrink-0 cursor-pointer rounded-lg bg-gray-700 p-4 shadow-pink-700/50 outline-pink-700"
				onclick={(e) => {
					e.stopPropagation();
					selected.set(group);
				}}
				class:outline-1={$selected === group}
				class:shadow-lg={$selected === group}
			>
				<h2 class="mb-4 text-lg font-semibold text-white">{group.title}</h2>
				<div class="space-y-4">
					{#each group.routines as routine, i (i)}
						<div
							class="rounded-md bg-gray-600 p-3 shadow-pink-500/50 outline-pink-500"
							class:outline-1={$selected === routine}
							class:shadow-lg={$selected === routine}
							onclick={(e) => {
								e.stopPropagation();
								selected.set(routine);
							}}
						>
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
										class="rounded bg-gray-500 p-2 text-white shadow-pink-300/50 outline-pink-300"
										class:outline-1={$selected === step}
										class:shadow-lg={$selected === step}
										onclick={(e) => {
											e.stopPropagation();
											selected.set(step);
										}}
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
