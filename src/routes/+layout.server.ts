import type { Cookies as TCookies } from '@sveltejs/kit';
import type { UserRecord } from 'firebase-admin/auth';

import { Cookies } from '$lib/constants.js';
import { auth } from '$lib/firebase/admin.server';
import type { UserProfile } from '$lib/types/auth.js';

const userRecordToProfile = ({ uid, email, displayName, photoURL, phoneNumber }: UserRecord): UserProfile | null => {
	return { uid, email, displayName, photoURL, phoneNumber };
};

const getUserProfileFromCookies = async (cookies: TCookies): Promise<UserProfile | null> => {
	const idToken = cookies.get(Cookies.ID_TOKEN_COOKIE);

	if (idToken) {
		try {
			const { uid } = await auth.verifyIdToken(idToken, true);

			const userRecord = await auth.getUser(uid);

			return userRecordToProfile(userRecord);
		} catch (error) {
			console.error(error);
			cookies.delete(Cookies.ID_TOKEN_COOKIE);
		}
	}

	return null;
};

export const load = async ({ cookies }) => {
	const user = await getUserProfileFromCookies(cookies);

	return {
		user,
	};
};
