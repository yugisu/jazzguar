import { redirect } from '@sveltejs/kit';

export const load = async ({ parent }) => {
	const { userProfile } = await parent();

	//  TODO: Implement the `redirectTo` search param
	if (!userProfile) throw redirect(302, '/login');
};
