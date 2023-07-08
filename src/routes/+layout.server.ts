import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	return {
		userProfile: locals.userProfile,
	};
}) satisfies LayoutServerLoad;
