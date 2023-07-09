import { collection, CollectionReference, query, where } from 'firebase/firestore';

import { firestore } from '../firebase/app';

/** Photo stored at `/photos/` */
export type Photo = {
	id: string;
	/** Id of the user who uploaded the photo */
	uploadedById: string;

	name: string;

	src: string;
	srcOptimized: string | null;
	aspectRatio: string;

	// TODO: Refactor tags into an array of objects with confidence scores and manual tags.
	tags: string[];

	/** Photo dominant color as per the vision AI */
	dominantColor: string | null;
};

export const photosCol = () => collection(firestore, 'photos') as CollectionReference<Photo>;
export const photosForUser = (userId: string) => query(photosCol(), where('uploadedById', '==', userId));
