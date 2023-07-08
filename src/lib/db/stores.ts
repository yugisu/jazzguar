import { onSnapshot } from 'firebase/firestore';
import type { Query } from 'firebase/firestore';
import { readable, type Readable } from 'svelte/store';

import { browser } from '$app/environment';

export function collectionStore<T>(ref: Query<T> | null | undefined): Readable<T[] | undefined>;
export function collectionStore<T>(ref: Query<T> | null | undefined, startWith: T[]): Readable<T[]>;
export function collectionStore<T>(ref: Query<T> | null | undefined, startWith?: T[] | undefined) {
	if (!browser || !ref) {
		const { subscribe } = readable(startWith);

		return { subscribe };
	}

	const { subscribe } = readable(startWith, (set) => {
		const unsubscribe = onSnapshot(ref, (snapshot) => {
			const userPhotos = snapshot.docs.map((snap) => snap.data());
			set(userPhotos);
		});

		return () => unsubscribe();
	});

	return { subscribe };
}
