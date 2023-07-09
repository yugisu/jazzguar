import firebaseAdmin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

import { env } from '$env/dynamic/private';

if (env.GOOGLE_APPLICATION_CREDENTIALS) {
	process.env['GOOGLE_APPLICATION_CREDENTIALS'] ??= env.GOOGLE_APPLICATION_CREDENTIALS;
}

try {
	firebaseAdmin.initializeApp();
} catch {
	console.error(
		'Failed to initialize firebase app on server. It could be caused by the dev server hot-reloading this file.',
	);
}

export const auth = getAuth();

export const firestore = getFirestore();
