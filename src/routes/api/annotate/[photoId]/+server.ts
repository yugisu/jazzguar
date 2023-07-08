import { error } from '@sveltejs/kit';
import { FieldValue } from 'firebase-admin/firestore';

import { db } from '$lib/server/db';

import type { RequestHandler } from './$types';
import { generatePhotoTags } from './vision.server';

export const POST = (async ({ params, locals }) => {
	// TODO: Add logs

	if (!locals.userProfile) throw error(401, 'Unauthenticated');

	const photoRef = db.photosRef.doc(params.photoId);

	const photo = (await photoRef.get()).data();

	if (!photo || !(photo.uploadedById === locals.userProfile.uid)) {
		throw error(404, 'Photo not found');
	}

	const tags = await generatePhotoTags(photo.srcOptimized || photo.src);

	if (tags) {
		await photoRef.set({ tags: FieldValue.arrayUnion(...tags) }, { merge: true });
	}

	return new Response(null, { status: 204 });
}) satisfies RequestHandler;
