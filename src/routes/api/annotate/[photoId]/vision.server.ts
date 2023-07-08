import { ImageAnnotatorClient } from '@google-cloud/vision';

let client: ImageAnnotatorClient | undefined;

export const generatePhotoTags = async (imageUri: string): Promise<string[] | undefined> => {
	client ??= new ImageAnnotatorClient();

	const request = {
		image: { source: { imageUri } },
		features: [{ type: 'LABEL_DETECTION' }],
	};

	const [{ labelAnnotations }] = await client.annotateImage(request);

	const tags = labelAnnotations?.map((label) => label.description).filter((v): v is string => !!v);

	return tags;
};
