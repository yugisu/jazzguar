import type { Handle, Cookies as TCookies } from '@sveltejs/kit';
import type { UserRecord } from 'firebase-admin/auth';

import { CookieNames } from '$lib/auth/constants';
import type { UserProfile } from '$lib/auth/types';
import { auth } from '$lib/firebase/app.server';

const userRecordToProfile = ({ uid, email, displayName, photoURL, phoneNumber }: UserRecord): UserProfile | null => {
	return { uid, email, displayName, photoURL, phoneNumber };
};

const getUserProfileFromCookies = async (cookies: TCookies): Promise<UserProfile | null> => {
	const idToken = cookies.get(CookieNames.ID_TOKEN_COOKIE);

	if (idToken) {
		try {
			const { uid } = await auth.verifyIdToken(idToken, true);

			const userRecord = await auth.getUser(uid);

			return userRecordToProfile(userRecord);
		} catch (error) {
			console.error(error);
			cookies.delete(CookieNames.ID_TOKEN_COOKIE);
		}
	}

	return null;
};

export const handle: Handle = async ({ event, resolve }) => {
	const userProfile = await getUserProfileFromCookies(event.cookies);
	event.locals.userProfile = userProfile;

	const response = await resolve(event);

	return response;
};
