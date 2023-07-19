import { redirect } from '@sveltejs/kit';

import { constructLoginRedirectLink } from '$lib/auth/utils';
import { db } from '$lib/server/db';

import type { PageServerLoad } from './$types';

export const load = (async ({ parent, url, params }) => {
	const { userProfile } = await parent();

	if (!userProfile) throw redirect(302, constructLoginRedirectLink(url));

	const photoQuerySnap = await db.userPhotos(userProfile.uid).where('id', '==', params.photoId).get();

	return {
		photo: photoQuerySnap.docs[0]?.data(),
	};
}) satisfies PageServerLoad;
