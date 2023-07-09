import type { Handle } from '@sveltejs/kit';
import type { UserRecord } from 'firebase-admin/auth';

import type { UserProfile } from '$lib/auth/types';
import { auth } from '$lib/firebase/app.server';

const userRecordToProfile = ({ uid, email, displayName, photoURL, phoneNumber }: UserRecord): UserProfile | null => {
	return { uid, email, displayName, photoURL, phoneNumber };
};

const getUserProfileFromSessionCookie = async (sessionCookie?: string): Promise<UserProfile | null> => {
	if (sessionCookie) {
		try {
			const { uid } = await auth.verifySessionCookie(sessionCookie);

			const userRecord = await auth.getUser(uid);

			return userRecordToProfile(userRecord);
		} catch (error) {
			console.error('Error verifying session cookie:', error);
		}
	}

	return null;
};

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.userProfile = await getUserProfileFromSessionCookie(event.cookies.get('__session'));

	const response = await resolve(event);

	return response;
};
