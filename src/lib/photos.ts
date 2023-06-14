import { doc, setDoc } from 'firebase/firestore';
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
	const photoId = ulid();

	const fileRef = ref(storage, `photos/general/${photoId}`);
	const thumbnailFileRef = ref(storage, `photos/general/thumbnail-${photoId}`);

	const [src, srcOptimized] = await Promise.all([
		(async () => {
			await uploadBytes(fileRef, file, { cacheControl: 'max-age=604800, immutable' });
			return getDownloadURL(fileRef);
		})(),
		(async () => {
			const resizedFile = await resizePhoto(file);
			if (resizedFile) {
				await uploadBytes(thumbnailFileRef, resizedFile, { cacheControl: 'max-age=604800, immutable' });
				return getDownloadURL(thumbnailFileRef);
			}
			return undefined;
		})(),
	]);

	const docRef = doc(photosCol(), photoId);
	await setDoc(docRef, {
		id: photoId,
		name: file.name,
		tags,
		src,
		...(srcOptimized && { srcOptimized }),
	});

	await fetch(`/api/annotate/${photoId}`, { method: 'POST' });
};
