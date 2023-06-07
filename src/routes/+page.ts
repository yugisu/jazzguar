import { photosCol } from '$lib/db-schema';

import { getDocs } from 'firebase/firestore';

/** @type {import('./$types').PageLoad} */
export async function load() {
	const photosSnap = await getDocs(photosCol());

	return {
		photosSnap,
	};
}
