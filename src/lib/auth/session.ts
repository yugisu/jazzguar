import { goto, invalidateAll } from '$app/navigation';

import { auth } from '../firebase/app';

import { extractRedirectTo } from './utils';

export const signInWithGoogle = async () => {
	const { GoogleAuthProvider, signInWithPopup } = await import('firebase/auth');

	const { user } = await signInWithPopup(auth, new GoogleAuthProvider());

	const idToken = await user.getIdToken();

	await fetch('/api/sign-in', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ idToken }),
	});

	await invalidateAll();
	await goto(extractRedirectTo(location.search) ?? '/');
};

export const signOut = async () => {
	await fetch('/api/sign-in', { method: 'DELETE' });

	const { signOut: FBSignOut } = await import('firebase/auth');

	await FBSignOut(auth);

	invalidateAll();
	(window.location as unknown) = '/';
};
