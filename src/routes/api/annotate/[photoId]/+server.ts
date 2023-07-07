import { error } from '@sveltejs/kit';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';

import { photosCol } from '$lib/db/types.js';

import type { RequestHandler } from './$types';
import { generatePhotoTags } from './vision.server';

export const POST = (async ({ params }) => {
	// TODO: Add logs

	const { photoId } = params;

	const photoRef = doc(photosCol(), photoId);

	const photo = (await getDoc(photoRef)).data();

	if (!photo || !(photo.srcOptimized || photo.src)) throw error(404, 'Photo not found');

	const tags = await generatePhotoTags(photo);

	if (tags) {
		await updateDoc(photoRef, {
			tags: arrayUnion(...tags),
		});
	}

	return new Response(null, { status: 204 });
}) satisfies RequestHandler;
