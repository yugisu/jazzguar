import { json } from '@sveltejs/kit';
import { getDocs } from 'firebase/firestore';

import { photosCol } from '$lib/db-schema';
import { searchTagsByQuery } from '$lib/server/search';

import type { RequestHandler } from './$types';

export const GET = (async ({ url }) => {
	// TODO: Add logs

	const searchQuery = url.searchParams.get('q');

	if (!searchQuery) {
		return json([]);
	}

	const allPhots = await getDocs(photosCol());

	const allTags = allPhots.docs.reduce((set: Set<string>, photo) => {
		photo.data().tags.forEach((tag) => set.add(tag));
		return set;
	}, new Set<string>());

	const aiTags = await searchTagsByQuery(searchQuery, [...allTags.values()]);

	return json(aiTags);
}) satisfies RequestHandler;
