import { doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { get } from 'svelte/store';
import { ulid } from 'ulid';

import { userStore } from './auth/store';
import { photosCol, type Photo } from './db/types';
import { storage } from './firebase/app';

export const resizePhoto = async (file: File): Promise<Blob | undefined> => {
	const { Image } = await import('image-js');

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
	const user = get(userStore());
	if (!user) throw new Error('Unauthenticated');

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
		uploadedById: user.uid,
		name: file.name,
		tags,
		src,
		...(srcOptimized && { srcOptimized }),
	});

	await fetch(`/api/annotate/${photoId}`, { method: 'POST' });
};

export type PhotoRelevanceData = {
	photo: Photo;
	rating?: number;
	relatedTags?: string[];
};

export const calculatePhotoRelevance = (photo: Photo, relevantTags: Record<string, number>): PhotoRelevanceData => {
	let rating = 0;
	const relatedTags: string[] = [];

	for (const tag of photo.tags) {
		const tagRating = relevantTags[tag];

		if (tagRating !== undefined) {
			rating += tagRating;
			relatedTags.push(tag);
		}
	}

	relatedTags.sort((a, b) => (relevantTags[b] ?? 0) - (relevantTags[a] ?? 0));

	return {
		photo,
		rating,
		relatedTags,
	};
};
