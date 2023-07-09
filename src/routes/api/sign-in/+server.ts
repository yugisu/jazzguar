import { error, json } from '@sveltejs/kit';

import { auth } from '$lib/firebase/app.server';

import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const { idToken } = await request.json();

	const decodedIdToken = await auth.verifyIdToken(idToken);

	if (new Date().getTime() / 1000 - decodedIdToken.auth_time < 5 * 60) {
		const expiresIn = 14 * 24 * 60 * 60_000; // 14 days

		const cookie = await auth.createSessionCookie(idToken, { expiresIn });
		const options = {
			maxAge: expiresIn,
			httpOnly: true,
			secure: true,
			path: '/',
		};

		cookies.set('__session', cookie, options);

		return json({ status: 'signedIn' });
	} else {
		console.log('Detected stale sign in session cookie assignment attempt.');
		throw error(401, 'Recent sign in required.');
	}
};

export const DELETE: RequestHandler = async ({ cookies }) => {
	cookies.delete('__session', { path: '/' });
	return json({ status: 'signedOut' });
};
