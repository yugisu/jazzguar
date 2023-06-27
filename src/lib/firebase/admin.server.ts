import { getApp, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

import { env } from '$env/dynamic/private';

process.env['GOOGLE_APPLICATION_CREDENTIALS'] ??= env.GOOGLE_APPLICATION_CREDENTIALS;

const app = getApps().length === 0 ? initializeApp() : getApp();

export const auth = getAuth(app);
