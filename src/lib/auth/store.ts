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
 */
export const userStore = (): Readable<UserProfile | null> => {
	if (!browser) {
		return {
			subscribe: (run) => {
				run(get(page).data.userProfile);
				return () => void 0;
			},
		};
	}

	return readable<UserProfile | null>(null, (set) => {
		const serverUser = get(page).data.userProfile;
		set(serverUser);

		let unsubscribe: (() => void) | undefined;

		if (browser) {
			unsubscribe = onAuthStateChanged(auth, (user) => set(user && userToUserProfile(user)));
		}

		return unsubscribe;
	});
};
