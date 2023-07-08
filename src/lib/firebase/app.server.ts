import firebaseAdmin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

import { env } from '$env/dynamic/private';

if (env.GOOGLE_APPLICATION_CREDENTIALS) {
	process.env['GOOGLE_APPLICATION_CREDENTIALS'] ??= env.GOOGLE_APPLICATION_CREDENTIALS;
}

firebaseAdmin.apps.length === 0 ? firebaseAdmin.initializeApp() : firebaseAdmin.app();

export const auth = getAuth();

export const firestore = getFirestore();
