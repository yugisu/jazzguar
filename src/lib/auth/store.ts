import { onAuthStateChanged, type User } from 'firebase/auth';
import { get, readable, type Readable } from 'svelte/store';

import { browser } from '$app/environment';
import { page } from '$app/stores';

import { auth } from '../firebase/app';

import type { UserProfile } from './types';

const userToUserProfile = ({ uid, email, displayName, phoneNumber, photoURL }: User): UserProfile => ({
	uid,
	email: email ?? undefined,
	displayName: displayName ?? undefined,
	phoneNumber: phoneNumber ?? undefined,
	photoURL: photoURL ?? undefined,
});

/**
 * Store for keeping the current user state.
 *
 * The user may be determined server-side; however, if the user is null on the server, it might mean that the user's
 * Firebase id token has expired, but the browser session might be alive, still.
 * Thus, we use server auth state as a helper, and don't rely on it too much.
 *
 * TODO: Rework the handling of auth data on the server so we can trust the auth state coming from there.
 */
export const userStore = (): Readable<UserProfile | null | undefined> => {
	if (!browser) {
		return {
			subscribe: (run) => {
				run(get(page).data.userProfile ?? undefined);
				return () => void 0;
			},
		};
	}

	return readable<UserProfile | null | undefined>(undefined, (set) => {
		const serverUser = get(page).data.userProfile;
		if (serverUser) {
			set(serverUser);
		}

		if (browser) {
			const unsubscribe = onAuthStateChanged(auth, (user) => {
				set(user && userToUserProfile(user));
			});

			return () => unsubscribe();
		}

		return undefined;
	});
};
