import { redirect } from '@sveltejs/kit';

import { constructLoginRedirectLink } from '$lib/auth/utils.js';

import type { PageLoad } from './$types';

export const load = (async ({ url, parent }) => {
	const { userProfile } = await parent();

	if (!userProfile) throw redirect(302, constructLoginRedirectLink(url));
}) satisfies PageLoad;
