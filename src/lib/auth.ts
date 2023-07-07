import {
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithPopup,
	signOut as FBSignOut,
	type User,
} from 'firebase/auth';
import { get, readable, type Readable } from 'svelte/store';

import { browser } from '$app/environment';
import { goto, invalidateAll } from '$app/navigation';
import { page } from '$app/stores';

import { Cookies } from './constants';
import { auth } from './firebase/app';
import type { UserProfile } from './types/auth';

const setIdTokenCookie = (idToken: string) => {
	document.cookie = `${Cookies.ID_TOKEN_COOKIE}=${idToken}; Max-Age=${2 * 60 * 60}; Path=/; SameSite=strict; Secure`;
};

const deleteIdTokenCookie = () => {
	document.cookie = `${Cookies.ID_TOKEN_COOKIE}=; Expires=${new Date(0)}; Path=/; SameSite=strict; Secure`;
};

export const syncAuthCookie = () =>
	onAuthStateChanged(auth, async (user) => {
		if (user) {
			const idToken = await user.getIdToken();
			setIdTokenCookie(idToken);
		} else {
			deleteIdTokenCookie();
		}
	});

export const signInWithGoogle = async () => {
	const { user } = await signInWithPopup(auth, new GoogleAuthProvider());

	const idToken = await user.getIdToken();
	setIdTokenCookie(idToken);
	await invalidateAll();

	await goto('/');
};

export const signOut = async () => {
	deleteIdTokenCookie();
	await FBSignOut(auth);
	await invalidateAll();

	window.location.pathname = '/';
};

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
