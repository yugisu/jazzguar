import firebaseAdmin from 'firebase-admin';

import { env } from '$env/dynamic/private';

if (env.GOOGLE_APPLICATION_CREDENTIALS) {
	process.env['GOOGLE_APPLICATION_CREDENTIALS'] ??= env.GOOGLE_APPLICATION_CREDENTIALS;
}

const admin = firebaseAdmin.apps.length === 0 ? firebaseAdmin.initializeApp() : firebaseAdmin.app();

export const auth = admin.auth();
