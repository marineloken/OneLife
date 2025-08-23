import { writable } from 'svelte/store';
import { routines as _routines } from '$lib/placeholders/routines.js';
import jsonStorage from '$lib/placeholders/JsonStorage.js';

export function createRemoteArrayStore() {
	const { subscribe, set, update } = writable([]);

	let initialized = false;

	async function initialize() {
		try {
			let data = await jsonStorage.getJson();

			if (!Array.isArray(data) || data.length === 0) {
				data = _routines;
				await persist(data);
			}

			set(data);
			initialized = true;
		} catch (err) {
			console.error('Failed to initialize store:', err);
		}
	}

	async function persist(data) {
		try {
			await jsonStorage.setJson(data);
		} catch (err) {
			console.error('Failed to persist store:', err);
		}
	}

	const customSet = (value) => {
		set(value);
		persist(value);
	};

	const customUpdate = (updater) => {
		update((current) => {
			const updated = updater(current);
			persist(updated);
			return updated;
		});
	};

	// Kick off the initial fetch
	initialize();

	return {
		subscribe,
		set: customSet,
		update: customUpdate
	};
}

export const routines = createRemoteArrayStore();
