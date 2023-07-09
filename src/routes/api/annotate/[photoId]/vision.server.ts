import { ImageAnnotatorClient } from '@google-cloud/vision';

let client: ImageAnnotatorClient | undefined;

export const processPhotoWithVision = async (imageUri: string) => {
	client ??= new ImageAnnotatorClient();

	const request = {
		image: { source: { imageUri } },
		features: [{ type: 'LABEL_DETECTION' }, { type: 'IMAGE_PROPERTIES' }],
	};

	const [{ labelAnnotations, imagePropertiesAnnotation }] = await client.annotateImage(request);

	const dominantColor = processDominantColorFromAPI(
		imagePropertiesAnnotation?.dominantColors?.colors?.[0]?.color ?? undefined,
	);

	const tags = labelAnnotations?.map((label) => label.description).filter((v): v is string => !!v);

	return {
		tags,
		dominantColor,
	};
};

type APIColor = { red?: number | null; green?: number | null; blue?: number | null };

function processDominantColorFromAPI({ red, green, blue }: APIColor | undefined = {}) {
	if (typeof red !== 'number' || typeof green !== 'number' || typeof blue !== 'number') return null;

	return `rgb(${red}, ${green}, ${blue})`;
}
