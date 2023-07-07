import type { Handle, Cookies as TCookies } from '@sveltejs/kit';
import type { UserRecord } from 'firebase-admin/auth';

import type { UserProfile } from '$lib/auth/types';
import { auth } from '$lib/firebase/app.server';

const userRecordToProfile = ({ uid, email, displayName, photoURL, phoneNumber }: UserRecord): UserProfile | null => {
	return { uid, email, displayName, photoURL, phoneNumber };
};

const getUserProfileFromCookies = async (cookies: TCookies): Promise<UserProfile | null> => {
	const sessionCookie = cookies.get('__session');

	if (sessionCookie) {
		try {
			const { uid } = await auth.verifySessionCookie(sessionCookie);

			const userRecord = await auth.getUser(uid);

			return userRecordToProfile(userRecord);
		} catch (error) {
			console.error(error);

			// TODO: Handle unauthenticated state
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
