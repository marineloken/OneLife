class JsonStorage {
	constructor({ dbName = 'json-db', storeName = 'json-store', recordKey = 'data' } = {}) {
		this.dbName = dbName;
		this.storeName = storeName;
		this.recordKey = recordKey;
		this._dbp = null;
	}

	// internal: open (or upgrade) the DB and create an object store
	_init() {
		if (this._dbp) return this._dbp;
		this._dbp = new Promise((resolve, reject) => {
			const req = indexedDB.open(this.dbName, 1);
			req.onupgradeneeded = () => {
				const db = req.result;
				if (!db.objectStoreNames.contains(this.storeName)) {
					db.createObjectStore(this.storeName);
				}
			};
			req.onsuccess = () => resolve(req.result);
			req.onerror = () => reject(req.error);
		});
		return this._dbp;
	}

	// fetch the stored JSON (or null if none)
	async getJson() {
		const db = await this._init();
		return new Promise((resolve, reject) => {
			const tx = db.transaction(this.storeName, 'readonly');
			const store = tx.objectStore(this.storeName);
			const req = store.get(this.recordKey);
			req.onsuccess = () => resolve(req.result ?? null);
			req.onerror = () => reject(req.error);
		});
	}

	// overwrite with a new JS value (object/array/etc)
	async setJson(obj) {
		const db = await this._init();
		return new Promise((resolve, reject) => {
			const tx = db.transaction(this.storeName, 'readwrite');
			const store = tx.objectStore(this.storeName);
			const req = store.put(obj, this.recordKey);
			req.onsuccess = () => resolve();
			req.onerror = () => reject(req.error);
		});
	}
}

// Export a singleton instance:
export default new JsonStorage();
