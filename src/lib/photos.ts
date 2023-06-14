import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Image } from 'image-js';
import { ulid } from 'ulid';

import { photosCol } from './db-schema';
import { storage } from './firebase/app';

export const resizePhoto = async (file: File): Promise<Blob | undefined> => {
	const image = await Image.load(URL.createObjectURL(file));

	const resizeTargetDimension = 1000;

	if (image.height > resizeTargetDimension || image.width > resizeTargetDimension) {
		const isHorizontal = image.width > image.height;

		const resized = image.resize({
			preserveAspectRatio: true,
			...(isHorizontal ? { width: resizeTargetDimension } : { height: resizeTargetDimension }),
		});

		return resized.toBlob('image/jpeg', 0.8);
	}

	return undefined;
};

export const savePhoto = async ({ file, tags }: { file: File; tags: string[] }) => {
	const objectId = ulid();

	const fileRef = ref(storage, `photos/general/${objectId}`);
	await uploadBytes(fileRef, file, { cacheControl: 'max-age=604800, immutable' });

	const docRef = doc(photosCol(), objectId);

	await setDoc(docRef, {
		id: objectId,
		name: file.name,
		src: await getDownloadURL(fileRef),
		tags,
	});

	const resizedFile = await resizePhoto(file);

	if (resizedFile) {
		const thumbnailFileRef = ref(storage, `photos/general/thumbnail-${objectId}`);
		await uploadBytes(thumbnailFileRef, resizedFile, { cacheControl: 'max-age=604800, immutable' });

		await updateDoc(docRef, {
			srcOptimized: await getDownloadURL(thumbnailFileRef),
		});
	}

	await fetch(`/api/annotate/${objectId}`, { method: 'POST' });
};
