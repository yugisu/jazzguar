import { getDocs } from 'firebase/firestore';

import { photosCol } from '$lib/db-schema';

import type { PageLoad } from './$types';

export const load = (async () => {
	const photosSnap = await getDocs(photosCol());

	return {
		photosSnap,
	};
}) satisfies PageLoad;
