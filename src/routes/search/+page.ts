import { redirect } from '@sveltejs/kit';
import { getDocs, query, where } from 'firebase/firestore';

import DefaultUnauthenticatedView from '$lib/components/DefaultUnauthenticatedView.svelte';

import { photosForUser, type Photo } from '$lib/db/types';

import type { TagRating } from '../api/search/search.server';

import type { PageLoad } from './$types';

// Disabling `ssr` to take advantage of streaming Promises
export const ssr = false;

export const load = (async ({ url, fetch, parent }) => {
	const { userProfile } = await parent();
	if (!userProfile) throw new Error('Unauthenticated');

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

	const searchResults = fetch(`/api/search${url.search}`).then(async (res) => {
		if (!res.ok) throw new Error(`${res.status}: ${res.statusText}, "${await res.text()}"`);

		const aiTags: TagRating[] = await res.json();

		if (aiTags.length === 0)
			return {
				photos: [] as Photo[],
				relevantTags: {},
			};

		const tagMap = aiTags.reduce<Record<string, number>>((acc, { tag, rating }) => ((acc[tag] = rating), acc), {});

		const queryRef = query(
			photosForUser(userProfile.uid),
			where(
				'tags',
				'array-contains-any',
				aiTags.map(({ tag }) => tag),
			),
		);

		const photosSnap = await getDocs(queryRef);

		return {
			photos: photosSnap.docs.map((snap) => snap.data()),
			relevantTags: tagMap,
		};
	});

	return {
		streamed: {
			searchResults,
		},
		unauthenticatedView: DefaultUnauthenticatedView,
	};
}) satisfies PageLoad;
