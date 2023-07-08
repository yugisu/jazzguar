import type { CollectionReference } from 'firebase-admin/firestore';

import type { Photo } from '$lib/db/types';
import { firestore } from '$lib/firebase/app.server';

export const db = {
	photosRef: firestore.collection('photos') as CollectionReference<Photo>,
	userPhotos: (userId: string) => db.photosRef.where('uploadedById', '==', userId),
};
