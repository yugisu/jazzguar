import { collection, CollectionReference } from 'firebase/firestore';

import { firestore } from '../firebase/app';

/** Photo stored at `/photos/` */
export type Photo = {
	id: string;
	src: string;
	srcOptimized?: string | undefined;
	name: string;
	// TODO: Refactor tags into an array of objects with confidence scores and manual tags.
	tags: string[];
	// TODO: Add photo aspect ratio and accent color to this type.
};

export const photosCol = () => collection(firestore, 'photos') as CollectionReference<Photo>;
