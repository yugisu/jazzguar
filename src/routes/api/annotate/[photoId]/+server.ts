import { error } from '@sveltejs/kit';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';

import { photosCol } from '$lib/db-schema.js';
import { generatePhotoTags } from '$lib/server/vision';

import type { RequestHandler } from './$types';

export const POST = (async ({ params }) => {
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
