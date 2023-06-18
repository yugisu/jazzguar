import type { Photo } from './db-schema';

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
