import { redirect } from '@sveltejs/kit';
import { getDocs, query, where } from 'firebase/firestore';

import { photosCol } from '$lib/db-schema';
import type { TagRating } from '$lib/server/search';

import type { PageLoad } from './$types';

// Disabling `ssr` to take advantage of streaming Promises
export const ssr = false;

export const load = (async ({ url, fetch }) => {
	const searchQuery = url.searchParams.get('q');

	if (!searchQuery) {
		throw redirect(301, '/');
	}

	// TODO: Dumb search
	// const tags =
	// 	typeof searchQuery === 'string'
	// 		? searchQuery
	// 				.split('|')
	// 				.map((str) => str.trim())
	// 				.filter(Boolean)
	// 		: [];

	const searchResponse = fetch(`/api/search${url.search}`).then(async (res) => {
		const aiTags: TagRating[] = await res.json();

		if (aiTags.length === 0) return [];

		const queryRef = query(
			photosCol(),
			where(
				'tags',
				'array-contains-any',
				aiTags.map(({ tag }) => tag),
			),
		);

		const photosSnap = await getDocs(queryRef);

		return photosSnap.docs.map((snap) => snap.data());
	});

	return {
		streamed: {
			photos: searchResponse,
		},
	};
}) satisfies PageLoad;
