import { getDocs } from 'firebase/firestore';

import { photosCol } from '$lib/db-schema';

/** @type {import('./$types').PageLoad} */
export async function load() {
	const photosSnap = await getDocs(photosCol());

	return {
		photosSnap,
	};
}
