import { error, json } from '@sveltejs/kit';

import { db } from '$lib/server/db';

import type { RequestHandler } from './$types';
import { getRelevantTags } from './search.server';

export const GET = (async ({ url, locals }) => {
	// TODO: Add logs

	if (!locals.userProfile) throw error(401, 'Unauthenticated');

	const searchQuery = url.searchParams.get('q');

	if (!searchQuery) {
		return json([]);
	}

	const userPhotos = await db.userPhotos(locals.userProfile.uid).get();

	const allTags = userPhotos.docs.reduce((set: Set<string>, photo) => {
		photo.data().tags.forEach((tag) => set.add(tag));
		return set;
	}, new Set<string>());

	const aiTags = await getRelevantTags(searchQuery, [...allTags.values()]);

	return json(aiTags);
}) satisfies RequestHandler;
