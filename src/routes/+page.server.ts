import { db } from '$lib/server/db';

import type { PageServerLoad } from './$types';

export const load = (async ({ parent }) => {
	const { userProfile } = await parent();

	if (userProfile) {
		const userPhotosSnap = await db.userPhotos(userProfile.uid).get();

		return {
			userPhotos: userPhotosSnap.docs.map((snap) => snap.data()),
		};
	}

	return {};
}) satisfies PageServerLoad;
