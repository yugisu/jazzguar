import { ImageAnnotatorClient } from '@google-cloud/vision';

import type { Photo } from '$lib/db-schema';

let client: ImageAnnotatorClient | undefined;

export const generatePhotoTags = async (photo: Photo): Promise<string[] | undefined> => {
	client ??= new ImageAnnotatorClient();

	const request = {
		image: { source: { imageUri: photo.srcOptimized || photo.src } },
		features: [{ type: 'LABEL_DETECTION' }],
	};

	const [{ labelAnnotations }] = await client.annotateImage(request);

	const tags = labelAnnotations?.map((label) => label.description).filter((v): v is string => !!v);

	return tags;
};
