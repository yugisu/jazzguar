import { getDocs } from 'firebase/firestore';

import DefaultUnauthenticatedView from '$lib/components/DefaultUnauthenticatedView.svelte';
import { photosCol } from '$lib/db/types';

export const load = async () => {
	const photosSnap = await getDocs(photosCol());

	return {
		photosSnap,
		unauthenticatedView: DefaultUnauthenticatedView,
	};
};
