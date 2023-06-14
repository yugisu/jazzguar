import { doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { ulid } from 'ulid';

import { photosCol } from './db-schema';
import { storage } from './firebase/app';

export const savePhoto = async ({ file, tags }: { file: File; tags: string[] }) => {
	const objectId = ulid();

	const fileExtension = file.name.split('.').slice(1).at(-1);
	const fileNameFromId = `${objectId}.${fileExtension}`; // FIXME: Is this really needed?

	// TODO: Create optimized copies of photos

	const fileRef = ref(storage, `photos/general/${fileNameFromId}`);
	await uploadBytes(fileRef, file);

	const docRef = doc(photosCol(), objectId);
	await setDoc(docRef, {
		id: objectId,
		name: file.name,
		src: await getDownloadURL(fileRef),
		tags,
	});

	await fetch(`/api/annotate/${objectId}`, { method: 'POST' });
};
