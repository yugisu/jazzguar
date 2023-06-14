import { collection, CollectionReference } from 'firebase/firestore';

import { firestore } from './firebase/app';

/** Photo stored at `/photos/` */
export type Photo = {
	id: string;
	src: string;
	name: string;
	tags: string[];
};

export const photosCol = () => collection(firestore, 'photos') as CollectionReference<Photo>;
