import {
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithPopup,
	signOut as FBSignOut,
	type User,
} from 'firebase/auth';
import { writable, derived } from 'svelte/store';

import { invalidateAll } from '$app/navigation';
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
};

export const signOut = async () => {
	deleteIdTokenCookie();
	await FBSignOut(auth);
	await invalidateAll();
};

const userToUserProfile = ({ uid, email, displayName, phoneNumber, photoURL }: User): UserProfile => ({
	uid,
	email: email ?? undefined,
	displayName: displayName ?? undefined,
	phoneNumber: phoneNumber ?? undefined,
	photoURL: photoURL ?? undefined,
});

const fbUser = writable<UserProfile | null | undefined>(
	auth.currentUser ? userToUserProfile(auth.currentUser) : undefined,
	(set) => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			set(user && userToUserProfile(user));
		});

		return () => unsubscribe();
	},
);

export const user = derived([page, fbUser], ([$page, $fbUser]) => {
	if ($fbUser === undefined) return $page.data.userProfile;

	return $fbUser;
});
