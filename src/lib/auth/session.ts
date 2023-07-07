import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut as FBSignOut } from 'firebase/auth';

import { goto, invalidateAll } from '$app/navigation';

import { auth } from '../firebase/app';

import { CookieNames } from './constants';

const setIdTokenCookie = (idToken: string) => {
	document.cookie = `${CookieNames.ID_TOKEN_COOKIE}=${idToken}; Max-Age=${
		2 * 60 * 60
	}; Path=/; SameSite=strict; Secure`;
};

const deleteIdTokenCookie = () => {
	document.cookie = `${CookieNames.ID_TOKEN_COOKIE}=; Expires=${new Date(0)}; Path=/; SameSite=strict; Secure`;
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
