import { Query, getDocs, query, where } from 'firebase/firestore';

import { photosCol, type Photo } from '$lib/db-schema';

import type { PageLoad } from './$types';

export const load = (async ({ url }) => {
	const searchQuery = url.searchParams.get('q');

	let queryRef: Query<Photo> = photosCol();

	if (searchQuery) {
		const tags =
			typeof searchQuery === 'string'
				? searchQuery
						.split('|')
						.map((str) => str.trim())
						.filter(Boolean)
				: [];

		if (tags.length > 0) {
			queryRef = query(photosCol(), where('tags', 'array-contains-any', tags));
		}
	}

	const photosSnap = await getDocs(queryRef);

	return {
		photosSnap,
	};
}) satisfies PageLoad;
