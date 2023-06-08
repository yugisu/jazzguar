import { ImageAnnotatorClient } from '@google-cloud/vision';
import type { Photo } from '$lib/db-schema';

import { GOOGLE_APPLICATION_CREDENTIALS } from '$env/static/private';

process.env['GOOGLE_APPLICATION_CREDENTIALS'] = GOOGLE_APPLICATION_CREDENTIALS;

const client = new ImageAnnotatorClient();

export const generatePhotoTags = async (photo: Photo): Promise<string[] | undefined> => {
	const request = {
		image: { source: { imageUri: photo.src } },
		features: [{ type: 'LABEL_DETECTION' }],
	};

	const [{ labelAnnotations }] = await client.annotateImage(request);

	const tags = labelAnnotations?.map((label) => label.description).filter((v): v is string => !!v);

	return tags;
};