<script>
	let options = [{ value: 'test', label: 'test' }];
	let selected = []; // array of values

	let open = false;

	function toggleDropdown() {
		open = !open;
	}

	function selectOption(value) {
		if (selected.includes(value)) {
			selected = selected.filter((v) => v !== value);
		} else {
			selected = [...selected, value];
		}
		// dispatch('change', { selected });
	}

	let dropdownRef;
	// onClickOutside(dropdownRef, () => open = false);
</script>

<div class="relative inline-block text-left" bind:this={dropdownRef}>
	<button
		type="button"
		class="inline-flex w-full justify-center rounded-md border border-gray-600 bg-gray-800 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none"
		on:click={toggleDropdown}
	>
		Filter Groups
		<svg
			class="-mr-1 ml-2 h-5 w-5"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
		</svg>
	</button>

	{#if open}
		<div
			class="ring-opacity-5 absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-800 shadow-lg ring-1 ring-black focus:outline-none"
		>
			<div class="max-h-60 overflow-auto py-1">
				{#each options as opt}
					<div
						class="flex cursor-pointer items-center px-4 py-2 text-sm text-white hover:bg-gray-700"
						on:click={() => selectOption(opt.value)}
					>
						<input
							type="checkbox"
							class="form-checkbox h-4 w-4 rounded border-gray-600 bg-gray-700 text-blue-500"
							checked={selected.includes(opt.value)}
							readonly
						/>
						<span class="ml-2">{opt.label}</span>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>
